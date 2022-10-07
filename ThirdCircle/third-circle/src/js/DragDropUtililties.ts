import { Activity, initializeWeek } from "./GameState";

export function allowDrop(ev:any) {
    ev.preventDefault();
}
  
export function drag(setDragging:any,ev:any, activityLabel:string) {
    if (ev!==null){
        setDragging(true);
        ev.dataTransfer.setData("activityLabel",activityLabel);
    }
}
  
export function drop(setDragging:any,ev:any, dayBoundAssignActivity?:(activity: Activity) => void) {
    if (ev!==null){
        setDragging(false);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("activityLabel");
        if (dayBoundAssignActivity!==undefined){
            dayBoundAssignActivity({
                name:data
            })
        }
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
    }
}