import React from 'react';
import './App.css';
import ActivityTile from './ActivityTile';
import './ScheduleDay.css';


type ScheduleDayProp = {
    header: string
};

export default function ScheduleDay(props:ScheduleDayProp) {
  return (
    <div className="schedule-day-container">
        <h3 style={{"textAlign":"center"}}>{props.header}</h3>
        <ActivityTile label="Prayer" textAlignCenter={true}/>
        <ActivityTile label="2"/>
        <ActivityTile label="3"/>
        <ActivityTile label="Sleep" textAlignCenter={true}/>
        <div className="schedule-day-action-container">
            <div className="schedule-day-action-button">Work Late</div>
            <div className="schedule-day-action-button">Forgo Prayer</div>
        </div>
    </div>
  );
}