// export type Activity = {
//     type: string,
//     label: string,
//     desc?: string,
// };

import cloneDeep from 'lodash/cloneDeep';
import { GameState } from "./GameState";

export type Activity = {
    name: string;
    desc: string;
    perform: (gameState: GameState) => GameState;
};

const noop=(gameState:GameState)=>gameState;

export const PRAY: Activity={name:"Communial Prayer", desc:"+5 to clergy rep", perform:(gameState)=>{
    const newState=cloneDeep(gameState); 
    newState.relations.clergy.rep+=5; 
    return newState}}

export const SLEEP: Activity={name:"Sleep", desc:"", perform:noop}

export const createBlankActivity=()=>{
    return {
        name:"",
        desc:"",
        perform:noop,
    }
}

export const allPossibleActivities:Activity[]=[
    //Indiv
    {name:"Socialize", desc:"+5 to artist rep", perform:(gameState)=>{
        const newState=cloneDeep(gameState); 
        newState.relations.artisans.rep+=5; 
        return newState}},
    {name:"Consort", desc:"+5 to aristocrat rep for -2 money", perform:(gameState)=>{
        const newState=cloneDeep(gameState); 
        newState.stocks.Money.amount-=2;
        newState.relations.aristocrats.rep+=5; 
        return newState}},
    {name:"Corrouse", desc:"+5 to commoner rep, -3 to aristocrat rep", perform:(gameState)=>{
        const newState=cloneDeep(gameState); 
        newState.stocks.Money.amount-=2;
        newState.relations.commoners.rep+=5; 
        newState.relations.artisans.rep-=3; 
        return newState}},
    PRAY,
    SLEEP,
    {name:"Perform House Labor", desc:"", perform:noop},

    //Scribe
    {name:"Transcribe Old Text", desc:"", perform:noop},
    {name:"Write Story/Play", desc:"", perform:noop},
    {name:"Acquire Ingredients", desc:"", perform:noop},
    {name:"Write Treatie", desc:"", perform:noop},
    {name:"Write Poetry", desc:"", perform:noop},
    {name:"Transcribe Correspondence", desc:"", perform:noop},
    {name:"Deliver Message", desc:"", perform:noop},
    {name:"Copy Bible", desc:"", perform:noop},
    {name:"Town Scribe", desc:"", perform:noop},
    {name:"Tutor Child", desc:"", perform:noop},
];

export default allPossibleActivities;