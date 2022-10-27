import { Faction, GameState } from "./js/GameState";
import './Relations.css';

type RelationProp = {
    relations:Relations
};

type Relation = {
    name:string;
    known:number;
    rep:number;
}
export type Relations = {
    [key in Faction]: Relation;
};

function makeRelation(relation:Relation){
    return <div key={relation.name} className="relation-container">
        <div>{relation.name}</div>
        <div>{relation.known}</div>
        <div>{relation.rep}</div>
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
            <img className="relation-image" src="/icons/microphone.jpg"/>
            <img className="relation-image" src="/icons/handshake.png"/>
        </div>
        {makeRelations(props.relations)}
    </div>
}