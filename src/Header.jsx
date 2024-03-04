import React, { useState } from 'react';
import { MdMail, MdLock } from 'react-icons/md';
import { IoIosPerson, IoIosBriefcase } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './header.css';
import {Link,useNavigate} from 'react-router-dom';
const Header = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [wrapperHeight, setWrapperHeight] = useState(450);
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        setShowLoginForm(!showLoginForm);
        setShowRegisterForm(false);
    }

    const handleRegisterLinkClick = () => {
        setShowRegisterForm(true);
        setShowLoginForm(false);
        setWrapperHeight(600);
    }

    const handleCloseButtonClick = () => {
        setShowLoginForm(false);
        setShowRegisterForm(false);
        setWrapperHeight(450);
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        navigate('/home');
    }

    return (
        <div className="app__navbar">
            <div className="app__navbar-logo">
                <Link to="/about">Logo</Link>
            </div>
            <div className="app__navbar-login">
                <button type="button" onClick={handleLoginButtonClick}>Login</button>
                {showLoginForm && (
                    <div className="wrappe">
                        <span className="icon-close" onClick={handleCloseButtonClick}>×</span>
                        <div className="form-box login">
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <span className="icon"><MdMail /></span>
                                    <input type="email" required />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><MdLock /></span>
                                    <input type="password" required />
                                    <label>Password</label>
                                </div>
                                <div className="remember-forgot">
                                    <label><input type="checkbox" />Remember me</label>
                                    <a href="#">Forgot Password?</a>
                                </div>
                                <button type="submit" className="btn">Login</button>
                                <div className="app__navbar-register">
                                    <div className="login-register">
                                    <p>Don't have an account?
                                     <a href="#" className="register-link" onClick={handleRegisterLinkClick}>Register</a>
                                    </p>
                                    </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                )}
            
            
                {showRegisterForm && (
                    <div className="wrappe">
                        <span className="icon-close" onClick={handleCloseButtonClick}>×</span>
                        <div className="form-box register">
                            <h2>Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <span className="icon"><IoIosPerson /></span>
                                    <input type="text" required />
                                    <label>Name</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><MdMail /></span>
                                    <input type="email" required />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><MdLock /></span>
                                    <input type="password" required />
                                    <label>Password</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><IoIosBriefcase /></span>
                                    <input type="text" required />
                                    <label>Organization</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><FaMapMarkerAlt /></span>
                                    <input type="text" required />
                                    <label>HQ Address</label>
                                </div>
                                <div className="remember-forgot">
                                    <label><input type="checkbox" />I agree with the terms & conditions</label>
                                </div>
                                <button type="submit" className="btn">Register</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;
