import { Item, combine,subtractAmount} from "./Item";

export class Inventory{
    innerItems : {[key:string]:Item};

    constructor(){
        this.innerItems={};
    }

    public getItemAmount(itemId: string, defaultAmnt:number){
        const item = this.getItem(itemId);
        const itemAmnt = item===undefined ? defaultAmnt : item.quantity;
        return itemAmnt;
    }

    public getItem(itemId:string){
        return this.innerItems[itemId];
    }

    //Takes an amount away from a agent and returns it as an item
    public takeItemAmount(itemId:string, amount:number):Item{
        const existingStack=this.getItem(itemId);
        if (existingStack===undefined){
            throw Error("Item is not in inventory");
        }else if(existingStack.quantity<amount){
            throw Error("Not enough item in inventory");
        }else if (existingStack.quantity==amount){
            delete this.innerItems[itemId];
        }else if (existingStack.quantity>amount){
            delete this.innerItems[itemId];
            this.innerItems[itemId]=subtractAmount(existingStack,amount);
        }else{
            throw Error("Impossible in Inventory")
        }
        const toReturn={...existingStack};
        toReturn.quantity=amount;
        return toReturn;
    }

    public giveItem(newItem:Item){
        const foundItem= this.getItem(newItem.id);
        if (foundItem===undefined){
            this.innerItems[newItem.id]=newItem
        }else{
            //Make a new one
            delete this.innerItems[newItem.id];
            this.innerItems[newItem.id]=combine(foundItem,newItem);
        }
    }
}
