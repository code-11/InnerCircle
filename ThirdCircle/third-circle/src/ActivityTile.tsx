import './ActivityTile.css';
import { Activity } from './js/Activities';
import {drag, drop, allowDrop} from './js/DragDropUtililties';
import { Day } from './js/GameState';

type ActivityTileProp = {
    i:number,
    activity:Activity,
    textAlignCenter?:boolean,
    draggable?:boolean,
    droppable?:boolean,
    setGuiState?:any,
    getDraggedActivity?:any,
    shadowed?:boolean,
    dayBoundAssignActivity?:(activity: Activity) => void
};

export default function ActivityTile(props:ActivityTileProp) {
    const textAlignVal=props.textAlignCenter ? "center" : "left"; 

    const onDrop = props.droppable ? (ev:any)=>drop(props.setGuiState, props.getDraggedActivity,ev, props.dayBoundAssignActivity) : undefined;
    const onDragOver = props.droppable ? allowDrop: undefined;
    const draggable = props.draggable;
    const onDragStart = props.draggable ? (ev:any)=>drag(props.setGuiState,ev,props.activity) : undefined; 
    const onDragEnd = props.draggable ? (ev:any)=> props.setGuiState({isDragging:false}) : undefined;

    const possiblyShadowed=props.shadowed && props.droppable ? " shadowed" : "";

    return (
    <div className={"activity-tile-container"+possiblyShadowed} 
        title={props.activity.desc}
        onDrop={onDrop} 
        onDragOver={onDragOver} 
        draggable={draggable} 
        onDragStart={onDragStart} 
        onDragEnd={onDragEnd}
        style={{"textAlign":textAlignVal}}
    >
        {props.activity.name=="" ? props.i : props.activity.name}
    </div>
    );
}