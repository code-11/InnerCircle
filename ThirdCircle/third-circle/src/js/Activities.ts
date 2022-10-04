// export type Activity = {
//     type: string,
//     label: string,
//     desc?: string,
// };

import { Activity } from "./GameState";

export const allPossibleActivities:Activity[]=[
    //Indiv
    {name:"Prayer"},
    {name:"Sleep"},
    {name:"Social"},
    {name:"Corrouse"},
    {name:"Perform House Labor"},
    {name:"Court"},

    //Scribe
    {name:"Transcribe Old Text"},
    {name:"Write Story/Play"},
    {name:"Acquire Ingredients"},
    {name:"Write Treatie"},
    {name:"Write Poetry"},
    {name:"Transcribe Correspondence"},
    {name:"Deliver Message"},
    {name:"Copy Bible"},
    {name:"Town Scribe"},
    {name:"Tutor Child"},
];

export default allPossibleActivities;