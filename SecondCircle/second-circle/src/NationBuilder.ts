import Agent, { rndAgent, marriageScore, ADULT_AGE, Stat} from "./Agent";
import { Jobs } from "./Job";

type MarriageData={[key:number]:{citizen:Agent,other:Agent | null,score:number}};

export const EXPERT_NAMES:{[key in Stat]?:string} ={
    [Stat.Favor]:"Patriarch",
    [Stat.Bulwark]:"Royal Guard",
    [Stat.Academia]:"Royal Scholar",
    [Stat.Wordcraft]:"Counselor",
    [Stat.Precepts]:"High Judge",
}

export const BestAgentComparator = (a:Agent, b:Agent,attributeGetter:(agent:Agent)=>number) =>{
    return Math.sign(attributeGetter(b)-attributeGetter(a));
}

export class NationBuilder{

    citizens : Array<Agent> = [];

    leader : Agent|null = null;

    marriages : MarriageData = {};
        
    familyHeads : Agent[]=[];

    constructor(){
        this.createCitizenry();
    }

    static plutocracy : any = {
        leaderSort : (a:Agent,b:Agent)=>Math.sign(b.stats.Wealth-a.stats.Wealth),
    }

    static meritocracy = {
        leaderSort : (a:Agent,b:Agent)=>Math.sign(b.capability()-a.capability())
    }

    static gerontocracy = {
        leaderSort : (a:Agent,b:Agent)=>Math.sign(b.age-a.age)
    }

    createCitizenry(){
        //Create some people
        for (let i=0;i<100;i+=1){
            this.citizens.push(rndAgent(i));
        }
        this.citizens.sort(NationBuilder.plutocracy.leaderSort);
        const tempCitizens=this.citizens.slice();

        tempCitizens[0].job = Jobs.Administrator;
        tempCitizens[0].title="Leader";

        // console.log(tempCitizens.slice().map((ag)=>ag.toString()));

        const marriages : MarriageData={};
        while (tempCitizens.length > 0){
            const citizen=tempCitizens.shift();
            if (citizen && !(citizen.id in marriages)){
                const marriageScores=tempCitizens.map((other:Agent)=>{return {"citizen":other,"score":marriageScore(citizen,other)}});
                marriageScores.sort((a:any,b:any)=>b.score-a.score); //large is good
                if (marriageScores.length > 0){
                    const proposedMatch= marriageScores.shift();
                    if (proposedMatch && proposedMatch.score >200){
                        marriages[citizen.id]={citizen, other: proposedMatch.citizen, score:proposedMatch.score};
                        marriages[proposedMatch.citizen.id]={citizen:proposedMatch.citizen, other: citizen, score:proposedMatch.score};
                        citizen.spouses.push(proposedMatch.citizen);
                        proposedMatch.citizen.spouses.push(citizen);
                    }else{
                        marriages[citizen.id]={citizen, other: null, score:0};
                    }
                    this.familyHeads.push(citizen);
                }
            }
        }
        this.marriages=marriages;

        let parentIndex=0;
        for (const citizen of this.citizens){
            if (citizen.age<=ADULT_AGE){
                let possibleParent=this.citizens[parentIndex];
                while (possibleParent.age<=ADULT_AGE && parentIndex<this.citizens.length-1){
                    parentIndex+=1;
                    possibleParent=this.citizens[parentIndex];
                }
                if (possibleParent.age>ADULT_AGE){
                    const parents=[possibleParent];
                    //ASSIGN
                    possibleParent.children.push(citizen);

                    for (const spouse of possibleParent.spouses){
                        parents.push(spouse);
                        //ASSIGN
                        spouse.children.push(citizen);
                    }

                    //ASSIGN
                    citizen.parents=parents;
                    parentIndex+=1;
                }
            }
        }

        // var combos = tempCitizens.flatMap(
        //     (v: Agent, i: number) => tempCitizens.slice(i+1).map( (w:Agent) => [v,w] )
        // );
    }
}