import React from 'react';
import './App.css';
import ScheduleDay from './ScheduleDay';

type WeekScheduleProp = {
  setDragging:any,
  isDragging:boolean,
};

export default function WeekSchedule(props:WeekScheduleProp) {
  return (
    <div className="week-schedule-container">
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Monday"></ScheduleDay>
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Tuesday"></ScheduleDay>
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Wednesday"></ScheduleDay>
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Thursday"></ScheduleDay>
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Friday"></ScheduleDay>
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Saturday"></ScheduleDay>
      <ScheduleDay isDragging={props.isDragging} setDragging={props.setDragging} header="Sunday"></ScheduleDay>
    </div>
  );
}

