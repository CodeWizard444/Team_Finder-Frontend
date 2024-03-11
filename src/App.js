import React from 'react';
import './App.css';
import Header from './Header';
import Sign from './Sign';
import Home from './pages/Home';
import { AuthProvider } from './auth/AuthContext';
import { Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Sign />
      </div>
    </AuthProvider>
  );
}

export default App;
