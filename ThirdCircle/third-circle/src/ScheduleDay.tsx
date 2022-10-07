import React from 'react';
import './App.css';
import ActivityTile from './ActivityTile';
import './ScheduleDay.css';
import { GuiState } from './js/GuiState';
import { Activity, Day } from './js/GameState';

type ScheduleDayProp = {
    day:Day,
    guiState:GuiState
    assignActivity:(day: Day, activity: Activity) => void
  };


export function makeActivityTile(i:number,activity:Activity|null, guiState:GuiState, isSlot:boolean, dayBoundAssignActivity?:(activity: Activity) => void){
  const labelToUse=activity ===null ? i.toString() : activity.name;
  return <ActivityTile 
            label={labelToUse}
            textAlignCenter={false}
            shadowed={guiState.isDragging}
            setDragging={guiState.setDragging}         
            droppable={activity ===null}
            draggable={!isSlot}
            dayBoundAssignActivity={dayBoundAssignActivity}
          ></ActivityTile>
}

function makeActivityTiles(activities:Array<Activity | null>, guiState:GuiState, dayBoundAssignActivity:(activity: Activity) => void){
  return activities.map((activity:Activity|null, index:number)=>makeActivityTile(index,activity,guiState,true,dayBoundAssignActivity));
}

export default function ScheduleDay(props:ScheduleDayProp) {
  const shadowed = props.guiState.isDragging;
  const dayBoundAssignActivity = (activity:Activity)=>props.assignActivity(props.day,activity);
  const activityTiles=makeActivityTiles(props.day.activities, props.guiState, dayBoundAssignActivity)

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