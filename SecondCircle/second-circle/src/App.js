import logo from './logo.svg';
import './App.css';
import { fakePareto } from './Utilities';
import {rndAgent} from './Agent';
import {NationBuilder} from "./NationBuilder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="button" onClick={()=>{
          (new NationBuilder()).createCitizenry();
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
