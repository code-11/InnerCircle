import {getRandomInt, fakePareto, triangleProb, choose } from "./Utilities";
import maleHumanNames from "./data/maleHumanNames.json";
import femaleHumanNames from "./data/femaleHumanNames.json";
import Job, { Unemployed } from "./Job";


export type Sex= "M" | "F";
export enum Stat{
    Favor,
    Bulwark,
    Academia,
    Wealth,
    Wordcraft,
    Precepts,
    Health,
}
export interface AgentStats{
    Favor : number;
    Bulwark : number;
    Academia : number;
    Wealth : number;
    Wordcraft : number;
    Precepts : number;
    Health: number;
}

const agentStatsToString=(input:AgentStats)=>{
    return `[${input.Favor} ${input.Bulwark} ${input.Academia} ${input.Wordcraft} ${input.Precepts} ${input.Wealth} ${input.Health}]`;
}

const rndName=(sex: Sex)=>{
    if (sex === "M"){
        return choose(maleHumanNames.data);
    }else{
        return choose(femaleHumanNames.data);
    }
}

export const rndAgent=(id:number,name:string|null=null, title:string="Commoner")=>{
    const favor= triangleProb(-3,10);
    const bulwark=triangleProb(-2,15);
    const academia=fakePareto(1,10);
    const wordcraft=triangleProb(1,10);
    const precepts=triangleProb(1,10);
    const age = getRandomInt(50)+fakePareto(0,50,3);
    const wealth = (age>13) ? fakePareto(1,7000,5) : triangleProb(1,10);

    const sex = Math.random() >.5 ? "M" : "F";

    const desireToMarry = getRandomInt(100);


    const nameToUse= name ? name : rndName(sex);
 
    return new Agent(id,nameToUse,title,age,sex, desireToMarry,{
        Favor:favor, Bulwark:bulwark, Academia:academia, Wealth:wealth, Wordcraft:wordcraft, Precepts:precepts, Health: 100
    });
}

export const marriageScore=(a :Agent, b:Agent)=>{
    const desireScore = Math.min(a.desireToMarry,b.desireToMarry) * 3; //0-300
    const sexScore= a.sex !== b.sex ? 90 : 10; //10 or 90
    const absoluteAge = (a.age > 13 && b.age > 13) ? 0 : -Infinity; // 0 or -Inf
    const ageScore = (100-Math.abs(a.age-b.age))*2; //0-200
    const moneyScore =Math.abs(200 - (Math.floor(Math.log10(Math.abs(a.stats.Wealth-b.stats.Wealth)+.001))*50)); //200
    const wordScore = Math.max(a.stats.Wordcraft,b.stats.Wordcraft) * 10; //100
    const preceptsScore = Math.sign(a.stats.Precepts===0 ? 1 : a.stats.Precepts) === Math.sign(b.stats.Precepts===0 ? 1 : b.stats.Precepts) ? 100 : 0; // 0 or 100
    return desireScore + sexScore + absoluteAge + ageScore + moneyScore + wordScore + preceptsScore;

}

export default class Agent{
    id=0;
    name = "";
    title= "";

    sex : Sex ="F";

    age : number = 0;

    alive = true;
    
    desireToMarry : number = 0;

    job: Job = new Unemployed();

    stats = {
        Favor: 5,
        Bulwark: 10,
        Academia: 5,
        Wealth: 5,
        Wordcraft: 5,
        Precepts: 5,
        Health: 100,
    };

    constructor(id: number, name : string, title:string, age:number, sex: Sex, desireToMarry:number, stats:AgentStats){
        this.id=id;
        this.name=name;
        this.title=title;
        this.age=age;
        this.sex=sex;
        this.desireToMarry=desireToMarry;
        this.stats=stats;
    }

    capability(){
        return this.stats.Academia + this.stats.Bulwark + this.stats.Favor + this.stats.Precepts + this.stats.Wordcraft;
    }

    toString(){
        const aliveStr= this.alive ? "A" : "D";
        return "<Agent "+aliveStr+" "+this.age+"yrs "+this.sex+" "+this.job+" "+this.title+" "+this.name+" "+agentStatsToString(this.stats)+">";
    }
}