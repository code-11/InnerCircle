import BoundValue from "./BoundValue"
export default class ImmobileHolding{
    size= new BoundValue(1,20,1);
    quality=new BoundValue(1, 100,1) //persquare 
    constructor(size:number,quality: number){
        this.size.setValue(size);
        this.quality.setValue(quality);
    }
} 