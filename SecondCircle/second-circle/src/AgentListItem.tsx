import { times } from "lodash";
import React from "react";
import Agent, { Stat } from "./Agent";
import './AgentListItem.css';

type AgentListItemProps = {
    agent: Agent;
  }

export default class AgentListItem extends React.Component<AgentListItemProps>{
    constructor(props: any){
        super(props)
    }

    renderStatItem(stat:Stat){
        const statVal=this.props.agent.stats[stat];
        return <div>
            <p>{`${stat}:${statVal}`}</p>
        </div>    
    }

    renderStatList(){
        const allStats = Object.keys(this.props.agent.stats);
        const strToStat=(inputStr:string):Stat=>inputStr as Stat; 
        return <div className="stats">
            {allStats.map((statStr)=>this.renderStatItem(strToStat(statStr)))}
        </div>
    }

    render(){
        const {agent}=this.props;
        return <div className="stats">
            <div>{agent.name}</div>
            <div>{agent.alive?"":"Dead"}</div>
            <div>{agent.sex}</div>
            <div>{agent.age}</div>
            <div>{agent.job.name}</div>
            <div>{this.renderStatList()}</div>
        </div>

    }
}