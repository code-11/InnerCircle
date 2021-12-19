import Agent, { Stat } from "./Agent";
import Identifiable from "./Identifiable";
import {Commodity} from "./Commodities";
import Powerflow from "./Powerflow";

export interface JobTask{
    description:string;
    priority:number;
    perform:()=>void;
}

export default abstract class Job implements Identifiable<Job>{
    name: String;

    constructor(name: String){
        this.name=name;
    }

    equals(other:Job){
        return this.name===other.name;
    }

    hash(){
        return this.name;
    }

    toString(){
        return this.name;
    }

    produces(){
        return {};
    }    

    abstract identifyThingsToDo(agent:Agent,agents:Agent[],powerflow:Powerflow):Array<JobTask>

}

export class Placeholder extends Job{
    identifyThingsToDo(agent: Agent,agents:Agent[], powerflow: Powerflow): JobTask[] {
        return [{
            description:"placeholder",
            priority:1,
            perform:()=>{},
        }]
    }
};

export abstract class BaseJob extends Job{
    abstract estimateGoodness(person:Agent) : number;

    identifyThingsToDo(agent:Agent,agents:Agent[],powerflow:Powerflow){
        return [{
            description:"toil",
            priority:1,
            perform:()=>{}
        }];
    }
}

export class Unemployed extends BaseJob{
    constructor(){
        super("Unemployed");
    }
    estimateGoodness(person:Agent) : number{
        return 0+(person.age>13 ? 0 : 100);
    }
}

export class Lumberjack extends BaseJob{
    constructor(){
        super("Lumberjack");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        return person.stats[Stat.Bulwark] * 6.66;
    }
    produces(){
        return {[Commodity.Lumber]:4};
    }
}

export class Carpenter extends BaseJob{
    constructor(){
        super("Carpenter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        const bulWeight=.80;
        const preWeight=.20;
        const bulVal=person.stats[Stat.Bulwark] * bulWeight * 6.66;
        const preVal=person.stats[Stat.Precepts] * preWeight  * 6.66;
        return bulVal + preVal;
    }
}

export class Hunter extends BaseJob{
    constructor(){
        super("Hunter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        return person.stats[Stat.Bulwark] * 6.66;
    }
    produces(){
        return {[Commodity.Food]: 6};
    }
}

export class Farmer extends BaseJob{
    constructor(){
        super("Farmer");
    }
    estimateGoodness(person:Agent){
        return person.stats[Stat.Bulwark] * 3.33;
    }
    produces(){
        return {[Commodity.Food]: 4};
    }

}

export class Administrator extends BaseJob{
    constructor(){
        super("Administrator");
    }
    estimateGoodness(person:Agent){
        return person.stats[Stat.Academia] * 10;
    }
}

export const Jobs={
    Hunter: new Hunter(), 
    Farmer: new Farmer(),
    Lumberjack: new Lumberjack(),
    Administrator: new Administrator(), 
    Carpenter: new Carpenter(),
    Unemployed: new Unemployed(),
};
