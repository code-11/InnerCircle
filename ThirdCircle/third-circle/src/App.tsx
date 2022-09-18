import React from 'react';
import './App.css';
import { ConstraintLayout, ConstraintGuide } from "react-constraint-layout";

function App() {
  return (
    <div id="App">
      <div id="tiles">1</div>
      <div id="schedule">1</div>
      <div id="messages">2</div>
      <div id="stocks">3</div>
      <div id="next">4</div>
    </div>
  );
}

export default App;
