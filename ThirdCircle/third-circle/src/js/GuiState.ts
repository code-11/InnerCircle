import { AppState } from "../AppState";

export type GuiState = {
    isDragging:boolean,
    setDragging: any,
};

export function makeGuiStateDefault(){
    return {
        isDragging:false,
        setDragging:null,
    }
}

export function bindSetDragging(setAppState:any, appState:AppState){
    const setDragging=(dragging:boolean)=>{
        const newGuiState:GuiState={...appState.guistate};
        newGuiState.isDragging=dragging;
        setAppState({guistate:newGuiState, gamestate:appState.gamestate});
    }
    appState.guistate.setDragging=setDragging;

}

export function bindGuiState(setAppState:any, appState:AppState){
    bindSetDragging(setAppState,appState);
}