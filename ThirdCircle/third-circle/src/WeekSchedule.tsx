import React from 'react';
import './App.css';
import { AppState } from './AppState';
import { Day, GameState } from './js/GameState';
import { GuiState } from './js/GuiState';
import ScheduleDay from './ScheduleDay';

type WeekScheduleProp = {
  appState:AppState
};


function makeDay(day:Day,guiState:GuiState){
  return <ScheduleDay day={day} guiState={guiState}></ScheduleDay>
}

function makeDays(gameState:GameState, guiState:GuiState){
  return gameState.schedule.map((day:Day) => makeDay(day,guiState));
}

export default function WeekSchedule(props:WeekScheduleProp) {
  const days= makeDays(props.appState.gamestate,props.appState.guistate)
  return (
    <div className="week-schedule-container">
      {days}
    </div>
  );
}

