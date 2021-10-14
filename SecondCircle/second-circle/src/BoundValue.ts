export default class BoundValue{
    value=0;
    minimum=0;
    maximum=0;
    constructor(minimum :number, maximum : number, initialValue:number){
        this.value=initialValue;
        this.minimum=minimum;
        this.maximum=maximum;
    }

    getValue(){
        return this.value;
    }

    setValue(newValue:number){
        if (newValue < this.minimum || newValue > this.maximum){
            throw RangeError;
        }else{
            this.value=newValue;
        }
    }
}