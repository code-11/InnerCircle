export interface Item{
    shortDesc:string;
    longDesc:string;
    id:string;
    quantity:number;
}

export const subtractAmount=(baseItem:Item,amount:number) : Item =>{
    const toReturn:Item={...baseItem};
    const newQuantity=baseItem.quantity-amount;
    if (newQuantity<0){
        throw `Subtraction result less than 0: ${baseItem.quantity} - ${amount}`;
    }else{
        toReturn.quantity=newQuantity;
        return toReturn;
    }
}

export const subtract=(baseItem:Item,toReduceBy:Item) : Item =>{
    if (baseItem.id!==toReduceBy.id){
        throw `Cannot subtract holdings of different ids: ${baseItem.id} and ${toReduceBy.id}`;
    }else{
        const toReturn:Item={...baseItem};
        const newQuantity=baseItem.quantity-toReduceBy.quantity;
        if (newQuantity<0){
            throw `Subtraction result less than 0: ${baseItem.quantity} and ${toReduceBy.quantity}`;
        }else{
            toReturn.quantity=newQuantity;
            return toReturn;
        }
        
    }
}

export const combine=(oldHold:Item,newHold:Item) : Item=>{
    if (oldHold.id!==newHold.id){
        throw `Cannot combine holdings of different ids: ${oldHold.id} and ${newHold.id}`;
    }else{
        const toReturn:Item={...oldHold};
        toReturn.quantity=oldHold.quantity+newHold.quantity;
        return toReturn;
    }
}

