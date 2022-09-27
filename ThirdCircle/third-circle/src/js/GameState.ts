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

export type Activity = {
    name:string,
} 

export type Day ={
    name:string,
    activities:Array<Activity | null>
}

export type GameState = {
    schedule:Array<Day>
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

    return {schedule:DAYS_OF_WEEK.map(initializeDay)}
} 