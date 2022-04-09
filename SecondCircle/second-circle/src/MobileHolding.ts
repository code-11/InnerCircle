export interface MobileHolding{
    shortDesc:string;
    longDesc:string;
    id:string;
    quantity:number;
}

export const combine=(oldHold:MobileHolding,newHold:MobileHolding) : MobileHolding=>{
    if (oldHold.id!==newHold.id){
        throw `Cannot combine holdings of different ids: ${oldHold.id} and ${newHold.id}`;
    }else{
        const toReturn:MobileHolding={...oldHold};
        toReturn.quantity=oldHold.quantity+newHold.quantity;
        return toReturn;
    }
}

