import './ActivityTile.css';

type ActivityTileProp = {
    label: string,
    textAlignCenter?:boolean,
};

export default function ActivityTile(props:ActivityTileProp) {
    const textAlignVal=props.textAlignCenter ? "center" : "left"; 
    return (
    <div className="activity-tile-container" style={{"textAlign":textAlignVal}}>
        {props.label}
    </div>
    );
}