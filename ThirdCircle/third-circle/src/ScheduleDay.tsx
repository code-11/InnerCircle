import React from 'react';
import './App.css';
import ActivityTile from './ActivityTile';
import './ScheduleDay.css';
import { AppState } from './AppState';
import { GuiState } from './js/GuiState';
import { Activity, Day } from './js/GameState';

type ScheduleDayProp = {
    day:Day,
    guiState:GuiState
  };


export function makeActivityTile(i:number,activity:Activity|null, guiState:GuiState, isSlot:boolean){
  const labelToUse=activity ===null ? i.toString() : activity.name;
  return <ActivityTile 
            label={labelToUse}
            textAlignCenter={false}
            shadowed={guiState.isDragging}
            setDragging={guiState.setDragging}         
            droppable={activity ===null}
            draggable={!isSlot}
          ></ActivityTile>
}

function makeActivityTiles(activities:Array<Activity | null>, guiState:GuiState){
  return activities.map((activity:Activity|null, index:number)=>makeActivityTile(index,activity,guiState,true));
}

export default function ScheduleDay(props:ScheduleDayProp) {
  const shadowed = props.guiState.isDragging;

  const activityTiles=makeActivityTiles(props.day.activities, props.guiState)

  return (
    <div className="schedule-day-container">
        <h3 style={{"textAlign":"center"}}>{props.day.name}</h3>
          {activityTiles}
        <div className="schedule-day-action-container">
            <div className="schedule-day-action-button">Work Late</div>
            <div className="schedule-day-action-button">Forgo Prayer</div>
        </div>
    </div>
  );
}