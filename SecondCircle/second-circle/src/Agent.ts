import {getRandomInt, fakePareto, triangleProb, choose } from "./Utilities";
import maleHumanNames from "./data/maleHumanNames.json";
import femaleHumanNames from "./data/femaleHumanNames.json";
import Job, { Unemployed, JobTask } from "./Job";
import ImmobileHolding from "./ImmobileHolding";
import { Item } from "./Item";
import { Inventory } from "./Inventory";


export type Sex= "M" | "F";
export enum Stat{
    Favor,
    Bulwark,
    Academia,
    Wealth,
    Wordcraft,
    Precepts,
    Scan,
    Health,
}
export interface AgentStats{
    [Stat.Favor] : number;
    [Stat.Bulwark] : number;
    [Stat.Academia] : number;
    [Stat.Wealth] : number;
    [Stat.Wordcraft] : number;
    [Stat.Precepts] : number;
    [Stat.Scan]:number;
    [Stat.Health]: number;
}

export const ADULT_AGE=13; //Anyone older than 13 is an adult

const agentStatsToString=(input:AgentStats)=>{
    return `[${input[Stat.Favor]} ${input[Stat.Bulwark]} ${input[Stat.Academia]} ${input[Stat.Wordcraft]} ${input[Stat.Precepts]} ${input[Stat.Wealth]} ${input[Stat.Health]}]`;
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
    const scan = triangleProb(1,10);
    const age = getRandomInt(50)+fakePareto(0,50,3);
    const wealth = (age>13) ? fakePareto(1,7000,5) : triangleProb(1,10);

    const sex = Math.random() >.5 ? "M" : "F";

    const desireToMarry = getRandomInt(100);


    const nameToUse= name ? name : rndName(sex);
 
    return new Agent(id,nameToUse,title,age,sex, desireToMarry,{
        [Stat.Favor]:favor, [Stat.Bulwark]:bulwark, [Stat.Academia]:academia, [Stat.Wealth]:wealth, [Stat.Wordcraft]:wordcraft, [Stat.Precepts]:precepts, [Stat.Scan]:scan, [Stat.Health]: 100
    });
}

export const marriageScore=(a :Agent, b:Agent)=>{
    const desireScore = Math.min(a.desireToMarry,b.desireToMarry) * 3; //0-300
    const sexScore= a.sex !== b.sex ? 90 : 10; //10 or 90
    const absoluteAge = (a.age > ADULT_AGE && b.age > ADULT_AGE) ? 0 : -Infinity; // 0 or -Inf
    const ageScore = (100-Math.abs(a.age-b.age))*2; //0-200
    const moneyScore =Math.abs(200 - (Math.floor(Math.log10(Math.abs(a.stats[Stat.Wealth]-b.stats[Stat.Wealth])+.001))*50)); //200
    const wordScore = Math.max(a.stats[Stat.Wordcraft],b.stats[Stat.Wordcraft]) * 10; //100
    const preceptsScore = Math.sign(a.stats[Stat.Precepts]===0 ? 1 : a.stats[Stat.Precepts]) === Math.sign(b.stats[Stat.Precepts]===0 ? 1 : b.stats[Stat.Precepts]) ? 100 : 0; // 0 or 100
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

    parents:Agent[]=[];
    children: Agent[]=[];
    spouses:Agent[]=[];

    house: ImmobileHolding | null=null;

    carried: Inventory = new Inventory();

    todo:JobTask[]=[];

    stats = {
        [Stat.Favor]: 5,
        [Stat.Bulwark]: 10,
        [Stat.Academia]: 5,
        [Stat.Wealth]: 5,
        [Stat.Wordcraft]: 5,
        [Stat.Precepts]: 5,
        [Stat.Scan]:5,
        [Stat.Health]: 100,
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

    giveItem(item:Item){
        this.carried.giveItem(item);
    }
    takeItemAmount(itemId:string, amnt:number):Item{
        return this.carried.takeItemAmount(itemId ,amnt);
    }

    capability(){
        return this.stats[Stat.Academia] + this.stats[Stat.Bulwark] + this.stats[Stat.Favor] + this.stats[Stat.Precepts] + this.stats[Stat.Wordcraft] + this.stats[Stat.Scan];
    }

    toString(){
        const aliveStr= this.alive ? "A" : "D";
        return "<Agent "+aliveStr+" "+this.age+"yrs "+this.sex+" "+this.job+" "+this.title+" "+this.name+" "+agentStatsToString(this.stats)+">";
    }
}