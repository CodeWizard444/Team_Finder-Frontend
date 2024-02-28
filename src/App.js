import React from 'react';
import './App.css';
import Header from './Header';
import Sign from './Sign';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
      <Sign />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
