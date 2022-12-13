import React from 'react';
import './App.css';
import ActivityTile from './ActivityTile';
import './ScheduleDay.css';
import { GuiState } from './js/GuiState';
import { Day } from './js/GameState';
import { Activity } from './js/Activities';

type ScheduleDayProp = {
    day:Day,
    guiState:GuiState
    assignActivity:(day: Day, activity: Activity) => void
  };


export function makeActivityTile(i:number,activity:Activity, guiState:GuiState, isSlot:boolean, dayBoundAssignActivity?:(activity: Activity) => void){
  return <ActivityTile 
            i={i}
            activity={activity}
            textAlignCenter={false}
            shadowed={guiState.isDragging}
            setGuiState={guiState.setSelf}
            getDraggedActivity={guiState.getDraggedActivity}         
            droppable={activity.name ===""}
            draggable={!isSlot}
            dayBoundAssignActivity={dayBoundAssignActivity}
          ></ActivityTile>
}

function makeActivityTiles(activities:Array<Activity>, guiState:GuiState, dayBoundAssignActivity:(activity: Activity) => void){
  return activities.map((activity:Activity, index:number)=>makeActivityTile(index,activity,guiState,true,dayBoundAssignActivity));
}

export default function ScheduleDay(props:ScheduleDayProp) {
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