import React from 'react';
import './App.css';
import Stocks from './Stocks';
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
      <div id="messages">
        <p>
          You creep into the bed chambers of the queen only to find that another has gotten here before you!
          You try to determine who it might have been but the investiagation reveals no clues.
          Just as you think it best to leave, you hear a shout from the other room and the personal guard comes up behind you.  
        </p>
        <p>
          This is a tesing of the emergency broadcast system.  
        </p>
        <p>
          This is a tesing of the emergency broadcast system.  
        </p>
      </div>
      <div id="stocks">
        <Stocks stocks={[ 
            {name:"Money", amount:0},
            {name:"Ingredients", amount:0},
            {name:"Prestige", amount:0},
            {name:"Health", amount:0},
            {name:"Stress", amount:0},
            {name:"Religiousness", amount:0}
        ]}/>
      </div>
      <div id="next">
        <h1>Continue...</h1>
      </div>
    </div>
  );
}

export default App;
