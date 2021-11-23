import './App.css';
import {NationBuilder} from "./NationBuilder";
import {GeographyBuilder} from "./GeographyBuilder";
import LocalMap from './LocalMap';
import { Component } from 'react';
import Simulation from './Simulation';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      mapData:null,
    }
  } 

  componentDidMount(){
    const geography=new GeographyBuilder(100,100);
    this.setState({
      mapData:(geography.createLocalmap())
    });
    const nation = new NationBuilder();
    const simulation = new Simulation(nation,geography);
    simulation.jobAssignment();
    simulation.houseBuilding();
    console.log(nation.familyHeads);
  }

  render(){
    const {mapData}=this.state;
    return (
      <div className="App">
        <LocalMap mapData={mapData}/>
      </div>
    );
  }
}
