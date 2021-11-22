import Agent, { rndAgent, marriageScore } from "./Agent";
import { Jobs } from "./Job";

type MarriageData={[key:number]:{citizen:Agent,other:Agent | null,score:number}};

export class NationBuilder{

    citizens : Array<Agent> = [];

    leader : Agent|null = null;

    marriages : MarriageData = {};

    

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
        const tempCitizens=this.citizens.slice();
        tempCitizens.sort(NationBuilder.plutocracy.leaderSort);

        tempCitizens[0].job = Jobs.Administrator;
        tempCitizens[0].title="Leader";

        // console.log(tempCitizens.slice().map((ag)=>ag.toString()));

        const marriages : MarriageData={};
        while (tempCitizens.length > 0){
            const citizen=tempCitizens.shift();
            if (citizen){
                const marriageScores=tempCitizens.map((other:Agent)=>{return {"citizen":other,"score":marriageScore(citizen,other)}});
                marriageScores.sort((a:any,b:any)=>b.score-a.score); //large is good
                if (marriageScores.length > 0){
                    const proposedMatch= marriageScores.shift();
                    if (proposedMatch && proposedMatch.score >200){
                        marriages[citizen.id]={citizen, other: proposedMatch.citizen, score:proposedMatch.score};
                    }else{
                        marriages[citizen.id]={citizen, other: null, score:0};
                    }
                }
            }
        }
        this.marriages=marriages;

        // var combos = tempCitizens.flatMap(
        //     (v: Agent, i: number) => tempCitizens.slice(i+1).map( (w:Agent) => [v,w] )
        // );
    }
}