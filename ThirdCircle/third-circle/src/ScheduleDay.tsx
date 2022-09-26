import React from 'react';
import './App.css';
import ActivityTile from './ActivityTile';
import './ScheduleDay.css';

type ScheduleDayProp = {
    header: string,
    setDragging:any,
    isDragging:boolean,
};

export default function ScheduleDay(props:ScheduleDayProp) {
  const shadowed = props.isDragging;

  return (
    <div className="schedule-day-container">
        <h3 style={{"textAlign":"center"}}>{props.header}</h3>
        <ActivityTile shadowed={props.isDragging} label="Prayer" textAlignCenter={true}/>
        <ActivityTile shadowed={props.isDragging} label="2" setDragging={props.setDragging} droppable={true}/>
        <ActivityTile shadowed={props.isDragging} label="3" setDragging={props.setDragging} droppable={true}/>
        <ActivityTile shadowed={props.isDragging} label="Sleep" textAlignCenter={true}/>
        <div className="schedule-day-action-container">
            <div className="schedule-day-action-button">Work Late</div>
            <div className="schedule-day-action-button">Forgo Prayer</div>
        </div>
    </div>
  );
}