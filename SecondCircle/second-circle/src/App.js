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
    this.setState({
      mapData:(new GeographyBuilder(100,100)).createLocalmap()
    });
    const nation = new NationBuilder();
    const simulation = new Simulation(nation);
    simulation.jobAssignment();
    console.log(nation.citizens.slice().map((ag)=>ag.toString()));
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
