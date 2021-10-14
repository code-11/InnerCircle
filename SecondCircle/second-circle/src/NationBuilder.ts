import Agent, { rndAgent, marriageScore } from "./Agent";
import {copy, pairwise} from "./Utilities";

export class NationBuilder{
    
    citizens : Array<Agent> = [];

    constructor(){}

    static plutocracy = {
        marriageSort : (a:Agent,b:Agent)=>Math.sign(a.stats.wealth-b.stats.wealth)
    }

    static meritocracy = {
        marriageSort : (a:Agent,b:Agent)=>Math.sign(a.capability()-b.capability())
    }

    static gerontocracy = {
        marriageSort : (a:Agent,b:Agent)=>Math.sign(a.age-b.age)
    }


    createCitizenry(){
        //Create some people
        for (let i=0;i<100;i+=1){
            this.citizens.push(rndAgent());
        }
        const tempCitizens=this.citizens.slice();
        tempCitizens.sort(NationBuilder.plutocracy.marriageSort);

        const marriages=[];
        while (tempCitizens.length > 0){
            const citizen=tempCitizens.shift();
            if (citizen){
                const marriageScores=tempCitizens.map((other:Agent)=>{return {"citizen":other,"score":marriageScore(citizen,other)}});
                marriageScores.sort((a:any,b:any)=>b.score-a.score); //large is good
                if (marriageScores.length > 0){
                    const proposedMatch= marriageScores.shift();
                    if (proposedMatch && proposedMatch.score >200){
                        marriages.push([citizen,proposedMatch.citizen,proposedMatch.score]);
                    }else{
                        marriages.push([citizen,0]);
                    }
                }
            }
        }
        console.log(marriages);

        // var combos = tempCitizens.flatMap(
        //     (v: Agent, i: number) => tempCitizens.slice(i+1).map( (w:Agent) => [v,w] )
        // );
    }
}