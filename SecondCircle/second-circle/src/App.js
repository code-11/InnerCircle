import './App.css';
import {NationBuilder} from "./NationBuilder";
import {GeographyBuilder} from "./GeographyBuilder";
import LocalMap from './LocalMap';
import { Component } from 'react';
import Simulation from './Simulation';
import PowerflowVis from "./PowerflowVis";
import TimeControls from "./TimeControls";
import Agent from './Agent';
import AgentList from './AgentList';
import Counter from './Counter';
import Job from './Job';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      mapData:null,
    }
  } 

  componentDidMount(){
    const geography=new GeographyBuilder(100,100);
    const nation = new NationBuilder();
    this.simulation = new Simulation(nation,geography);
    this.simulation.jobAssignment();
    this.simulation.houseBuilding();
    const powerflow =this.simulation.createPowerflow()
    this.setState({
      mapData:(geography.getReactTileMap()),
    });
    this.simulation.assignStartingResources();
    this.simulation.play(nation.citizens,powerflow);
    this.setState({
      powerflow:powerflow,
      citizens:nation.citizens,
    });
  }

  render(){
    const {mapData,citizens, powerflow}=this.state;
    const onAdvance=()=>{
      if (this.simulation) this.simulation.play(citizens,powerflow);
    }
    const onInfo=()=>{
      if (citizens) console.log(citizens);
    }
    return (
      <div className="App">
        {/* <LocalMap class="local-map-wrapper" mapData={mapData}/> */}
        {/*<TimeControls 
          speed={
            this.simulation!=undefined?
              this.simulation.speed:
              0}
          onSetSpeed={
            this.simulation!=undefined?
              (speed)=>this.simulation.onSetSpeed(speed):
              (i)=>{}}
          />*/}
          <button onClick={onAdvance}> Next Month</button>
          <button onClick={onInfo}> Info </button>
        <PowerflowVis powerflow={powerflow}/>
        <AgentList agents={citizens?citizens:[]}/>
      </div>
    );
  }
}
