import React from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import Powerflow from "./Powerflow";

cytoscape.use( dagre );

type PowerflowVisProps = {
  powerflow: Powerflow;
}

export default class PowerflowVis extends React.Component<PowerflowVisProps> {
    constructor(props:PowerflowVisProps){
      super(props);
    }
  
    render(){
      const {powerflow}=this.props;

      if (powerflow == undefined){
        return <div>{"No powerflow found"}</div>;
      }

      const elements=[];

      const layout = { name: 'dagre' };

      for (let node of Object.values(powerflow.agentToNode)){
        elements.push({
          data:{id:""+node!.data.id, label:node!.data.name}
        });
      }

      for (let node of Object.values(powerflow.agentToNode)){
        for (let child of node.children){
          elements.push({
            data:{source:node!.data.id, target:child.data.id}
          });
        }
      }

      // const nodes= [powerflow.head];
      // while (nodes.length>0){
      //   const node=nodes.shift();
      //   if (node !==undefined || node!==null){
      //     elements.push({
      //       data:{id:""+node!.data.id, label:node!.data.name}
      //     });
      //     for (let child of node!.children){
      //       elements.push({
      //         data:{source:node!.data.id, target:child.data.id}
      //       });
      //     }
      //   }
      // }
  
      return <div className="powerflow-wrapper">
        <CytoscapeComponent layout={layout} elements={elements} style={ { backgroundColor:"blue", width: '1600px', height: '800px' } } />
      </div>;
    }
  }