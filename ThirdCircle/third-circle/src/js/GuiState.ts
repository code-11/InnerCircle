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

export function bindSetDragging(setState:any, guiState:GuiState){
    const setDragging=(dragging:boolean)=>{
        const newState:GuiState={...guiState};
        newState.isDragging=dragging;
        setState(newState);
    }
    guiState.setDragging=setDragging;

}

export function bindGuiState(setState:any, guiState:GuiState){
    bindSetDragging(setState,guiState);
}