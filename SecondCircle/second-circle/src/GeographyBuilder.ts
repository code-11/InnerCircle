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

const slope=(pt1 : number[], pt2:number[])=>{
    return (pt2[1]-pt1[1])/(pt2[0]-pt1[0]);
}

export const line=(x1:number,y1:number,x2:number,y2:number)=>{
    const lineFunc=(x:number)=>{
        const slopeVal=slope([x1,y1],[x2,y2]);
        return (slopeVal * (x - x1)) +y1;
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

export const midpoint=(pt1:number[],pt2:number[])=>{
    return [(pt2[0]+pt1[0])/2, (pt2[1]+pt1[1])/2];
}

export const distance=(pt1: number[], pt2:number[])=>{
    return Math.sqrt(Math.pow(pt2[0]-pt1[0],2) + Math.pow(pt2[1]-pt1[1],2))
}

export const ptKey=(pt:number[])=>pt[0]+"-"+pt[1];

export class GeographyBuilder{
    width: number;
    height: number;
    
    constructor(width:number, height:number){
        this.width=width;
        this.height=height;
    }

    createMountain():Tile[]{
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

    createRiver(mtPoints:Tile[]){
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
        const startTest=(pt:number[])=>{
            if (endPoint[0] > this.width/2){
                return pt[0] <this.width/2; 
            }else{
                return pt[0] >=this.width/2;
            }
        }
        let possibleStartPoint=choose(mtPoints).point;
        while(!startTest(possibleStartPoint)){
            possibleStartPoint=choose(mtPoints).point;
        }
        
        //Now we have start and end points. Iterate midpoint drifting.
        const midpointDrift=(start:number[],end : number[],depth: number=0)=>{
            if (depth==4){
                return line(start[0],start[1],end[0],end[1]);
            }else{
                const midPt=midpoint(start,end);
                const slopeVal=slope(start,end);
                const perpSlopeVal=-1/slopeVal;
                const origDis=distance(start,end);
                const newDis= origDis/4;
                const randSide=choose([1,-1]);
                const newMidPointX=midPt[0] + (randSide*newDis)/Math.sqrt(1+Math.pow(perpSlopeVal,2)); 
                const newMidPointY=(perpSlopeVal * (newMidPointX - midPt[0])) +midPt[1];
                let newMidPoint=[newMidPointX,newMidPointY];
                // if (newMidPointX >= 0 && newMidPointX<this.width-1 && newMidPointY >= 0 && newMidPointY< this.width-1){
                //     newMidPoint=[newMidPointX,newMidPointY];
                // }else{
                //     const newMidPointX2=midPt[0] - (randSide*newDis)/Math.sqrt(1+Math.pow(perpSlopeVal,2)); 
                //     const newMidPointY2=(perpSlopeVal * (newMidPointX - midPt[0])) +midPt[1];
                //     if (newMidPointX2 >= 0 && newMidPointX2<this.width-1 && newMidPointY2 >= 0 && newMidPointY2< this.width-1){
                //         newMidPoint=[newMidPointX2,newMidPointY2];
                //     }else{
                //         return line(start[0],start[1],end[0],end[1]);
                //     }
                // }
                const firstHalf : number[][] = midpointDrift(start, newMidPoint,depth+1);
                const secondHalf : number[][] = midpointDrift(newMidPoint,end,depth+1);
                return firstHalf.concat(secondHalf);
                // return [[Math.round(newMidPointX), Math.round(newMidPointY)],[Math.round(midPt[0]),Math.round(midPt[1])]];
                // return [Math.round(midPt[0]),Math.round(midPt[1])];
            }
        }
        const toReturn = midpointDrift(possibleStartPoint,endPoint);
        return toReturn.map((pt)=>[Math.round(pt[0]),Math.round(pt[1])]);
        // return [possibleStartPoint,drift[0],drift[1],endPoint];
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

        const riverPts=this.createRiver(mtTiles);
        riverPts.forEach((pt)=>{
            tileMap[ptKey(pt)].tileType=TileType.Water;
        })

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