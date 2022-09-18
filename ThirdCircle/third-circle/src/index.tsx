import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <header>
      <link href="https://www.dafontfree.net/embed/b2xkLWVuZ2xpc2gtdGV4dC1tdC1yZWd1bGFyJmRhdGEvMjYvby8xMzY5NDQvT0xELnR0Zg" rel="stylesheet" type="text/css"/>
      <link href="https://www.dafontfree.net/embed/b2xkLWVuZ2xpc2gtY3lyLXJlZ3VsYXImZGF0YS8yNi9vLzEzNjkzMi9PbGRFbmdsaXNoQ3lyLnR0Zg" rel="stylesheet" type="text/css"/>
    </header>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
