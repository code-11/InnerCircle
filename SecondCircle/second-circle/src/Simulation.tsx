import { Jobs, Unemployed } from "./Job";
import { NationBuilder } from "./NationBuilder";
import { choose, sum } from "./Utilities";
import { ADULT_AGE } from "./Agent";
import ImmobileHolding from "./ImmobileHolding";
import { GeographyBuilder } from "./GeographyBuilder";

export default class Simulation{

    nation:NationBuilder;
    geography:GeographyBuilder;

    constructor(nation:NationBuilder, geography:GeographyBuilder){
        this.nation=nation;
        this.geography=geography;
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

    houseBuilding(){
        //citizens is sorted by best
        const realEstateRate=.25;
        const qualitySizeNum=2;

        const baseLog=(x:number, y:number)=>{
            return Math.log(y) / Math.log(x);
        }

        //locate founding site
        // foundingSite=this.geography.chooseFoundingSite();

        const reverseFamilyHeads=this.nation.familyHeads.slice();
        reverseFamilyHeads.reverse();
        for (const familyHead of reverseFamilyHeads){
            if (familyHead.title!="Leader"){
                const contributions:{[key:number]:number}={};
                
                const payingfamilyMembers=familyHead.spouses.slice();
                payingfamilyMembers.push(familyHead);

                let budget = 0;
                for (const familyMember of payingfamilyMembers){
                    const contribution = familyMember.stats.Wealth * realEstateRate;
                    budget+=contribution;
                    familyMember.stats.Wealth-=contribution;
                }

                let size=1;
                let quality=1;
                if (budget>qualitySizeNum){
                    size=Math.floor(baseLog(qualitySizeNum,budget));
                    quality = Math.floor(budget / size);               
                } 

                familyHead.house= new ImmobileHolding(size,quality);

                //Figure out where it goes

            }else{
                //leader doesn't want to lose status by putting all money into house
            }
        }
    }

};