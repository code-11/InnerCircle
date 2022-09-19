import './Stocks.css';

type Stock = {
    name: string;
    amount: number;
  };

type StocksProp = {
    stocks: Stock[];
};

export default function Stocks(props:StocksProp) {

    const makeStock = (stock:Stock, index:number)=>{
        return <div key={index} className="stock-container">
            <div>{stock.name}</div>
            <div>{stock.amount}</div>
        </div>
    }

    return( 
        <div className="stocks-container">
            {props.stocks.map(makeStock)}
        </div>);
    
}