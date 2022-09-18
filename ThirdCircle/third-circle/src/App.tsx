import React from 'react';
import './App.css';
import WeekSchedule from './WeekSchedule';

function App() {
  return (
    <div id="App">
      <div id="tiles">1</div>
      <div id="cur-date">
        <h2>Year 1 - Week 23 </h2>
        <h3>Summer</h3>
      </div>
      <div id="schedule">
        <WeekSchedule/>
      </div>
      <div id="messages">2</div>
      <div id="stocks">
      </div>
      <div id="next">
        <h1>Continue...</h1>
      </div>
    </div>
  );
}

export default App;
