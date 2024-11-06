import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Tasks/style.css'
import './Accordian/stylesAcc.css'
import App from './App';
import TaskApp from './Tasks/App';
import Accordian from './Accordian';
import reportWebVitals from './reportWebVitals';
import Animation from './Animation/animation'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1 className='h1ForFin'>Recipes app</h1>
    <App />
    <h1 className='h1ForFin'>Task Manager</h1>
    <TaskApp /> 
    <h1 className='h1ForFin'>Accordion</h1>
    <Accordian />
    <h1 className='h1ForFin'>Animation</h1>
    <Animation />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
