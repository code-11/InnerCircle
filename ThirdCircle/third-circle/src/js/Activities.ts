export type Activity = {
    type: string,
    label: string,
    desc?: string,
};

export const activities:Activity[]=[
    {type: "Indiv", label:"Prayer"},
    {type: "Indiv", label:"Sleep"},
    {type: "Indiv", label:"Social"},
    {type: "Indiv", label:"Corrouse"},
    {type: "Indiv", label:"Perform House Labor"},
    {type: "Indiv", label:"Court"},
    {type: "Scribe", label:"Transcribe Old Text"},
    {type: "Scribe", label:"Write Story/Play"},
    {type: "Scribe", label:"Acquire Ingredients"},
    {type: "Scribe", label:"Write Treatie"},
    {type: "Scribe", label:"Write Poetry"},
    {type: "Scribe", label:"Transcribe Correspondence"},
    {type: "Scribe", label:"Deliver Message"},
    {type: "Scribe", label:"Copy Bible"},
    {type: "Scribe", label:"Town Scribe"},
    {type: "Scribe", label:"Tutor Child"},
];

export default activities;