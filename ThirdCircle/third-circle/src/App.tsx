import React, {useState} from 'react';
import './App.css';
import Stocks from './Stocks';
import WeekSchedule from './WeekSchedule';
import {allPossibleActivities} from './js/Activities';
import ActivityTile from './ActivityTile';
import {makeActivityTile} from './ScheduleDay';
import { AppState, makeAppStateDefault, bindAppState } from './AppState';
import Relations from './Relations';

function App() {
  const [appState, setAppState]=useState(makeAppStateDefault());
  bindAppState(setAppState, appState);
  const activityTiles=allPossibleActivities.map((activity)=>makeActivityTile(0,activity, appState.guistate,false));

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
        <WeekSchedule appState={appState}/>
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
            {name:"Health", amount:0, iconPath: "staff-snake-solid.png"},
        ]}/>
      </div>
      <div id="relations">
        <Relations relations={appState.gamestate.relations}/>
      </div>
      <div id="next">
        <h1>Continue...</h1>
      </div>
    </div>
  );
}

export default App;
