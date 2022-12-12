import { queryByDisplayValue } from "@testing-library/react";
import { signedColor } from "./Constants";
import { Faction, GameState } from "./js/GameState";
import './Relations.css';

type RelationProp = {
    relations:Relations
};

type Relation = {
    name:Faction;
    known:number;
    rep:number;
}
export type Relations = {
    [key in Faction]: Relation;
};

const factionToIcon=(faction:Faction)=>{
    if (faction == "aristocrats"){
        return "/icons/fleur-de-lys.png";
    }else if (faction == "commoners"){
        return "/icons/pitchfork.png";
    }else if (faction == "clergy"){
        return "/icons/cross.png";
    }else if (faction == "artisans"){
        return "/icons/quill.png";
    }
}

function makeRelation(relation:Relation){
    return <div key={relation.name} className="relation-container">
        <img className="relation-image" src={factionToIcon(relation.name)} title={relation.name}/>
        <div style={{color:signedColor(relation.known)}}>{relation.known}</div>
        <div style={{color:signedColor(relation.known)}}>{relation.rep}</div>
    </div>
}

function makeRelations(relations:Relations){
    const toReturn=[];
    for (const [name, relation] of Object.entries(relations)){
        toReturn.push(makeRelation(relation));
    }
    return toReturn;
}

export default function Relations(props:RelationProp){
    return <div className="relations-container">
        <div className="relation-container">
            <div>{"Faction"}</div>
            <img className="relation-image" src="/icons/microphone.jpg" title="Known"/>
            <img className="relation-image" src="/icons/handshake.png" title="Reputation"/>
        </div>
        {makeRelations(props.relations)}
    </div>
}