import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import CurentProject from './pages/CurenProject';
import ProjectPage from './pages/ProjectPage';
import Departments from './pages/Departments';
import Skills from './pages/Skills';
import Sidebar from './pages/Sidebar';
import EmployeeSkills from './pages/EmployeeSkills';
import DepManager from './pages/DepManager';
import './index.css';
import reportWebVitals from './reportWebVitals';

function RenderAbout() {
  const location = useLocation();
  const allowedPaths = ['/home', '/curentproject','/employeeskills']; 

  if (allowedPaths.includes(location.pathname)) {
    return <Sidebar />;
  }
  
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <main>
          <RenderAbout /> 
          <Routes>
            <Route path="/" element={<App />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/curentproject" element={<CurentProject />} />
            <Route path="/about" element={<About />} />
            <Route path="/projectpage" element={<ProjectPage />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/employeeskills" element={<EmployeeSkills />} />
            <Route path="/depmanager" element={<DepManager />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
