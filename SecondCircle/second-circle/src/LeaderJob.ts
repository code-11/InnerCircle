import Agent, { strToStat } from "./Agent";
import Powerflow from "./Powerflow";
import {BestAgent} from "./NationBuilder";
import Job, { Jobs, JobTask, Placeholder } from "./Job";
import powerflowNames from "./data/powerflowNames.json";

interface LeaderTask extends JobTask{
    description:string;
    priority:number;
    perform:()=>void;
}

export default class LeaderJob extends Job{

    constructor(name:string){
        super("leader",name);
    }

    identifyThingsToDo(leader:Agent,agents:Agent[],powerflow:Powerflow){

        const toDoList : LeaderTask[] = [];
        const powerflowInfo=powerflowNames.data;

        // Make sure you have enough underlings
        for (const [stat,names] of Object.entries(powerflowInfo)){
            const power = powerflow.getNodePower(leader.id);
            const childPower = power+1;
           // if (!powerflow.childrenHaveJob(leader,name)){
                if (agents.length==0){
                    continue;
                } 
                const hireTask = {
                    description:"Find a "+names[childPower],
                    priority:1,
                    perform:()=>{
                        let best : Agent | null=agents[0];
                        for (const agent of agents){
                            const statGetter:(agent:Agent)=>number=(agent)=>agent.stats[strToStat(stat)];
                            best=BestAgent(best,agent,statGetter);
                        }
                        if (best!=undefined){
                            const newPowerflowNode=powerflow.addChild(leader,best)
                            best.job=new Placeholder("placeholder",names[childPower]);
                        }
                    }
                }
                toDoList.push(hireTask);
           // }
        }

        return toDoList;

        //Make sure your underlings aren't getting too powerful
        //Administer
        //External threats
        //Random events
    }



}