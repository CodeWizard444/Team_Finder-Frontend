import React from 'react';
import userImg from '../assets/user.jpg';
import './home.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className="container">
            
            
            <div className="sidebar">
                <div className="sidebar-header">
                    <span className="sidebar-title">Sidebar</span>
                </div>
                <hr />
                <nav>
                    <ul className="nav-menu">
                        <li>
                            <a href="/home" className="nav-link active">
                                Dasboard
                            </a>
                        </li>
                        <li>
                            <Link to="/curentproject" className="nav-link">
                                Curent Projects
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                New Projects
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Employee Skill
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Admin
                            </a>
                        </li>
                    </ul>
                </nav>
                <hr />
                <div className="dropdown">
                    <button className="dropdown-toggle" type="button">
                        <img src={userImg} alt="User" width="32" height="32" className="user-avatar" />
                        <strong>user</strong>
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">New project...</a>
                        <a className="dropdown-item" href="#">Status</a>
                    </div>
                </div>
            </div>

            <div className="login-container">
                <Link to="/login" className="login-link">Employee login</Link>
            </div>
            <div className="circles circle-1">
                <a href="/about" className="profile-view">Profile</a>
            </div>
            <div className="circles circle-2">
                <a href="/about" className="departments-view">Departments</a>
            </div>
            <div className="circles circle-3">
                <a href="/about" className="leaderboards-view">Leaderboards</a>
            </div>
            <div className="look">
                <h2>Have a l<span class="circle-4"></span><span class="circle-5"></span>k ar<span class="circle-6"></span>und!</h2>
                <h3>And you will be surprised what you cand find out</h3>
            </div>
            
        </div>
    );
}

export default Home;
