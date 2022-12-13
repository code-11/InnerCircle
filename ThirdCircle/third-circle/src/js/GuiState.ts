import { AppState } from "../AppState";
import { Activity, createBlankActivity } from "./Activities";

export type GuiState = {
    isDragging:boolean,
    setSelf: any,
    draggedActivity: Activity,
    getDraggedActivity: any,
};

export function makeGuiStateDefault(){
    return {
        isDragging:false,
        setSelf:null,
        draggedActivity:createBlankActivity(),
        getDraggedActivity:null,
    }
}

export function bindSetSelf(setAppState:any, appState:AppState){
    const setSelf=(newState:any)=>{
        const newGuiState:GuiState={...appState.guistate, ...newState};
        setAppState({guistate:newGuiState, gamestate:appState.gamestate});
    }
    appState.guistate.setSelf=setSelf;
}

export function bindGetDraggedActivity(setAppState:any, appState:AppState){
    const getDraggedActivity=()=>appState.guistate.draggedActivity
    appState.guistate.getDraggedActivity=getDraggedActivity;
}

export function bindGuiState(setAppState:any, appState:AppState){
    bindSetSelf(setAppState,appState);
    bindGetDraggedActivity(setAppState,appState);
}


