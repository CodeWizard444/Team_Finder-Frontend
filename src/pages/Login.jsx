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
    const [loginError, setLoginError] = useState(null);
    const [registerError, setRegisterError] = useState(null);

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
        setLoginError(null);

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());

        try {
            const loginResponse = await login({ email: formDataObj.email, password: formDataObj.password });

            if (loginResponse.status === 200) {
                dispatch(authenticateUser());
                localStorage.setItem('isAuth', 'true');    
                localStorage.removeItem('token');
                localStorage.setItem('token', loginResponse.data.token);
                
                
                navigate('/home');
            } else {
                console.error('Login failed:', loginResponse.data.error);
            }
        } catch (error) {
            console.error('Error in login request:', error.message);
            setLoginError('An error occurred during login. Please try again.');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterError(null);
    
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
    
        try {
            const token = localStorage.getItem('token'); 
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            };
    
            const signupResponse = await employeeRegister({ 
                name: formDataObj.name,
                email: formDataObj.email,
                password: formDataObj.password,
                organization_name: formDataObj.organization_name,
                hq_adress: formDataObj.hq_adress,
            }, config); 
    
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
            setRegisterError('An error occurred during registration. Please try again.');
        }
    };
    
    const removeAutocompleteStyle = () => {
        const autofillFields = document.querySelectorAll('input:-webkit-autofill');
        autofillFields.forEach(field => {
            
            field.style.backgroundColor = 'transparent';
        });
    };
    

    window.addEventListener('load', removeAutocompleteStyle);

    return (
        <div className="wrapperLogin">
            <div className="wrapperr">
                <div className="form-box loginn">
                    <h2>Login</h2>
                    {loginError && <div className="errors-message">{loginError}</div>}
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
                        {registerError && <div className="errors-message">{registerError}</div>}
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
