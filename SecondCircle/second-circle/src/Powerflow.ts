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

    addChild(parent:Agent|null,child:Agent):PowerflowNode{
        if (parent==null){
            this.head=new PowerflowNode(child);
            this.agentToNode[child.id]=this.head;
            return this.head;
        }else{
            if (parent.id in this.agentToNode){
                const parentNode=this.agentToNode[parent.id];
                const childNode=new PowerflowNode(child);
                childNode.power=parentNode.power+1;
                this.agentToNode[child.id]=childNode;
                parentNode.children.push(childNode);
                return childNode;
            }else{
                throw "Parent not found";
            }
        }
    }

    getHead(){
        return this.head;
    }

    getNodePower(agentId:number){
        return this.agentToNode[agentId].power;
    }

    getAgents(){
        return Object.values(this.agentToNode).map(node=>node.data);
    }

    getDirectChildren(agent:Agent){
        return this.agentToNode[agent.id].children;
    }

    childrenHaveJob(agent:Agent,jobName:string){
        const children:Agent[]=this.getDirectChildren(agent).map(c=>c.data);
        for (const child of children){
            if (child.job.name==jobName){
                return true;
            }
        }
        return false;
    }

}