import React, { useState } from 'react';
import './depprojects.css';
import mockData from '../data/mockData';

const DepProjects = () => {
    const departmentEmployees = mockData.filter(employee =>
        employee.department === "Departament 1"
    );
    const [filterStatus, setFilterStatus] = useState("");

    const filterProjectsByStatus = (status) => {
        setFilterStatus(status);
    };

    return (
        <div className="dep-projects-page">
            <div className="filter-dropdown">
                <select onChange={(e) => filterProjectsByStatus(e.target.value)}>
                    <option value="">Toate</option>
                    <option value="not started">Not Started</option>
                    <option value="starting">Starting</option>
                    <option value="in progress">In Progress</option>
                    <option value="closing">Closing</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            {departmentEmployees.map((employee, employeeIndex) => (
                <div className="dep-wrap" key={employeeIndex}>
                    {employee.projects.map((project, projectIndex) => (
                        (project.status === filterStatus || filterStatus === "") && (
                            <div className="dep-project" key={`${employeeIndex}-${projectIndex}`}>
                                <a href="/projectpage" >{`Project Name: ${project.name}`} </a>
                                <p>{`Deadline Date: ${project.deadline_date || "N/A"}`}</p>
                                <p>{`Project Status: ${project.status}`}</p>
                                <p>{`Team Members: ${employee.name}`}</p>
                            </div>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}

export default DepProjects;
