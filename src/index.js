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
import Admin from './pages/Admin';
import MyProjects from './pages/MyProjects';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useSelector } from 'react-redux'
import {store} from './redux/store'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';




const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/home' />}</>
}

function RenderAbout() {
  const location = useLocation();
  const allowedPaths = ['/home', '/curentproject','/employeeskills','/admin']; 

  if (allowedPaths.includes(location.pathname)) {
    return <Sidebar />;
  }

  
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <div>
        <main>
          <RenderAbout /> 
          <Routes>
          <Route element={<RestrictedRoutes />}> 
            <Route path="/" element={<App />} /> 
            </Route>
            <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/curentproject" element={<CurentProject />} />
            <Route path="/about" element={<About />} />
            <Route path="/projectpage" element={<ProjectPage />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/employeeskills" element={<EmployeeSkills />} />
            <Route path="/depmanager" element={<DepManager  />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="myprojects" element={<MyProjects />} />
            </Route>
          </Routes>
        </main>
      </div>

      </Provider>
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
