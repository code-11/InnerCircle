import Agent, { Stat } from "./Agent";
import Identifiable from "./Identifiable";
import {Commodity} from "./Commodities";

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

    abstract estimateGoodness(person:Agent) : number;
    //abstract perform(): void;
}

export class Unemployed extends Job{
    constructor(){
        super("Unemployed");
    }
    estimateGoodness(person:Agent) : number{
        return 0+(person.age>13 ? 0 : 100);
    }
}

export class Lumberjack extends Job{
    constructor(){
        super("Lumberjack");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        return person.stats.Bulwark * 6.66;
    }
    produces(){
        return {[Commodity.Lumber]:4};
    }
}

export class Carpenter extends Job{
    constructor(){
        super("Carpenter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        const bulWeight=.80;
        const preWeight=.20;
        const bulVal=person.stats.Bulwark * bulWeight * 6.66;
        const preVal=person.stats.Precepts * preWeight  * 6.66;
        return bulVal + preVal;
    }
}

export class Hunter extends Job{
    constructor(){
        super("Hunter");
    }
    estimateGoodness(person:Agent){
        //from -13.5 to 100
        return person.stats.Bulwark * 6.66;
    }
    produces(){
        return {[Commodity.Food]: 6};
    }
}

export class Farmer extends Job{
    constructor(){
        super("Farmer");
    }
    estimateGoodness(person:Agent){
        return person.stats.Bulwark * 3.33;
    }
    produces(){
        return {[Commodity.Food]: 4};
    }

}

export class Administrator extends Job{
    constructor(){
        super("Administrator");
    }
    estimateGoodness(person:Agent){
        return person.stats.Academia * 10;
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
