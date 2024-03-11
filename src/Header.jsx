import React, { useState } from 'react';
import { MdMail, MdLock } from 'react-icons/md';
import { IoIosPerson, IoIosBriefcase } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const Header = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [wrapperHeight, setWrapperHeight] = useState(450);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

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

    const { setAuthToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());

        try {
            const loginResponse = await fetch('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formDataObj.email, password: formDataObj.password }),
            });

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                if (loginData.success) {
                    console.log(loginData);
                    setAuthToken(loginData.token);
                    navigate('/home');
                } else {
                    console.error('Login failed:', loginData.error);
                }
            } else {
                console.error('Error in login request');
            }
        } catch (error) {
            console.error('Error in login request:', error.message);
        }

        try {
            const signupResponse = await fetch('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: formDataObj.name, email: formDataObj.email, password: formDataObj.password , organization_name: formDataObj.organization_name, hq_adress: formDataObj.hq_adress}),
            });

            if (signupResponse.ok) {
                const signupData = await signupResponse.json();
                if (signupData.success) {
                    console.log(signupData);
                    navigate('/home');
                } else {
                    console.error('Registration failed:', signupData.error);
                }
            } else {
                console.error('Error in registration request');
            }
        } catch (error) {
            console.error('Error in registration request:', error.message);
        }
    };

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
                                    <input type="email" name="email" required />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><MdLock /></span>
                                    <input type="password" name="password" required />
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
                                    <input type="text" name="name" required />
                                    <label>Name</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><MdMail /></span>
                                    <input type="email" name="email" required />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><MdLock /></span>
                                    <input type="password" name="password" required />
                                    <label>Password</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><IoIosBriefcase /></span>
                                    <input type="text" name="organization_name" required />
                                    <label>Organization</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><FaMapMarkerAlt /></span>
                                    <input type="text" name="hq_adress" required />
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
