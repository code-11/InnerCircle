import React from "react";
import "./LocalMap.css"
import {tileToColor, Tile} from "./GeographyBuilder";

export default class LocalMap extends React.Component{
    
    props: any;
    
    constructor(props: any){
        super(props)
    }

    render(){
        const {mapData}=this.props;
        if (mapData==undefined){
            return null;
        }else{
            const tileElements=mapData.map((tile:Tile, i:number)=>{
                const styleObj={
                    backgroundColor:tileToColor(tile.tileType)
                }
                return <div key={i} className="local-map-tile" style={styleObj}/>
            })
            return  <div className="local-map">
                {tileElements}
            </div>
        }
    }
}