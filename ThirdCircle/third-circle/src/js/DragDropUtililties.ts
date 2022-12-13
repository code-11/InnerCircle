import { Activity, createBlankActivity } from "./Activities";
import { initializeWeek } from "./GameState";

export function allowDrop(ev:any) {
    ev.preventDefault();
}
  
export function drag(setGuiState:any, ev:any, activity:Activity) {
    if (ev!==null){
        setGuiState({
            isDragging:true,
            draggedActivity:activity
        })
    }
}
  
export function drop(setGuiState:any, getDraggedActivity:any, ev:any, dayBoundAssignActivity?:(activity: Activity) => void) {
    if (ev!==null){
        
        ev.preventDefault();
        if (dayBoundAssignActivity!==undefined){
            dayBoundAssignActivity(getDraggedActivity());
        }
        setGuiState({
            isDragging:false,
            draggedActivity:createBlankActivity()
        })
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
    }
}