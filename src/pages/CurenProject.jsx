import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import AddProject from '../add/addProject';
import { Box, Typography, Button } from "@mui/material";

import './curentproject.css';

const CurentProject = () => {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [newProjects, setNewProjects] = useState([]);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects) {
            setNewProjects(storedProjects);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(newProjects));
    }, [newProjects]);

    const toggleSearchBar = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
    };

    const handleOpen = () => {
        setOpen(true); 
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddProject = (projectData) => {
        console.log("New project added:", projectData);
        setNewProjects([...newProjects, projectData]);
        setOpen(false); 
    };

    return (
        <div className="page">
            <div className="search" onClick={toggleSearchBar}>
                <span><MdSearch className="search-icon" /></span>
            </div>
            <form action="" className={`search-bar-container ${isSearchBarVisible ? 'active' : ''}`}>
                <input type="search" id="search-bar" placeholder="search here" />
                <label htmlFor="search-bar"><MdSearch /></label>
            </form>
            <div className="projects">
                <div className="info">
                    <h1>Projects</h1>
                    <Button variant="contained" onClick={handleOpen}>Add New Project</Button> 
                </div>
                <div className="new-projects">
                    {newProjects.slice().reverse().map((project, index) => ( 
                    <div key={index} className="Project-1">
                        <div className="lid one"></div>
                        <div className="lid two"></div>
                        <div className="envelope"></div>
                        <div className="letter">
                            <a href="/projectpage">{project.projectName}</a>
                            <p>Deadline Date: {project.deadlineDate}</p>
                            <p>Project Status: {project.projectStatus}</p>
                        </div>
                        </div>
                        ))}
                    </div>
            </div>
            {open && <AddProject setOpen={setOpen} slug="projects" handleAddProject={handleAddProject} />}
        </div>
    );
};

export default CurentProject;


