import { MobileHolding, combine } from "./MobileHolding";

export class Inventory{
    innerItems : MobileHolding[] =[];

    public giveItem(newItem:MobileHolding){
        const foundItemIndex = this.innerItems.findIndex((item:MobileHolding) => newItem.id==item.id);
        if (foundItemIndex!==-1){
            const item=this.innerItems[foundItemIndex];
            this.innerItems.splice(foundItemIndex, 1);
            this.innerItems.push(combine(item,newItem))
        }else{
            this.innerItems.push(newItem);
        }
    }
}
