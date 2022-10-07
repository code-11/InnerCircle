import './ActivityTile.css';
import {drag, drop, allowDrop} from './js/DragDropUtililties';
import { Activity, Day } from './js/GameState';

type ActivityTileProp = {
    label: string,
    textAlignCenter?:boolean,
    draggable?:boolean,
    droppable?:boolean,
    setDragging?:any
    shadowed?:boolean,
    dayBoundAssignActivity?:(activity: Activity) => void
};

export default function ActivityTile(props:ActivityTileProp) {
    const textAlignVal=props.textAlignCenter ? "center" : "left"; 

    const onDrop = props.droppable ? (ev:any)=>drop(props.setDragging,ev, props.dayBoundAssignActivity) : undefined;
    const onDragOver = props.droppable ? allowDrop: undefined;
    const draggable = props.draggable;
    const onDragStart = props.draggable ? (ev:any)=>drag(props.setDragging,ev,props.label) : undefined; 
    const onDragEnd = props.draggable ? (ev:any)=> props.setDragging(false) : undefined;

    const possiblyShadowed=props.shadowed && props.droppable ? " shadowed" : "";

    return (
    <div className={"activity-tile-container"+possiblyShadowed} 
        onDrop={onDrop} 
        onDragOver={onDragOver} 
        draggable={draggable} 
        onDragStart={onDragStart} 
        onDragEnd={onDragEnd}
        style={{"textAlign":textAlignVal}}
    >
        {props.label}
    </div>
    );
}