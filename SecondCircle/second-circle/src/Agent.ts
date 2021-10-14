import { fakePareto, triangleProb } from "./Utilities";

export type Sex= "M" | "F";

export interface AgentStats{
    favor : number;
    bulwark : number;
    academia : number;
    wealth : number;
    wordcraft : number;
    precepts : number;
}

const agentStatsToString=(input:AgentStats)=>{
    return `[ ${input.favor} ${input.bulwark} ${input.academia} ${input.wordcraft} ${input.precepts} ${input.wealth}]`;
}

export const rndAgent=(name : string = "Fred", title:string="Commoner")=>{
    const favor= triangleProb(-3,10);
    const bulwark=triangleProb(-2,15);
    const academia=fakePareto(1,10);
    const wordcraft=triangleProb(1,10);
    const precepts=triangleProb(1,10);
    const wealth = fakePareto(1,10000,5);

    const sex = Math.random() >.5 ? "M" : "F";
    return new Agent(name,title,sex,{
        favor, bulwark, academia, wealth, wordcraft, precepts
    });
}

export default class Agent{
    name = "";
    title= "";

    sex : Sex ="F";

    alive = true;
    
    stats = {
        favor: 5,
        bulwark: 10,
        academia: 5,
        wealth: 5,
        wordcraft: 5,
        precepts: 5,
    };

    constructor(name : string, title:string, sex: Sex, stats:AgentStats){
        this.name=name;
        this.title=title;
        this.sex=sex;
        this.stats=stats;
    }

    toString(){
        const aliveStr= this.alive ? "A" : "D";
        return "<Agent "+aliveStr+" "+this.sex+" "+this.title+" "+this.name+" "+agentStatsToString(this.stats)+">";
    }
}