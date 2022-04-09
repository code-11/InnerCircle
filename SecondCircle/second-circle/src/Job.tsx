import Agent, { Stat } from "./Agent";
import Identifiable from "./Identifiable";
import {Commodity} from "./Commodities";
import Powerflow from "./Powerflow";

/**
 * Time exists on a 100 units -> 12 hr system.
 * So sleeping would be approximately 60 units
 * Eating would be about 10
 * The whole day would be 200 units
 */

export interface JobTask{
    description:string;
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
            perform:()=>{},
        }]
    }
};

export abstract class BaseJob extends Job{
    abstract estimateGoodness(person:Agent) : number;

    identifyThingsToDo(agent:Agent,agents:Agent[],powerflow:Powerflow): JobTask[]{
        return [{
            description:"toil",
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
    identifyThingsToDo(agent:Agent,agents:Agent[],powerflow:Powerflow): JobTask[]{
        return [{
            description:"Chop trees",
            perform:()=>{
                agent.giveItem(Commodity.Lumber.some(10));
            }
        }];
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

export class Hunter extends Job{
    constructor(){
        super("Hunter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        const bulWeight=.25;
        const scanWeight=.8;
        const preceptWeight=-.1;
        const bulVal = person.stats[Stat.Bulwark] * bulWeight * 6.66;
        const scanVal = person.stats[Stat.Scan] * scanWeight * 10;
        const preceptVal = person.stats[Stat.Precepts] * preceptWeight * 10;
        return bulVal + scanVal + preceptVal;
    }

    identifyThingsToDo(agent: Agent,agents:Agent[], powerflow: Powerflow): JobTask[] {
        return [{
            description:"Hunt",
            perform:()=>{
                agent.giveItem(Commodity.Food.some(7));
            },
        }]
    }
}

export class Merchant extends BaseJob{
    constructor(){
        super("Merchant")
    }
    estimateGoodness(person: Agent): number {
        const wordWeight=.5;
        const scanWeight=.1;
        const wealthWeight=.4;
        const wordVal =  person.stats[Stat.Wordcraft] * wordWeight * 10;
        const scanVal =  person.stats[Stat.Scan] * scanWeight * 10;
        const wealthVal = person.stats[Stat.Wealth] * wealthWeight;
        return wordVal + scanVal + wealthVal;
    }
}

export class Farmer extends BaseJob{
    constructor(){
        super("Farmer");
    }
    estimateGoodness(person:Agent){
        return person.stats[Stat.Bulwark] * 3.33;
    }
    identifyThingsToDo(agent: Agent,agents:Agent[], powerflow: Powerflow): JobTask[] {
        return [{
            description:"Farm",
            perform:()=>{
                agent.giveItem(Commodity.Food.some(10));
            },
        }]
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
