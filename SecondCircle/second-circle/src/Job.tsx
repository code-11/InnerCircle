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
    name: string;
    id:string;

    constructor(id:string,name: string){
        this.name=name;
        this.id = id;
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

export class FoodThief extends BaseJob{
    constructor(){
        super("foodThief","Food Thief");
    }
    estimateGoodness(person: Agent): number {
        const consecNoFoodVal = Math.min(person.consecNoFood,6) * 2 //0-12
        const preceptsVal = person.stats.precepts //-2 -> 10 
        const diff=consecNoFoodVal-preceptsVal //-10 to 14
        return diff * (101/14) // -72 to 101
    }
}

export class Unemployed extends BaseJob{
    constructor(){
        super("unemployed","Unemployed");
    }
    estimateGoodness(person:Agent) : number{
        return 0+(person.age>13 ? 0 : 100);
    }
}

export class Lumberjack extends BaseJob{
    constructor(){
        super("lumberjack","Lumberjack");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        return person.stats.bulwark * 6.66;
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
        super("carpenter","Carpenter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        const bulWeight=.80;
        const preWeight=.20;
        const bulVal=person.stats.bulwark * bulWeight * 6.66;
        const preVal=person.stats.precepts * preWeight  * 6.66;
        return bulVal + preVal;
    }
}

export class Hunter extends Job{
    constructor(){
        super("hunter","Hunter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        const bulWeight=.25;
        const scanWeight=.8;
        const preceptWeight=-.1;
        const bulVal = person.stats.bulwark * bulWeight * 6.66;
        const scanVal = person.stats.scan * scanWeight * 10;
        const preceptVal = person.stats.precepts * preceptWeight * 10;
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
        super("merchant","Merchant")
    }

    estimateGoodness(person: Agent): number {
        const wordWeight=.5;
        const scanWeight=.1;
        const wealthWeight=.4;
        const wordVal =  person.stats.wordcraft * wordWeight * 10;
        const scanVal =  person.stats.scan * scanWeight * 10;
        const wealthVal = Math.floor((person.stats.wealth/7000) * 10) * wealthWeight;
        return wordVal + scanVal + wealthVal;
    }
}

export class Farmer extends BaseJob{
    constructor(){
        super("farmer","Farmer");
    }
    estimateGoodness(person:Agent){
        return person.stats.bulwark * 3.33;
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
        super("administrator","Administrator");
    }
    estimateGoodness(person:Agent){
        return person.stats.academia * 10;
    }
}

export const Jobs={
    Hunter: new Hunter(), 
    Farmer: new Farmer(),
    Lumberjack: new Lumberjack(),
    Administrator: new Administrator(), 
    Carpenter: new Carpenter(),
    Unemployed: new Unemployed(),
    Merchant: new Merchant(),
    FoodThief: new FoodThief(),
};
