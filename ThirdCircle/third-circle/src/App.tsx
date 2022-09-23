import React from 'react';
import './App.css';
import Stocks from './Stocks';
import WeekSchedule from './WeekSchedule';
import {activities, Activity} from './js/Activities';
import ActivityTile from './ActivityTile';

const makeActivityTile=(activity:Activity)=>{
  return <ActivityTile label={`${activity.type} : ${activity.label}`}/>
}

function App() {

  const activityTiles=activities.map(makeActivityTile);

  return (
    <div id="App">
      <div id="tiles">
        {activityTiles}
      </div>
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
            {name:"Money", amount:0, iconPath:"coins-solid.png"},
            {name:"Ingredients", amount:0, iconPath:"scroll-solid.png"},
            {name:"Prestige", amount:0, iconPath: "star-solid.png"},
            {name:"Health", amount:0, iconPath: "staff-snake-solid.png"},
            {name:"Stress", amount:0, iconPath: "star-of-life-solid.png"},
            {name:"Religiousness", amount:0, iconPath: "hands-praying-solid.png"}
        ]}/>
      </div>
      <div id="next">
        <h1>Continue...</h1>
      </div>
    </div>
  );
}

export default App;
