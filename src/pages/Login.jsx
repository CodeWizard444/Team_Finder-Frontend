import React, { useState } from 'react';
import { MdMail, MdLock } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        setShowLoginForm(true);
        setShowRegisterForm(false);
    }

    const handleRegisterButtonClick = () => {
        setShowLoginForm(false);
        setShowRegisterForm(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home');
    }

    return (
        <div className="wrapperLogin">
            <div className="wrapperr">
                <div className="form-box loginn">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-boxx">
                            <span className="icon"><IoIosPerson /></span>
                            <input type="text" required />
                            <label>Name</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdMail /></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdLock /></span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgott">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btnn1">Login</button>
                        <div className="login-registerr">
                            <p>Don't have an account?
                                <button type="button" className="register-linkk" onClick={handleRegisterButtonClick}>Register</button>
                            </p>
                        </div>
                    </form>
                </div>
                {showRegisterForm && (
                    <div className="form-box registerr">
                        <h2>Registration</h2>
                        <form onSubmit={handleSubmit}>
                        <div className="input-boxx">
                            <span className="icon"><IoIosPerson /></span>
                            <input type="text" required />
                            <label>Name</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdMail /></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdLock /></span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgott">
                            <label><input type="checkbox" />I agree with the terms & conditions</label>
                        </div>
                        <button type="submit" className="btnn1">Register</button>
                        <div className="login-registerr">
                            <p>Already have an account?
                                <button type="button" className="register-linkk" onClick={handleLoginButtonClick}>Login</button>
                            </p>
                        </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
