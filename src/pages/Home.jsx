import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import Skills from './Skills';
import DepManager from './DepManager';
import axios from 'axios';

const Home = () => {

    const [showProfileForm, setShowProfileForm] = useState(false);

    const handleProfileButtonClick = () => {
        setShowProfileForm(!showProfileForm);
    }


    const handleCloseButtonClick = () => {
        setShowProfileForm(false);
    }

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/users/getskills', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


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
                                Status: {userData.user.role}
                                </div>
                                <div className="input-bx">
                                Skills: {userData.skills.length > 0 ? userData.skills.map(skill => skill.skill_name).join(', ') : 'No skills'}
                                </div>
                                <div className="input-bx">
                                Department: {userData.department_name ? userData.department_name : 'No departments'}
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
                <h2>Have a look around!</h2>
                <h3>And you will be surprised what you cand find out</h3>
            </div>

        </div>
    );
}

export default Home;
