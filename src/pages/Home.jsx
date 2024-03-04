import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './home.css';

const Home = () => {

    const [showProfileForm, setShowProfileForm] = useState(false);

    const handleProfileButtonClick = () => {
        setShowProfileForm(!showProfileForm);
    }


    const handleCloseButtonClick = () => {
        setShowProfileForm(false);
    }


    return (

        <div className="container">
            
            <div className="login-container">
                <Link to="/login" className="login-link">Employee login</Link>
            </div>
            <div className="circles circle-1">
            <button type="button" onClick={handleProfileButtonClick}>Profile</button>
                {showProfileForm && (
                    <div className="profile">
                        <span className="icn-close" onClick={handleCloseButtonClick}>×</span>
                        <div className="frm-box profile">
                            <h2>Profile</h2>
                            <form >
                                <div className="input-bx">
                                    Status: user
                                </div>
                                <div className="input-bx">
                                    Skills: React.js,Kanban & Azure
                                </div>
                                <div className="input-bx">
                                    Department: Departament 1
                                </div>
                                
                            </form>
                        </div>
                    </div>
                )}
            
            </div>
            <div className="circles circle-2">
                <a href="/departments" className="departments-view">Departments</a>
            </div>
            <div className="circles circle-3">
                <a href="/skills" className="skill-view">Skills</a>
            </div>
            <div className="look">
                <h2>Have a l<span class="circle-4"></span><span class="circle-5"></span>k ar<span class="circle-6"></span>und!</h2>
                <h3>And you will be surprised what you cand find out</h3>
            </div>
            
        </div>
    );
}

export default Home;
