export const pairwise = <T>(arr: T[])=>{
    const toReturn = [];
    for(var i=0; i < arr.length - 1; i++){
        toReturn.push([arr[i], arr[i + 1]]);
    }
    return toReturn;
}

export const copy = (obj : any)=>{
    return Object.assign({}, obj);
    
}

export const choose = (inputArr:any[])=>{
    return inputArr[getRandomInt(inputArr.length)];
}

export const getRandomInt = (max: number)=>{
    return Math.floor(Math.random() * max);
  }

export const triangleProb = (min:number, max:number, pointiness=2)=>{  
    const range = Math.round(max)-Math.round(min);
    const section=range/pointiness;
    let total=0;
    for(let i=0;i<pointiness;i+=1){
        total+=getRandomInt(section);
    }
    return total+min;
}

export const fakePareto = (min:number, max:number, pointiness=3) =>{
    const range = max-min;
    const section=Math.pow(range,(1.0/pointiness));
    let total=1;
    for(let i=0;i<pointiness;i+=1){
        total*=(Math.random() * section);
    }
    return Math.round(total+min);
}