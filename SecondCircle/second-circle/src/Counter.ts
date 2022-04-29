import Identifiable from "./Identifiable";

export default class Counter<T>{
    innerData : {[key:string]:number};
    constructor(){
        this.innerData={};
    };

    addElement(element:Identifiable<T>){
        let val=0;
        if (element.id in this.innerData){
            val=this.innerData[element.id];
        }else{
            this.innerData[element.id]=val;
        }
        this.innerData[element.id]=val+1;
    }
}