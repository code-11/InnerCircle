import './App.css';
import {NationBuilder} from "./NationBuilder";
import {GeographyBuilder} from "./GeographyBuilder";
import LocalMap from './LocalMap';
import { Component } from 'react';
import Simulation from './Simulation';
import PowerflowVis from "./PowerflowVis";
import TimeControls from "./TimeControls";

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
    })
  }

  render(){
    const {mapData, powerflow}=this.state;
    return (
      <div className="App">
        {/* <LocalMap class="local-map-wrapper" mapData={mapData}/> */}
        <TimeControls 
          speed={
            this.simulation!=undefined?
              this.simulation.speed:
              0}
          onSetSpeed={
            this.simulation!=undefined?
              (speed)=>this.simulation.onSetSpeed(speed):
              (i)=>{}}
        />
        <PowerflowVis powerflow={powerflow} />
      </div>
    );
  }
}
