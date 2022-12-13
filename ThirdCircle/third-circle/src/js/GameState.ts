import { AppState } from "../AppState";
import {Relations} from "../Relations";
import { Activity, createBlankActivity, isBlank, PRAY, SLEEP } from "./Activities";
import { Stock,money,ingredients,health } from "./Stocks";

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

export type Day ={
    name:string,
    activities:Array<Activity>
}

export type GameState = {
    assignActivity: (day: Day, activity: Activity) => void;
    schedule:Array<Day>;
    relations:Relations;
    stocks: {
        [key in Stock["name"]] : Stock
    }
};

export function initializeDay(name:string){
    return {
        name,
        activities:[
            PRAY,
            createBlankActivity(),
            createBlankActivity(),
            SLEEP,
        ]
    }
}

export function initializeWeek(){

    return DAYS_OF_WEEK.map(initializeDay)
} 

function initializeRelation(name:Faction,known=0, rep=0){
    return {
        name,
        known,
        rep,
    }
}

export function initializeRelations(){
    return {
        "artisans":initializeRelation("artisans"),
        "aristocrats":initializeRelation("aristocrats"),
        "commoners":initializeRelation("commoners"),
        "clergy":initializeRelation("clergy", 2, 2),
    }
}

export function initializeStocks(){
    return {
        money,
        ingredients,
        health
    }
}

export function makeGameStateDefault(){
    return {
        schedule:initializeWeek(),
        assignActivity:(day: Day, activity: Activity) => {},
        relations:initializeRelations(),
        stocks:initializeStocks(),
    }
}

export function bindAssignActivity(setAppState:any, appState:AppState){
    const assignActivity=(day:Day, activity:Activity)=>{
        const newGameState:GameState={...appState.gamestate};
        const dayIndex=newGameState.schedule.findIndex((day1)=>day.name==day1.name)
        const activityIndex=newGameState.schedule[dayIndex].activities.findIndex(isBlank);
        newGameState.schedule[dayIndex].activities[activityIndex]=activity
        setAppState({guistate:appState.guistate, gamestate:newGameState});
    }
    appState.gamestate.assignActivity=assignActivity;
}

export function bindGameState(setAppState:any, appState:AppState){
    bindAssignActivity(setAppState,appState);
}