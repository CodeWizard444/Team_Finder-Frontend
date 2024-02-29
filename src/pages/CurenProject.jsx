import React from 'react'
import userImg from '../assets/user.jpg';
import './curentproject.css';
import { Link } from 'react-router-dom';
const CurentProject =() =>{
    return (
        <div className="page">
            
            
            <div className="sidebarr">
                <div className="sidebar-headerr">
                    <span className="sidebar-titlee">Sidebar</span>
                </div>
                <hr />
                <nav>
                    <ul className="nav-menuu">
                        <li>
                            <a href="/home" className="nav-link-active">
                                Dasboard
                            </a>
                        </li>
                        <li>
                            <Link to="/curentproject" className="nav-linkk">
                                Curent Projects
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="nav-linkk">
                                New Projects
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-linkk">
                                Employee Skill
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-linkk">
                                Admin
                            </a>
                        </li>
                    </ul>
                </nav>
                <hr />
                <div className="dropdownn">
                    <button className="dropdown-togglee" type="buttonn">
                        <img src={userImg} alt="User" width="32" height="32" className="user-avatarr" />
                        <strong>user</strong>
                    </button>
                    <div className="dropdown-menuu">
                        <a className="dropdown-itemm" href="#">New project...</a>
                        <a className="dropdown-itemm" href="#">Status</a>
                    </div>
                </div>
            </div>

           
            
        </div>
    )
}

export default CurentProject;