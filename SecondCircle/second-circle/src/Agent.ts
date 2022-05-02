import {getRandomInt, fakePareto, triangleProb, choose, sortByFunc } from "./Utilities";
import maleHumanNames from "./data/maleHumanNames.json";
import femaleHumanNames from "./data/femaleHumanNames.json";
import Job, { Unemployed, JobTask, Jobs } from "./Job";
import ImmobileHolding from "./ImmobileHolding";
import { Item } from "./Item";
import { Inventory } from "./Inventory";
import { Commodity } from "./Commodities";


export type Sex= "M" | "F";
export type Stat =
    "favor" |
    "bulwark" |
    "academia"|
    "wealth"|
    "wordcraft"|
    "precepts"|
    "scan"|
    "health";
export const StatList:Stat[]=[
    "favor","bulwark","academia","wealth","wordcraft","precepts","scan","health"
]

export interface AgentStats{
    "favor" : number;
    "bulwark" : number;
    "academia" : number;
    "wealth" : number;
    "wordcraft" : number;
    "precepts" : number;
    "scan":number;
    "health": number;
}

export const ADULT_AGE=13; //Anyone older than 13 is an adult

const agentStatsToString=(input:AgentStats)=>{
    return `[${input.favor} ${input.bulwark} ${input.academia} ${input.wordcraft} ${input.precepts} ${input.wealth} ${input.health}]`;
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
    const precepts=triangleProb(-2,10);
    const scan = triangleProb(1,10);
    const age = getRandomInt(50)+fakePareto(0,50,3);
    const wealth = (age>13) ? fakePareto(1,7000,5) : triangleProb(1,10);

    const sex = Math.random() >.5 ? "M" : "F";

    const desireToMarry = getRandomInt(100);


    const nameToUse= name ? name : rndName(sex);
 
    return new Agent(id,nameToUse,title,age,sex, desireToMarry,{
        favor, bulwark,academia, wealth,wordcraft, precepts, scan, "health": 100
    });
}

export const marriageScore=(a :Agent, b:Agent)=>{
    const desireScore = Math.min(a.desireToMarry,b.desireToMarry) * 3; //0-300
    const sexScore= a.sex !== b.sex ? 90 : 10; //10 or 90
    const absoluteAge = (a.age > ADULT_AGE && b.age > ADULT_AGE) ? 0 : -Infinity; // 0 or -Inf
    const ageScore = (100-Math.abs(a.age-b.age))*2; //0-200
    const moneyScore =Math.abs(200 - (Math.floor(Math.log10(Math.abs(a.stats.wealth-b.stats.wealth)+.001))*50)); //200
    const wordScore = Math.max(a.stats.wordcraft,b.stats.wordcraft) * 10; //100
    const preceptsScore = 100 - (Math.abs(a.stats.precepts-b.stats.precepts) * (100/17)); //0-100
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

    job: Job = Jobs.Unemployed;

    parents:Agent[]=[];
    children: Agent[]=[];
    spouses:Agent[]=[];

    house: ImmobileHolding | null=null;

    carried: Inventory = new Inventory();

    todo:JobTask[]=[];
    trades=[];

    consecNoFood=0;

    stats = {
        "favor": 5,
        "bulwark": 10,
        "academia": 5,
        "wealth": 5,
        "wordcraft": 5,
        "precepts": 5,
        "scan":5,
        "health": 100,
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



    static displayPropertyComparators(){
        const numComp=(a:number,b:number)=>a-b;
        const concreteAttrs=[{id:"name",func:(arr:Agent[])=>sortByFunc(arr,(agent)=>agent.name)},
        {id:"alive",func:(arr:Agent[])=>sortByFunc(arr,(agent)=>agent.alive)},
        {id:"sex",func:(arr:Agent[])=>sortByFunc(arr,(agent)=>agent.sex)},
        {id:"age",func:(arr:Agent[])=>sortByFunc(arr,(agent)=>agent.age,numComp)},
        {id:"jobName",func:(arr:Agent[])=>sortByFunc(arr,(agent)=>agent.job?.name)}];
        const dynamicAttrs=StatList.map((stat)=>{
            return {
                id:stat,
                func:(arr:Agent[])=>sortByFunc(arr,(agent)=>agent.stats[stat],numComp)
            }
        });
        return concreteAttrs.concat(dynamicAttrs);
    }

    evalHealth(){
        if(this.carried.getItemAmount(Commodity.Food.id,0)<1){
            //Uhoh, looks you're going to starve a little bit :(
            this.stats.health-=10;
            this.consecNoFood+=1;
            console.log(`${this.name} has gone hungry`);
        }else{
            this.consecNoFood=0;
        }
    }

    giveItem(item:Item){
        this.carried.giveItem(item);
    }
    takeItemAmount(itemId:string, amnt:number):Item{
        return this.carried.takeItemAmount(itemId ,amnt);
    }

    capability(){
        return this.stats.academia + this.stats.bulwark + this.stats.favor + this.stats.precepts + this.stats.wordcraft + this.stats.scan;
    }

    toString(){
        const aliveStr= this.alive ? "A" : "D";
        return "<Agent "+aliveStr+" "+this.age+"yrs "+this.sex+" "+this.job+" "+this.title+" "+this.name+" "+agentStatsToString(this.stats)+">";
    }
}