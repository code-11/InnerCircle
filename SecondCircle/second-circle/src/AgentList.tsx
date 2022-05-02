import React from "react";
import Agent from "./Agent";
import AgentListItem from "./AgentListItem";
import { sortByFunc } from "./Utilities";

type AgentListProps = {
    agents: Agent[];
}
type AgentListState ={
    sort:{
        id: string,
        func: (arr: Agent[]) => Agent[],
    },
}

export default class AgentList extends React.Component<AgentListProps,AgentListState>{
    constructor(props: AgentListProps){
        super(props);
        this.state={
            sort:Agent.displayPropertyComparators()[0],
        }
    }
    render(){
        const {agents}=this.props;
        const {sort} =this.state;
        const sortId=sort.id;
        const sortFunc=sort.func;
        const sortedAgents=sortFunc(agents);

        return <div>
            {Agent.displayPropertyComparators().map((sort)=>{
                const localSortId=sort.id;
                return <button onClick={(e)=>{
                    this.setState({
                        sort
                    })
                }}>{localSortId}</button>
            })}
            {sortedAgents.map((agent)=><AgentListItem key={agent.id} agent={agent}/>)}
        </div>
    }
}
