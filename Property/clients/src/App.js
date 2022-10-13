import React from 'react';
import './App.css';
import Home from './components/home/Home';
import DisplayProperty from "./components/DisplayProperties/DisplayProperty";
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom';
function App() {
  return (

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
