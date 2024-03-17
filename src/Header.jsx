import React, { useState } from 'react';
import { MdMail, MdLock } from 'react-icons/md';
import { IoIosPerson, IoIosBriefcase } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from './api/auth'; 
import { useDispatch } from 'react-redux';
import { authenticateUser } from './redux/slices/authSlice'; 


const Header = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [wrapperHeight, setWrapperHeight] = useState(450);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState(null);
    const [registerError, setRegisterError] = useState(null);
 
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
            const signupResponse = await register({
                name: formDataObj.name,
                email: formDataObj.email,
                password: formDataObj.password,
                organization_name: formDataObj.organization_name,
                hq_adress: formDataObj.hq_adress,
            });

            if (signupResponse.status === 201) {
                dispatch(authenticateUser());
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('token', signupResponse.data.token);
                navigate('/home');
            } else {
                console.log(signupResponse)
                console.error('Registration failed:', signupResponse.data.error);
            }
        } catch (error) {
            console.error('Error in registration request:', error.message);
            setRegisterError('The email address already exists.');
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
        <div className="app__navbar">
            <div className="app__navbar-login">
                <button type="button" onClick={handleLoginButtonClick}>Login</button>
                {showLoginForm && (
                    <div className="wrappe">
                        <span className="icon-close" onClick={handleCloseButtonClick}>×</span>
                        <div className="form-box login">
                            <h2>Login</h2>
                            {loginError && <div className="error-message">{loginError}</div>}
                            <form onSubmit={handleLoginSubmit}>
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
                            {registerError && <div className="error-message">{registerError}</div>}
                            <form onSubmit={handleRegisterSubmit}>
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
                                <button type="submit" className="btn">Register</button>
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
        </div>
    )
}

export default Header;
