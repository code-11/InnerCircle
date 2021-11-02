import BoundValue from "./BoundValue"
export default class ImmobileHolding{
    size= new BoundValue(1,100,1);
    quality=new BoundValue(1, 10,1) //persquare 
    constructor(quality: number){
        this.quality.setValue(quality);
    }
} 