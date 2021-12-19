import './TimeControls.css';
import React from "react";

const MAX_SPEED=5;
const TIME_MULT=3000;


type TimeControlState = {
    speed: number;
    time:number;
 }

export default class TimeControls extends React.PureComponent<{},TimeControlState>{
    
    timeoutObj:NodeJS.Timeout | null;

    constructor(props:any){
        super(props);
        this.timeoutObj=null;
        this.state={
            time:0,
            speed:0,
        }
    }
    
    componentDidMount(){
        this.play();
    }

    setSpeed(speed:number){
        if (this.timeoutObj!==null){
            clearTimeout(this.timeoutObj);
        }
        this.setState({
                speed
            },
            this.play
        );
    }

    play(){ 
        const {speed,time} = this.state;
        const self=this;
        if (speed!=0){
            this.timeoutObj=setInterval(()=>{
                self.setState({time:self.state.time + 1})
            }, TIME_MULT/speed);
        }
    }

    render(){
        const {speed,time}=this.state;
        const speedControls=[];
        for(let i=0;i<=MAX_SPEED;i+=1){
            const className= i==speed ? "activeCtrl" : "inactiveCtrl";
            speedControls.push(
                <div key={i} className={className} onClick={()=>{
                    this.setSpeed(i);
                }}>
                    {"x"+i}
                </div>
            );
        }
        return <div className="container">
            <p className="date">{"t="+time}</p>
            {speedControls}
        </div>
    }
}