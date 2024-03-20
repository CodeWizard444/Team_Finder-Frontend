import React, { useState, useEffect } from 'react';
import './depprojects.css';
import axios from 'axios';

const DepProjects = () => {
    const [departmentProjects, setDepartmentProjects] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        const fetchDepartmentProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/department/projects', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDepartmentProjects(response.data.departmentProjects);
            } catch (error) {
                console.error('Error fetching department projects:', error);
            }
        };

        fetchDepartmentProjects();
    }, []);

    const filterProjectsByStatus = (status) => {
        setFilterStatus(status);
    };

    return (
        <div className="dep-projects-page">
            <div className="filter-dropdown">
                <select onChange={(e) => filterProjectsByStatus(e.target.value)}>
                    <option value="">Toate</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Starting">Starting</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closing">Closing</option>
                </select>
            </div>

            {departmentProjects.map((project, projectIndex) => (
                (project.status === filterStatus || filterStatus === "") && project.status !== "Closed" && (
                    <div className="dep-project" key={projectIndex}>
                        <a href="/projectview" >{`Project Name: ${project.project_name}`} </a>
                        <p>{`Deadline Date: ${new Date(project.deadline_date).toLocaleDateString() || "N/A"}`}</p>
                        <p>{`Project Status: ${project.status}`}</p>
                        <p>{`Team Members: ${project.members}`}</p>
                    </div>
                )
            ))}
        </div>
    );
}

export default DepProjects;
