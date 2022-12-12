import { Activity } from "./Activities";
import { initializeWeek } from "./GameState";

export function allowDrop(ev:any) {
    ev.preventDefault();
}
  
export function drag(setDragging:any,ev:any, activity:Activity) {
    if (ev!==null){
        setDragging(true);
        ev.dataTransfer.setData("activity",activity);
    }
}
  
export function drop(setDragging:any,ev:any, dayBoundAssignActivity?:(activity: Activity) => void) {
    if (ev!==null){
        setDragging(false);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("activity");
        if (dayBoundAssignActivity!==undefined){
            dayBoundAssignActivity(data);
        }
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
    }
}