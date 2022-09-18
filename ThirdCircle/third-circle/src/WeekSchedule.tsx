import React from 'react';
import './App.css';
import ScheduleDay from './ScheduleDay';

export default function WeekSchedule() {
  return (
    <div className="week-schedule-container">
      <ScheduleDay header="Monday"></ScheduleDay>
      <ScheduleDay header="Tuesday"></ScheduleDay>
      <ScheduleDay header="Wednesday"></ScheduleDay>
      <ScheduleDay header="Thursday"></ScheduleDay>
      <ScheduleDay header="Friday"></ScheduleDay>
      <ScheduleDay header="Saturday"></ScheduleDay>
      <ScheduleDay header="Sunday"></ScheduleDay>
    </div>
  );
}

