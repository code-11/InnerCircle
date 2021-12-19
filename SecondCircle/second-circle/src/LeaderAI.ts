import Agent from "./Agent";
import Powerflow from "./Powerflow";
import {EXPERT_NAMES,BestAgent} from "./NationBuilder";

type LeaderTask={
    description:string;
    priority:number;
    //perform
}

export default class LeaderAI{

    identifyThingsToDo(powerflow:Powerflow){

        const toDoList : LeaderTask[] = [];

        // Make sure you have enough underlings
        for (const [stat] of EXPERT_NAMES){
            const name = EXPERT_NAMES.get(stat);
            //TODO: Check to see that position isn't already in powerflow
            const hireTask = {
                description:"Find a "+name,
                priority:1,
                perform:(agents:Agent[])=>{
                    if (agents.length==0){
                        return null;
                    }
                    let best : Agent | null=agents[0];
                    for (const agent of agents){
                        const statGetter:(agent:Agent)=>number=(agent)=>agent.stats[stat];
                        best=BestAgent(best,agent,statGetter);
                    }
                    return best;
                }
            }
        }

        //Make sure your underlings aren't getting too powerful
    }



}