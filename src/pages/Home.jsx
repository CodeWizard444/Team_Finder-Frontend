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
                            <a href="home.html" className="nav-link active">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="dashboard.html" className="nav-link">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Current Projects
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Available Teams
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                New Project
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Create Teams
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Employee Skill
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
            <div className="circle-1">
                <a href="/about" className="profile-view">Profile</a>
            </div>
            <div className="circle-2">
                <a href="/about" className="departments-view">Departments</a>
            </div>
            <div className="circle-3">
                <a href="/about" className="leaderboards-view">Leaderboards</a>
            </div>
        </div>
    );
}

export default Home;
