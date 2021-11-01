import './App.css';
import {NationBuilder} from "./NationBuilder";
import {GeographyBuilder} from "./GeographyBuilder";
import LocalMap from './LocalMap';
import { Component } from 'react';

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
  }

  render(){
    const {mapData}=this.state;
    return (
      <div className="App">
        <LocalMap mapData={this.state.mapData}/>
      </div>
    );
  }
}
