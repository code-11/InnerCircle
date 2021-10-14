import {getRandomInt, fakePareto, triangleProb, choose } from "./Utilities";
import maleHumanNames from "./data/maleHumanNames.json";
import femaleHumanNames from "./data/femaleHumanNames.json";


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
    return `[${input.favor} ${input.bulwark} ${input.academia} ${input.wordcraft} ${input.precepts} ${input.wealth}]`;
}

const rndName=(sex: Sex)=>{
    if (sex === "M"){
        return choose(maleHumanNames.data);
    }else{
        return choose(femaleHumanNames.data);
    }
}

export const rndAgent=(name:string|null=null, title:string="Commoner")=>{
    const favor= triangleProb(-3,10);
    const bulwark=triangleProb(-2,15);
    const academia=fakePareto(1,10);
    const wordcraft=triangleProb(1,10);
    const precepts=triangleProb(1,10);
    const age = getRandomInt(50)+fakePareto(0,50,3);
    const wealth = (age>13) ? fakePareto(1,10000,4) : triangleProb(1,10);

    const sex = Math.random() >.5 ? "M" : "F";

    const desireToMarry = getRandomInt(100);


    const nameToUse= name ? name : rndName(sex);
 
    return new Agent(nameToUse,title,age,sex, desireToMarry,{
        favor, bulwark, academia, wealth, wordcraft, precepts
    });
}

export const marriageScore=(a :Agent, b:Agent)=>{
    const desireScore = Math.min(a.desireToMarry,b.desireToMarry) * 3; //0-300
    const sexScore= a.sex !== b.sex ? 90 : 10;
    const absoluteAge = (a.age > 13 && b.age > 13) ? 100 : 0;
    const ageScore = 100-Math.abs(a.age-b.age);
    const moneyScore =Math.abs(100 - (Math.log10(Math.abs(a.stats.wealth-b.stats.wealth))*50));
    const wordScore = Math.max(a.stats.wordcraft,b.stats.wordcraft) * 10;
    const preceptsScore = Math.sign(a.stats.precepts===0 ? 1 : a.stats.precepts) === Math.sign(b.stats.precepts===0 ? 1 : b.stats.precepts) ? 100 : 0;
    return desireScore + sexScore + absoluteAge + ageScore + moneyScore + wordScore + preceptsScore;

}

export default class Agent{
    name = "";
    title= "";

    sex : Sex ="F";

    age : number = 0;

    alive = true;
    
    desireToMarry : number = 0;

    stats = {
        favor: 5,
        bulwark: 10,
        academia: 5,
        wealth: 5,
        wordcraft: 5,
        precepts: 5,
    };

    constructor(name : string, title:string, age:number, sex: Sex, desireToMarry:number, stats:AgentStats){
        this.name=name;
        this.title=title;
        this.age=age;
        this.sex=sex;
        this.desireToMarry=desireToMarry;
        this.stats=stats;
    }

    capability(){
        return this.stats.academia + this.stats.bulwark + this.stats.favor + this.stats.precepts + this.stats.wordcraft;
    }

    toString(){
        const aliveStr= this.alive ? "A" : "D";
        return "<Agent "+aliveStr+" "+this.age+"yrs "+this.sex+" "+this.title+" "+this.name+" "+agentStatsToString(this.stats)+">";
    }
}