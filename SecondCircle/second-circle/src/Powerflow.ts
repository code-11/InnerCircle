import Agent from "./Agent";
import GraphNode from "./GraphNode";

class PowerflowNode extends GraphNode<Agent>{
    power:number=0;
    constructor(agent:Agent){
        super(agent);
    }
}

export default class Powerflow{

    head: PowerflowNode|null=null;
    agentToNode : {[key:string]:PowerflowNode} = {};

    addChild(parent:Agent|null,child:Agent){
        if (parent==null){
            this.head=new PowerflowNode(child);
        }else{

        }
    }

}