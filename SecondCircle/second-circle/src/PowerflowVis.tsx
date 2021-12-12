import React from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import dagre from 'cytoscape-dagre';
import Powerflow from "./Powerflow";

type PowerflowVisProps = {
  powerflow: Powerflow;
}

export default class PowerflowVis extends React.Component<PowerflowVisProps> {
    constructor(props:PowerflowVisProps){
      super(props);
    }
  
    render(){
      const {powerflow}=this.props;

      const elements=[];

      const layout = { name: 'dagre' };

      const nodes= [powerflow.head];
      while (nodes.length>0){
        const node=nodes.shift();
        if (node !==undefined || node!==null){
          elements.push({
            data:{id:""+node!.data.id, label:node!.data.name}
          });
          for (let child of node!.children){
            elements.push({
              data:{source:node!.data.id, target:child.data.id}
            });
          }
        }
      }
  
      return <div className="powerflow-wrapper">
        <CytoscapeComponent layout={layout} elements={elements} style={ { backgroundColor:"blue", width: '1600px', height: '800px' } } />
      </div>;
    }
  }