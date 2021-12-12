import './App.css';
import {NationBuilder} from "./NationBuilder";
import {GeographyBuilder} from "./GeographyBuilder";
import LocalMap from './LocalMap';
import { Component } from 'react';
import Simulation from './Simulation';
import PowerflowVis from "./PowerflowVis";

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
    const simulation = new Simulation(nation,geography);
    simulation.jobAssignment();
    simulation.houseBuilding();
    this.setState({
      mapData:(geography.getReactTileMap()),
      powerflow:simulation.createPowerflow(),
    });
    console.log(nation.familyHeads);
  }

  render(){
    const {mapData, powerflow}=this.state;
    return (
      <div className="App">
        {/* <LocalMap class="local-map-wrapper" mapData={mapData}/> */}
        <PowerflowVis powerflow={powerflow} />
      </div>
    );
  }
}
