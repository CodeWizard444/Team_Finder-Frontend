import React, { useState } from 'react';
import { MdMail, MdLock } from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { employeeRegister, login } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';



const Login = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginButtonClick = () => {
        setShowLoginForm(true);
        setShowRegisterForm(false);
    }

    const handleRegisterButtonClick = () => {
        setShowLoginForm(false);
        setShowRegisterForm(true);
    }

    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());

        try {
            const loginResponse = await login({ email: formDataObj.email, password: formDataObj.password });

            if (loginResponse.status === 200) {
                dispatch(authenticateUser());
                localStorage.setItem('isAuth', 'true'); // Salvăm starea de autentificare în localStorage   
                localStorage.removeItem('token');
                localStorage.setItem('token', loginResponse.data.token);
                
                
                navigate('/home');
            } else {
                console.error('Login failed:', loginResponse.data.error);
            }
        } catch (error) {
            console.error('Error in login request:', error.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
    
        try {
            const token = localStorage.getItem('token'); // Extrage token-ul din localStorage
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` // Adaugă token-ul în header-ul 'Authorization'
                }
            };
    
            const signupResponse = await employeeRegister({ // Mutăm definiția variabilei config aici
                name: formDataObj.name,
                email: formDataObj.email,
                password: formDataObj.password,
                organization_name: formDataObj.organization_name,
                hq_adress: formDataObj.hq_adress,
            }, config); // Transmitem config ca al doilea argument către employeeRegister
    
            if (signupResponse.status === 201) {
                dispatch(authenticateUser());
                localStorage.setItem('isAuth', 'true');
                localStorage.removeItem('token');
                localStorage.setItem('token', signupResponse.data.token);
                navigate('/home');
            } else {
                console.log(signupResponse)
                console.error('Registration failed:', signupResponse.data.error);
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
                    <form onSubmit={handleLoginSubmit}>
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
                        <form onSubmit={handleRegisterSubmit}>
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
