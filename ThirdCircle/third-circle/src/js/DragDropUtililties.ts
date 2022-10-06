import { initializeWeek } from "./GameState";

export function allowDrop(ev:any) {
    ev.preventDefault();
}
  
export function drag(setDragging:any,ev:any, activityLabel:string) {
    if (ev!==null){
        setDragging(true);
        ev.dataTransfer.setData("activityLabel",activityLabel);
    }
}
  
export function drop(setDragging:any,ev:any) {
    if (ev!==null){
        setDragging(false);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("activityLabel");
        alert(data)
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
    }
}