import React from 'react';
import './App.css';
import Header from './Header';
import Sign from './Sign';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
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

function App() {
  
  return (
    
      <div className="App">
        <Routes>
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<Header />} />
          </Route>

          <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
        <Sign />
      </div>
    
  );
}

export default App;
