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
            this.agentToNode[child.id]=this.head;
        }else{
            if (parent.id in this.agentToNode){
                const parentNode=this.agentToNode[parent.id];
                const childNode=new PowerflowNode(child);
                this.agentToNode[child.id]=childNode;
                parentNode.children.push(childNode);
            }else{
                console.log("Parent not found");
            }
        }
    }

}