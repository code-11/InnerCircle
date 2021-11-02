import { Jobs, Unemployed } from "./Job";
import { NationBuilder } from "./NationBuilder";
import { choose } from "./Utilities";

export default class Simulation{

    nation:NationBuilder;

    constructor(nation:NationBuilder){
        this.nation=nation;
    }

    jobAssignment(){
        for(const citizen of this.nation.citizens){
            if (citizen.job.equals(Jobs.Unemployed)){
                let bestChoice = Jobs.Unemployed;
                let bestValue = Jobs.Unemployed.estimateGoodness(citizen); 
                Object.entries(Jobs).forEach(([key, job]) => {
                    const value = job.estimateGoodness(citizen);
                    if (bestValue<value){
                        bestChoice = job;
                        bestValue= value;
                    }else if (bestValue===value){
                        if(choose([true,false])){
                            bestChoice = job;
                            bestValue= value;
                        }
                    }    
                });
                citizen.job=bestChoice;
            } 
        }
    }

    

    step(){
        for(const citizen of this.nation.citizens){ 
            
        }
    }
};