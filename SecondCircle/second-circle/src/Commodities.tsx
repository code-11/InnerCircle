import Agent from "./Agent";

export enum Commodity{
    Lumber,
    Food,
}

export class market{
    suppliers : Array<{agent:Agent,price:number,amnt:number}>=[];
    depanders : Array<{agent:Agent,print:number,amnt:number}>=[];

    addSupplier(agent:Agent,price:number,amnt:number){
        this.suppliers.push({agent,price,amnt});
    }
}