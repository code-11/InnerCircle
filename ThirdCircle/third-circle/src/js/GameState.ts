import { AppState } from "../AppState";
import {Relations} from "../Relations";

export const SLEEP="SLEEP";
export const PRAY="PRAY";

export const DAYS_OF_WEEK=[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

export type Faction = "artisans" | "aristocrats" | "commoners" | "clergy";  

export type Activity = {
    name:string,
} 

export type Day ={
    name:string,
    activities:Array<Activity | null>
}

export type GameState = {
    assignActivity: (day: Day, activity: Activity) => void;
    schedule:Array<Day>;
    relations:Relations;
};

export function initializeDay(name:string){
    return {
        name,
        activities:[
            {name:PRAY},
            null,
            null,
            {name:SLEEP},
        ]
    }
}

export function initializeWeek(){

    return DAYS_OF_WEEK.map(initializeDay)
} 

function initializeRelation(name:Faction){
    return {
        name,
        known:0,
        rep:0,
    }
}

export function initializeRelations(){
    return {
        "artisans":initializeRelation("artisans"),
        "aristocrats":initializeRelation("aristocrats"),
        "commoners":initializeRelation("commoners"),
        "clergy":initializeRelation("clergy"),
    }
}

export function makeGameStateDefault(){
    return {
        schedule:initializeWeek(),
        assignActivity:(day: Day, activity: Activity) => {},
        relations:initializeRelations(),
    }
}

export function bindAssignActivity(setAppState:any, appState:AppState){
    const assignActivity=(day:Day, activity:Activity)=>{
        const newGameState:GameState={...appState.gamestate};
        const dayIndex=newGameState.schedule.findIndex((day1)=>day.name==day1.name)
        const activityIndex=newGameState.schedule[dayIndex].activities.findIndex((activity1)=>activity1==null);
        newGameState.schedule[dayIndex].activities[activityIndex]=activity
        setAppState({guistate:appState.guistate, gamestate:newGameState});
    }
    appState.gamestate.assignActivity=assignActivity;
}

export function bindGameState(setAppState:any, appState:AppState){
    bindAssignActivity(setAppState,appState);
}