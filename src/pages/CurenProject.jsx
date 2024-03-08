import React, { useState, useEffect } from 'react';
import AddProject from '../add/addProject';
import { Box, Typography, Button } from "@mui/material";
import mockData from '../data/mockData';
import './curentproject.css';

const CurentProject = () => {
    const [open, setOpen] = useState(false);
    const [newProjects, setNewProjects] = useState([]);
    const [originalIndexOrder, setOriginalIndexOrder] = useState([]);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [includePartiallyAvailable, setIncludePartiallyAvailable] = useState(false);
    const [includeCloseToFinish, setIncludeCloseToFinish] = useState(false);
    const [closeToFinishWeeks, setCloseToFinishWeeks] = useState(4);
    const [includeUnavailable, setIncludeUnavailable] = useState(false);
    const [showFilterOptions, setShowFilterOptions] = useState(false); 

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects) {
            setNewProjects(storedProjects);
            setOriginalIndexOrder(Array.from({ length: storedProjects.length }, (_, index) => index));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(newProjects));
    }, [newProjects]);

    const handleOpen = () => {
        setOpen(true); 
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddProject = (projectData) => {
        console.log("New project added:", projectData);
        setNewProjects([...newProjects, projectData]);
        setOriginalIndexOrder([...originalIndexOrder, originalIndexOrder.length]);
        setOpen(false); 
    };

    const handleStatusChange = (e, originalIndex) => {
        const { value } = e.target;
        const currentIndex = originalIndexOrder[originalIndex];
        const updatedProjects = [...newProjects];
        updatedProjects[currentIndex].projectStatus = value;
        setNewProjects(updatedProjects);
    };

    const handleSearchButtonClick = () => {
        setShowSearchBox(true); 
    };

    const handleCloseSearchBox = () => {
        setShowSearchBox(false);
        setSearchResults([]); 
        setSearchQuery(''); 
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        const filteredEmployees = mockData.filter(employee =>
            employee.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(filteredEmployees);
    };

    const filterEmployees = (employee) => {
        if (includePartiallyAvailable && employee.projects.reduce((total, project) => total + project.hours, 0) < 8) {
            return true;
        }

        if (includeCloseToFinish) {
            const today = new Date();
            const maxFinishDate = new Date(today.getTime() + closeToFinishWeeks * 7 * 24 * 60 * 60 * 1000);
            return employee.projects.some(project => new Date(project.deadlineDate) <= maxFinishDate);
        }

        if (includeUnavailable && employee.projects.reduce((total, project) => total + project.hours, 0) >= 8) {
            return true;
        }

        if (!includePartiallyAvailable && !includeCloseToFinish && !includeUnavailable) {
            return employee.projects.length === 0;
        }

        return false;
    };

    return (
        <div className="pages">
            <div className="projects">
                <div className="info">
                    <h1>Projects</h1>
                    <Button variant="contained" onClick={() => setOpen(true)}>Add New Project</Button> 
                    <Button variant="contained" onClick={handleSearchButtonClick}>Search</Button> 
                </div>
                <div className="new-projects">
                    {originalIndexOrder.slice().reverse().map((originalIndex) => { 
                        const project = newProjects[originalIndex];
                        const currentIndex = originalIndexOrder[originalIndex];
                        return (
                            <div key={currentIndex} className="Project-1">
                                <a href="/projectpage">{project.projectName}</a>
                                <p>Deadline Date: {project.deadlineDate}</p>
                                <label htmlFor={`status-${currentIndex}`}>Project Status:</label>
                                <select
                                    id={`status-${currentIndex}`}
                                    value={project.projectStatus}
                                    onChange={(e) => handleStatusChange(e, originalIndex)}
                                    className="status-select"
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="Starting">Starting</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Closing">Closing</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        );
                    })}
                </div>
            </div>
            {open && <AddProject setOpen={setOpen} slug="projects" handleAddProject={handleAddProject} />}
            {showSearchBox && (
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <div className="close-buttons">
                        <Button variant="contained" onClick={handleCloseSearchBox}>Close</Button> 
                    </div>
                    <div className="employees-box">
                        <div className="employees-header">
                            <span className="header-item">Name</span>
                            <span className="header-item">Skills</span>
                            <span className="header-item">Department</span>
                            <span className="header-item">Projects</span>
                            <span className="header-item">Hours</span>
                        </div>
                        <div className="dropdown">
                        <Button variant="contained" onClick={() => setShowFilterOptions(prevState => !prevState)}>Filter Options</Button>
                        {showFilterOptions && (
                        <div className="dropdown-content">
                        <label>
                        Partially-available employees
                        <input
                            type="checkbox"
                            checked={includePartiallyAvailable}
                            onChange={() => setIncludePartiallyAvailable(!includePartiallyAvailable)}
                        />
                        </label>
                        <label>
                              Close to finish projects(within 
                                <input
                                    type="number"
                                    min="2"
                                    max="6"
                                    value={closeToFinishWeeks}
                                    onChange={(e) => setCloseToFinishWeeks(Math.max(2, Math.min(6, e.target.value)))}
                                    />
                                 weeks)
                        <input
                            type="checkbox"
                            checked={includeCloseToFinish}
                            onChange={() => setIncludeCloseToFinish(!includeCloseToFinish)}
                        />
                        </label>
                        <label>
                            Unavailable employees
                            <input
                                type="checkbox"
                                checked={includeUnavailable}
                                onChange={() => setIncludeUnavailable(!includeUnavailable)}
                            />
                        </label>
                    </div>
                        )}
                    </div>

                        {searchResults.map((employee, index) => (
                            filterEmployees(employee) && (
                                <div key={index} className="employee-row">
                                    <span className="employee-info">{employee.name}</span>
                                    <span className="employee-info">{employee.skills.join(', ')}</span>
                                    <span className="employee-info">{employee.department}</span>
                                    <span className="employee-info">{employee.projects.map(project => project.name).join(', ')}</span>
                                    <span className="employee-info-hours">{employee.projects.reduce((total, project) => total + project.hours, 0)}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurentProject;
