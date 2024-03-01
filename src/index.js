import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import CurentProject from './pages/CurenProject';
import ProjectPage from './pages/ProjectPage';
import Departments from './pages/Departments';
import './index.css';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/curentproject" element={<CurentProject />} />
          <Route path="projectpage" element={<ProjectPage />} />
          <Route path="departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();