import { bindGameState, GameState, makeGameStateDefault } from "./js/GameState";
import { bindGuiState, GuiState, makeGuiStateDefault } from "./js/GuiState";

export type AppState ={
    gamestate:GameState,
    guistate:GuiState,
}

export function makeAppStateDefault(){
    return {
        gamestate:makeGameStateDefault(),
        guistate:makeGuiStateDefault(),
    }
}

export function bindAppState(setAppState:any, appState:AppState){
    bindGuiState(setAppState,appState);
    bindGameState(setAppState,appState);
}