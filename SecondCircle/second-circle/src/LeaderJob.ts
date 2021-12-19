import Agent from "./Agent";
import Powerflow from "./Powerflow";
import {EXPERT_NAMES,BestAgent} from "./NationBuilder";
import Job, { Jobs, JobTask, Placeholder } from "./Job";

interface LeaderTask extends JobTask{
    description:string;
    priority:number;
    perform:()=>void;
}

export default class LeaderJob extends Job{

    constructor(name:string){
        super(name);
    }

    identifyThingsToDo(leader:Agent,agents:Agent[],powerflow:Powerflow){

        const toDoList : LeaderTask[] = [];

        // Make sure you have enough underlings
        for (const [stat] of EXPERT_NAMES){
            const name = EXPERT_NAMES.get(stat);
            if (name ==undefined){
                console.log("Error: Couldn't find name for job with stat "+stat);
                return [];
            }
            if (!powerflow.childrenHaveJob(leader,name)){
                if (agents.length==0){
                    continue;
                } 
                const hireTask = {
                    description:"Find a "+name,
                    priority:1,
                    perform:()=>{
                        let best : Agent | null=agents[0];
                        for (const agent of agents){
                            const statGetter:(agent:Agent)=>number=(agent)=>agent.stats[stat];
                            best=BestAgent(best,agent,statGetter);
                        }
                        if (best!=undefined){
                            powerflow.addChild(leader,best)
                            best.job=new Placeholder(name);
                        }
                    }
                }
                toDoList.push(hireTask);
            }
        }

        return toDoList;

        //Make sure your underlings aren't getting too powerful
        //Administer
        //External threats
        //Random events
    }



}