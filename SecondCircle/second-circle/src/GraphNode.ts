export default class GraphNode<DataType>{
    children : Array<GraphNode<DataType>> = [];
    data: DataType;
    constructor( data:DataType){
        this.data=data;
    }
}