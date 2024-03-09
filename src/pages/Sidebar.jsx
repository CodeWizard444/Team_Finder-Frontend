import React, { useState } from 'react';
import userImg from '../assets/user.jpg';
import './sidebar.css';
import { Dropdown } from 'react-bootstrap';

const Sidebar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <main className="d-flex flex-nowrap ">
            <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
                <a href="/home" className="sidebar-header d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="sidebar-icon pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="sidebar-title fs-4">Sidebar</span>
                </a>
                <hr />
                <ul className="nav-menu nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/home" className="nav-link active" aria-current="page">
                            <svg className="nav-icon pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/curentproject" className="nav-link text-white">
                            <svg className="nav-icon pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="/employeeskills" className="nav-link text-white">
                            <svg className="nav-icon pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
                            Employee Skill
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            <svg className="nav-icon pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                            Admin
                        </a>
                    </li>
                </ul>
                <hr />
                <Dropdown show={showDropdown} onSelect={() => setShowDropdown(false)}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" onClick={handleDropdownToggle}>
                        <img src={userImg} alt="User" width="32" height="32" className="rounded-circle me-2" />
                        <strong>user</strong>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/about">New project...</Dropdown.Item>
                        <Dropdown.Item href="#">Profile</Dropdown.Item>
                        <Dropdown.Divider />
                    </Dropdown.Menu>
                </Dropdown>
                <div className="b-example-divider b-example-vr"></div>
            </div>
        </main>
    );
};

export default Sidebar;
