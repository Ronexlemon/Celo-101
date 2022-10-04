import React from 'react';
import './App.css';
import Home from './components/home/Home';
import DisplayProperty from "./components/DisplayProperties/DisplayProperty";
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className='App'>
      <BrowserRouter>
      <Routes>
<Route path='/' element={<Home />}/>
<Route path='/DisplayProperty' element={<DisplayProperty/>}/>
</Routes>

</BrowserRouter>

    </div>
    
  );
}

export default App;
