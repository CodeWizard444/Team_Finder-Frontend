import React, { useState, useEffect } from 'react';
import AddProject from '../add/addProject';
import {Button } from "@mui/material";
import './curentproject.css';


const CurentProject = () => {
    const [open, setOpen] = useState(false);
    const [newProjects, setNewProjects] = useState([]);
    const [originalIndexOrder, setOriginalIndexOrder] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All');

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


    const filterProjectsByStatus = (project) => {
        if (selectedStatus === 'All') {
            return true; 
        } else {
            return project.projectStatus === selectedStatus;
        }
    };
    return (
        <div className="pages">
            <div className="projects">
                <div className="info">
                    
                    <Button variant="contained" onClick={() => setOpen(true)}>Add New Project</Button> 
                </div>
                <div className="new-projects">
                    {originalIndexOrder.slice().reverse().map((originalIndex) => { 
                        const project = newProjects[originalIndex];
                        const currentIndex = originalIndexOrder[originalIndex];
                        if (!filterProjectsByStatus(project)) {
                            return null; 
                          }
                        return (
                            <div key={currentIndex} className="Project-1">
                                <a href="/projectpage" >{project.projectName}</a>
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
            
                    {/*{showFilterOptions && (
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="status-filter"
                        >
                            <option value="All">All</option>
                            <option value="Not Started">Not Started</option>
                            <option value="Starting">Starting</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closing">Closing</option>
                            <option value="Closed">Closed</option>
                        </select>
                    )}*/}
            
        </div>
    );
};

export default CurentProject;
