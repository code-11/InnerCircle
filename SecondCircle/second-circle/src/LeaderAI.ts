import Agent from "./Agent";
import {EXPERT_NAMES,BestAgentComparator} from "./NationBuilder";

type LeaderTask={
    description:string;
    priority:number;
    //perform
}

export default class LeaderAI{

    identifyThingsToDo(Powerflow powerflow){

        const toDoList : LeaderTask[] = [];

        // Make sure you have enough underlings
        for (const [stat,name] of Object.entries(EXPERT_NAMES)){
            const hireTask = {
                description:"Find a "+name,
                priority:1,
                perform:(agents:Agent[])=>{
                    return agents.reduce((a,b)=>BestAgentComparator(a,b,(agent)=>agent.stats[stat]))
                }
            }
        }

        if (powerflow.getChildren().length<5){
            const findUnderling=new LeaderTask("Find More Underlings")
        }

        //Make sure your underlings aren't getting too powerful
        if powerflow
    }



}