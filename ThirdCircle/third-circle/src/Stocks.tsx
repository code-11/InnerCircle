import './Stocks.css';

type Stock = {
    name: string;
    amount: number;
    iconPath?:string;
  };

type StocksProp = {
    stocks: Stock[];
};

export default function Stocks(props:StocksProp) {

    const makeStock = (stock:Stock, index:number)=>{
        return <div key={index} className="stock-container">
            {stock.iconPath ? <img className="stock-image" src={`/icons/${stock.iconPath}`}/> : null}
            <div>{stock.name}</div>
            <div>{stock.amount}</div>
        </div>
    }

    return( 
        <div className="stocks-container">
            {props.stocks.map(makeStock)}
        </div>);
    
}