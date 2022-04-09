import Agent from "./Agent";
import { MobileHolding } from "./MobileHolding";

export class Commodity {
    public static readonly Lumber = new Commodity('lumber','Lumber','A collection of logs')
    public static readonly Food = new Commodity('food','Food','Generic food. You need this to ')

    private constructor(public readonly id: string, public readonly shortDesc: string, public readonly longDesc: string) {
    }

    public some(quantity:number):MobileHolding{
        return {
            shortDesc:this.shortDesc,
            longDesc:this.longDesc,
            id:this.id,
            quantity:quantity
        }
    }
}

export class market{
    suppliers : Array<{agent:Agent,price:number,amnt:number}>=[];
    depanders : Array<{agent:Agent,print:number,amnt:number}>=[];

    addSupplier(agent:Agent,price:number,amnt:number){
        this.suppliers.push({agent,price,amnt});
    }
}