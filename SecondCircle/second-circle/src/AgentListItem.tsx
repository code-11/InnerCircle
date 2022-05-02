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

    statId(stat:Stat,agent:Agent){
        return `${agent.id}-${stat}`;
    }

    renderStatItem(stat:Stat){
        const statVal=this.props.agent.stats[stat];
        return <div key={this.statId(stat,this.props.agent)}>
            <p>{`${stat}:${statVal}`}</p>
        </div>    
    }

    renderStatList(){
        const allStats = Object.keys(this.props.agent.stats);
        const strToStat=(inputStr:string):Stat=>inputStr as Stat; 
        return <div className="flexGap">
            {allStats.map((statStr)=>this.renderStatItem(strToStat(statStr)))}
        </div>
    }

    render(){
        const {agent}=this.props;
        return <div key={agent.id} className="flexGap">
            <div key="name">{agent.name}</div>
            <div key="alive">{agent.alive?"":"Dead"}</div>
            <div key="sex">{agent.sex}</div>
            <div key="age">{agent.age}</div>
            <div key="job-name">{agent.job.name}</div>
            <div key="stats">{this.renderStatList()}</div>
        </div>

    }
}