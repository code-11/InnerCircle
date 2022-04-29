import Job, { Jobs, JobTask, Unemployed } from "./Job";
import { NationBuilder, Provider } from "./NationBuilder";
import { choose, sum } from "./Utilities";
import Agent, { ADULT_AGE, Stat } from "./Agent";
import ImmobileHolding from "./ImmobileHolding";
import { GeographyBuilder } from "./GeographyBuilder";
import Powerflow from "./Powerflow";
import Constants from "./Constants";
import React from "react";
import { Commodity, Transaction } from "./Commodities";
import { Item } from "./Item";
import Counter from "./Counter";

type SimulationState = {
    speed: number;
    time:number;
}

export default class Simulation extends React.PureComponent<{},SimulationState>{

    nation:NationBuilder;
    geography:GeographyBuilder;
    //AgentId:JobTask[]
    tasks:{[id:number]:JobTask[]};
    transactionLog:Transaction[]=[];
    month:number=1;

    constructor(nation:NationBuilder, geography:GeographyBuilder){
        super({});
        this.nation=nation;
        this.geography=geography;
        this.tasks={};
    }

    assignStartingResources(){
        for (const citizen of this.nation.citizens){ 
            if (citizen.job.equals(Jobs.Merchant)){
                citizen.giveItem(Commodity.Food.some(100));
            }
            //There probably shouldn't be competeing places to store wealth...
            const citizenWealth=citizen.stats.wealth;
            citizen.giveItem(Commodity.Money.some(citizenWealth));
        }
    }

    play(agents:Agent[],powerflow: Powerflow){
        this.jobAssignment();
        this.assignDailyBaseTasks();
        const leader=powerflow.getHead();
        if (leader !==null && this.month==0){
            const tasks=leader.data.job.identifyThingsToDo(leader.data,agents,powerflow);
            for (const task of tasks){
                task.perform();
            }
        }

        const jobDist=new Counter<Job>();

        //TODO: Main play loop goes here?
        for (const citizen of this.nation.citizens){
            const citizenTasks=this.getTasks(citizen);
            for(const jobTask of citizenTasks){
                jobTask.perform();
            }
            jobDist.addElement(citizen.job);

            citizen.evalHealth();
        }

        console.log(jobDist);
    }

    buyFromProviders(providers:Provider[]){
        for (const provider of providers){
            const citizen = this.nation.findCitizen(provider.agentId);
            if (citizen ===undefined){
                throw `Tried to buy from ${provider.agentId} but this id didn't exist`;
            }else{
                citizen.takeItemAmount(provider.itemId,provider.itemAmnt);
            }
        }
    }

    executeTrade(providerId:number,buyerId:number,itemId:string,amount:number,money:number){
        const transaction={
            providerId,
            buyerId,
            itemId,
            amount,
            money,
            month:this.month
        }
        const provider=this.nation.findCitizen(providerId);
        const buyer = this.nation.findCitizen(buyerId);
        if (provider!=undefined && buyer!=undefined){
            const soldItem :Item = provider.takeItemAmount(itemId,amount);
            buyer.giveItem(soldItem);
            const payment :Item = buyer.takeItemAmount(Commodity.Money.id,money);
            provider.giveItem(payment);
            this.transactionLog.push(transaction);
        }
        
    }

    getFoodCheckTask(citizen:Agent):JobTask{
        return {
            description: "Food Check",
            perform:()=>{
                //Check if already have enough food
                const foodAmnt = citizen.carried.getItemAmount(Commodity.Food.id,0);
                const moneyAmnt = citizen.carried.getItemAmount(Commodity.Money.id,0);
                const foodDiff = Math.max(Constants.FOOD_BUFFER-foodAmnt,0);
                if (foodDiff>0 && moneyAmnt>0){
                    //If not see if have enough money for food.
                    const foodPrice=Commodity.price(Commodity.Food);
                    //Try to buy all the food you want
                    const buyAmnt =  Math.min(moneyAmnt/foodPrice,foodDiff);
                    const providers=this.nation.findServicesWithItemAmnt(Commodity.Food.id,buyAmnt,Jobs.Merchant.id);
                    for (const provider of providers){
                        this.executeTrade(provider.agentId, citizen.id, Commodity.Food.id, provider.itemAmnt, provider.itemAmnt * foodPrice);
                    }
                }
            }
        }
    }

    getTasks(citizen:Agent){
        const citizenTasks=this.tasks[citizen.id];
        if (citizenTasks===undefined){
            return [];
        }else{
            return citizenTasks;
        }
    }

    assignTask(citizen:Agent,task:JobTask){
        const taskList=this.tasks[citizen.id];
        if (taskList===undefined){
            this.tasks[citizen.id]=[task];
        }else{
            this.tasks[citizen.id].push(task);
        }
    }

    assignDailyBaseTasks(){
        //TODO: Groups, including family/spouse should pool resources
        for (const citizen of this.nation.citizens){
            this.assignTask(citizen,this.getFoodCheckTask(citizen));
        }
    }

    jobAssignment(){
        for(const citizen of this.nation.citizens){
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

    createPowerflow(){
        const powerflow=new Powerflow();
        const best=this.nation.citizens[0];
        powerflow.addChild(null,best);
        // for (let i=1;i<5;i+=1){
        //     const citizen=this.nation.citizens[i]
        //     powerflow.addChild(best,citizen);
        // }
        // for (let i=5;i<8;i+=1){
        //     const citizen=this.nation.citizens[i]
        //     const subBest=this.nation.citizens[4];
        //     powerflow.addChild(subBest,citizen);
        // }
        return powerflow;
    }

    houseBuilding(){
        //citizens is sorted by best
        const realEstateRate=.25;
        const qualitySizeNum=2;

        const houseConformityRatio=.66;

        const baseLog=(x:number, y:number)=>{
            return Math.log(y) / Math.log(x);
        }

        //locate founding site
        const foundingSite=this.geography.chooseFoundingSite();

        if (foundingSite==null){
            console.log("Could not locate a good founding site");
            return;
        }

        for (const familyHead of this.nation.familyHeads.slice()){
            const contributions:{[key:number]:number}={};
            
            const payingfamilyMembers=familyHead.spouses.slice();
            payingfamilyMembers.push(familyHead);

            let budget = 0;
            for (const familyMember of payingfamilyMembers){
                const contribution = familyMember.stats.wealth * realEstateRate;
                budget+=contribution;
                if (familyHead.title!="Leader"){
                    familyMember.stats.wealth-=contribution;
                }
            }

            let size=1;
            let quality=1;
            if (budget>qualitySizeNum){
                size=Math.floor(baseLog(qualitySizeNum,budget));
                quality = Math.floor(budget / size);               
            } 

            familyHead.house= new ImmobileHolding(size,quality);
            const width=Math.floor(Math.sqrt(size*(1/houseConformityRatio)));
            const height=Math.floor(size/width);
            const niceSize=width*height;
            const leftOver=size-niceSize;
            //console.log("width:"+width+" height:"+height+" niceSize:"+niceSize+" leftOver:"+leftOver+" size:"+size);
            this.geography.vaguelyPlaceBuildingWithBuffer(height,width,foundingSite);
            // if (familyHead.title=="Leader"){

            // }

            //Figure out where it goes
        }
    }

};