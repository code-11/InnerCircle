import Agent from "./Agent";
import { Item } from "./Item";

export class Commodity {
    public static readonly Lumber = new Commodity('lumber','Lumber','A collection of logs')
    public static readonly Food = new Commodity('food','Food','Generic food. You need this to live')
    public static readonly Money = new Commodity('money',"Money","Can be exchanged for goods and services")

    private constructor(public readonly id: string, public readonly shortDesc: string, public readonly longDesc: string) {
    }

    public some(quantity:number):Item{
        return {
            shortDesc:this.shortDesc,
            longDesc:this.longDesc,
            id:this.id,
            quantity:quantity
        }
    }

    static price(commodity:Commodity){
        return {
            [Commodity.Lumber.id]:10,
            [Commodity.Food.id]:1,
        }[commodity.id];
    }
}

export class market{
    suppliers : Array<{agent:Agent,price:number,amnt:number}>=[];
    depanders : Array<{agent:Agent,print:number,amnt:number}>=[];

    addSupplier(agent:Agent,price:number,amnt:number){
        this.suppliers.push({agent,price,amnt});
    }
}