import { Stock } from './js/Stocks';
import './Stocks.css';

type StocksProp = {
    stocks: {
        [key in Stock["name"]]: Stock
    };
};

export default function Stocks(props:StocksProp) {

    const makeStock = (stock:Stock, index:number)=>{
        return <div key={index} className="stock-container">
            {stock.iconPath ? <img className="stock-image" src={`/icons/${stock.iconPath}`} title={stock.name}/> : null}
            <div>{stock.amount}</div>
        </div>
    }

    return( 
        <div className="stocks-container">
            {Object.values(props.stocks).map(makeStock)}
        </div>);
    
}