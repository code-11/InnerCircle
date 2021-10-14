import logo from './logo.svg';
import './App.css';
import { fakePareto } from './Utilities';
import {rndAgent} from './Agent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="button" onClick={()=>{
          const arr=[];
          for (let i=0;i<100;i+=1){
            arr.push(rndAgent());
          }
          console.log(arr.map((agt)=>agt.toString()));
        }}/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
