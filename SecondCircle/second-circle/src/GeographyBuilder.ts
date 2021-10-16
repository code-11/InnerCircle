import { getRandomInt,pairwise,choose } from './Utilities';

export enum TileType {
    Dirt , RichSoil , DryDirt , Scrub , Tree , Rock , Water, Bridge ,Wall ,Building
}
export const tileToColor  = (tileType: TileType)=>{

    const tileMap : {[key in TileType]: string}=
    {
        [TileType.Dirt]: "#5C4033", //Dark Brown
        [TileType.RichSoil]: "brown",
        [TileType.DryDirt]: "brown",
        [TileType.Scrub]: "lightgreen",
        [TileType.Tree]: "green",
        [TileType.Rock]: "gray",
        [TileType.Water]: "blue",
        [TileType.Bridge]: "brown",
        [TileType.Wall]: "brown",
        [TileType.Building]: "brown",
    }
    return tileMap[tileType];
}

export type Tile={
    tileType:TileType,
    point: number[],
}

export const neighbors=(x:number,y:number)=>{
    return [[x,y-1],[x+1,y],[x,y+1],[x-1,y]];
}

export const floodFill=(x:number, y:number, type:TileType, tileMap:{[key: string]:Tile})=>{
    let toExpand=[[x,y]];
    const seenPts= new Set();
    while (toExpand.length>0){
        const curPt=toExpand.shift();
        if (curPt && !seenPts.has(ptKey(curPt)) && tileMap[ptKey(curPt)] &&  tileMap[ptKey(curPt)].tileType!==type){
            tileMap[ptKey(curPt)].tileType=type;
            seenPts.add(ptKey(curPt));
            //Only keep the points inside the map
            const curNeighbors=neighbors(curPt[0],curPt[1]).filter((nPt)=>tileMap[ptKey(nPt)]!==undefined);
            toExpand=toExpand.concat(curNeighbors);
        }
    }
}

export const line=(x1:number,y1:number,x2:number,y2:number)=>{
    const lineFunc=(x:number)=>{
        const slope=(y2-y1)/(x2-x1);
        return (slope * (x - x1)) +y1;
    }
    if (x1===x2){
        throw new Error("Invalid arguments. Xs must be different values")
    }
    const diff = Math.sign(x2-x1);
    const toReturn=[[x1,y1]];
    for(let i=x1+1;i!==x2;i+=diff){
        toReturn.push([i,Math.round(lineFunc(i))]);
    }
    toReturn.push([x2,y2])
    return toReturn;
}

export const ptKey=(pt:number[])=>pt[0]+"-"+pt[1];

export class GeographyBuilder{
    width: number;
    height: number;
    
    constructor(width:number, height:number){
        this.width=width;
        this.height=height;
    }

    createMountain(){
        const maxMountainLine=this.height/10;
        const startHeight = getRandomInt(maxMountainLine);
        const endHeight = getRandomInt(maxMountainLine);
        const rndMtLinePoints=[[0,startHeight]];
        let previousY=startHeight;
        for (let i =4;i<this.width;i+=4){
            let possibleNext=previousY + (getRandomInt(8)-4);
            if (possibleNext<0){
                rndMtLinePoints.push([i,0]);
                previousY=4;
            }else if (possibleNext>maxMountainLine){
                rndMtLinePoints.push([i,maxMountainLine]);
                previousY=maxMountainLine-4;
            }else{
                rndMtLinePoints.push([i,possibleNext]);
                previousY=possibleNext;
            }
        }
        rndMtLinePoints.push([this.width-1,endHeight]);
        let allMtPoints : number[][]=[];
        const pairwiseMtPoints=pairwise(rndMtLinePoints);
        pairwiseMtPoints.forEach((ptPair)=>{
            const p1=ptPair[0];
            const p2=ptPair[1];
            const linePoints=line(p1[0],p1[1]+5,p2[0],p2[1]+5);
            const linePointsB=line(p1[0],p1[1]+6,p2[0],p2[1]+6);
            const linePointsC=line(p1[0],p1[1]+7,p2[0],p2[1]+7);
            allMtPoints=allMtPoints.concat(linePoints).concat(linePointsB).concat(linePointsC);
        });
        return allMtPoints.map((pt)=>{return {point: pt,tileType:TileType.Rock}});
    }

    createRiver(){
        const possibleEndpoints=[];
        for(let i=this.height/2;i<this.height-1;i+=1){
            possibleEndpoints.push([0,i]);
        }
        for(let i=0;i<this.width;i+=1){
            possibleEndpoints.push([i,this.height-1]);
        }
        for(let i=this.height/2;i<this.height-1;i+=1){
            possibleEndpoints.push([this.width-1,i]);
        }
        const endPoint= choose(possibleEndpoints);
        

    }

    createLocalmap(){
        const mtTiles=this.createMountain();
        const tileMap:{[key: string]:Tile}={};
        
        mtTiles.forEach((tile)=>{
            tileMap[ptKey(tile.point)]=tile;
        })
        for(let i=0;i<this.width;i+=1){
            for(let j=0;j<this.height;j+=1){
                const possibleVal=tileMap[ptKey([i,j])];
                if (possibleVal===undefined){
                    tileMap[ptKey([i,j])]={point:[i,j],tileType:TileType.Dirt};
                }
            }
        }

        floodFill(0,0,TileType.Rock,tileMap);

        return Object.values(tileMap).sort((v1,v2)=>{
            if (v2.point[1]<v1.point[1]){
                return 1;
            }else if (v1.point[1] < v2.point[1]){
                return -1;
            }else{
                if (v2.point[0]<v1.point[0]){
                    return 1;
                }else if (v1.point[0]<v2.point[0]){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
    }
}