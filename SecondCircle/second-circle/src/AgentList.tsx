import React from "react";
import Agent from "./Agent";
import AgentListItem from "./AgentListItem";

type AgentListProps = {
    agents: Agent[];
  }

  export default class AgentList extends React.Component<AgentListProps>{
    constructor(props: any){
        super(props)
    }
    render(){
        const {agents}=this.props;
        return <div>
            {agents.map((agent)=><AgentListItem agent={agent}/>)}
        </div>
    }
  }
