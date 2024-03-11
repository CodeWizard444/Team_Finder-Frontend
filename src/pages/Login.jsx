import React, { useState } from 'react';
import { MdMail, MdLock } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
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

    const { token } = useAuth();

    console.log(token);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());

        try {
            const loginResponse = await fetch('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/login', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({name: formDataObj.name, email: formDataObj.email, password: formDataObj.password }),
            });

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                if (loginData.success) {
                    console.log(loginData);
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
            const signupResponse = await fetch('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/employee/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({name: formDataObj.name, email: formDataObj.email, password: formDataObj.password }),
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
        <div className="wrapperLogin">
            <div className="wrapperr">
                <div className="form-box loginn">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-boxx">
                            <span className="icon"><IoIosPerson /></span>
                            <input type="text" name="name" required />
                            <label>Name</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdMail /></span>
                            <input type="email"name="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdLock /></span>
                            <input type="password" name="password" required />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgott">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btnn1">Login</button>
                        <div className="login-registerr">
                            <p>Don't have an account?
                                <a href="#" className="register-linkk" onClick={handleRegisterButtonClick}>Register</a>
                            </p>
                        </div>
                    </form>
                </div>
                </div>
                
                {showRegisterForm && (
                    <div className="wrapperr">
                    <div className="form-box registerr">
                        <h2>Registration</h2>
                        <form onSubmit={handleSubmit}>
                        <div className="input-boxx">
                            <span className="icon"><IoIosPerson /></span>
                            <input type="text" name="name" required />
                            <label>Name</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdMail /></span>
                            <input type="email" name="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-boxx">
                            <span className="icon"><MdLock /></span>
                            <input type="password" name="password" required />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgott">
                            <label><input type="checkbox" />I agree with the terms & conditions</label>
                        </div>
                        <button type="submit" className="btnn1">Register</button>
                        <div className="login-registerr">
                            <p>Already have an account?
                                <a href="#" className="register-linkk" onClick={handleLoginButtonClick}>Login</a>
                            </p>
                        </div>
                        </form>
                    </div>
                    </div>
                )}
            </div>
        
    );
}

export default Login;
