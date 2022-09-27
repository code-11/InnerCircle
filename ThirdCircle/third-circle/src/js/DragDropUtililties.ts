import { initializeWeek } from "./GameState";

export function allowDrop(ev:any) {
    ev.preventDefault();
}
  
export function drag(setDragging:any,ev:any) {
    if (ev!==null){
        setDragging(true);
        ev.dataTransfer.setData("text", ev.target.id);
    }
}
  
export function drop(setDragging:any,ev:any) {
    if (ev!==null){
        setDragging(false);
        ev.preventDefault();
        
        alert(JSON.stringify(initializeWeek()))
        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
    }
}