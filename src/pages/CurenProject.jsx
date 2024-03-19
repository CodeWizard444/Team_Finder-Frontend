import React, { useState, useEffect } from 'react';
import AddProject from '../add/addProject';
import {Button } from "@mui/material";
import './curentproject.css';
import axios from 'axios';


const CurentProject = () => {
    const [open, setOpen] = useState(false);
    const [newProjects, setNewProjects] = useState([]);
    const [originalIndexOrder, setOriginalIndexOrder] = useState([]);

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


    const fetchProjects = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            'https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/projects/manager',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNewProjects(response.data.projects);
        } catch (error) {
          console.error('Error fetching projects:', error.response.data.error);
        }
      };

      useEffect(() => {
        fetchProjects();
      }, []);
      
      

    const handleAddProject = async (projectData) => {
        try {
            const projectPeriod = projectData.projectPeriod || "Ongoing";
            const deadlineDate = projectData.deadlineDate || null;
            const generalDescription = projectData.generalDescription || null;
            const technologyStack = projectData.technologyStack.length > 0 ? projectData.technologyStack : null;
            const teamRoles = Array.isArray(projectData.teamRoles) ? projectData.teamRoles : [];   

            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/projects/create',
                {
                    project_name: projectData.projectName,
                    project_period: projectPeriod,
                    start_date: projectData.startDate,
                    deadline_date: deadlineDate,
                    status: projectData.projectStatus,
                    general_description: generalDescription,
                    technology_stack: technologyStack,
                    team_roles: teamRoles
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Project created successfully:', response.data.project);
            const newProject = response.data.project;
        setNewProjects([newProject, ...newProjects]);
        await fetchProjects();


      
        setOriginalIndexOrder([...originalIndexOrder, originalIndexOrder.length]);

        console.log('Project created successfully:', newProject);
           
        } catch (error) {
            console.error('Error creating project:', error.response.data.error);
          
        }
    };

    const handleStatusChange = (e, originalIndex) => {
        const { value } = e.target;
        const currentIndex = originalIndexOrder[originalIndex];
        const updatedProjects = [...newProjects];
        updatedProjects[currentIndex].projectStatus = value;
        setNewProjects(updatedProjects);
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
                        return (
                            <div key={currentIndex} className="Project-1">
                                <a href="/projectpage" >{project?.project_name}</a>
                                <p>Deadline Date: {new Date(project?.deadline_date).toLocaleDateString()}</p>                               
                                <label htmlFor={`status-${currentIndex}`}>Project Status:</label>
                                <select
                                    id={`status-${currentIndex}`}
                                    value={project?.projectStatus}
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
            
        </div>
    );
};

export default CurentProject;
