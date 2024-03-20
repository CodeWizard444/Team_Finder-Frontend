import React, { useState, useEffect } from 'react';
import './projectview.css';
import mockData from '../data/mockData';
import projectData from '../data/projectData';

const ProjectView = () => {
    
    const [activeMembers, setActiveMembers] = useState([]);

    const [pastMembers, setPastMembers] = useState([]);


    useEffect(() => {
        const active = mockData.filter(employee => employee.projects.length > 0);

        setActiveMembers(active);
    }, []);


    
    return (
        <div className="dep-project-page">
            <h2 className="project-det">Project Details</h2>
            <div className="details">
            {projectData.map((project, index) => (
                    <div key={index}>
                        <h2>{project.project_name}</h2>
                        <p><strong>Project Period:</strong> {project.project_period}</p>
                        <p><strong>Start Date:</strong> {project.start_date}</p>
                        <p><strong>Deadline Date:</strong> {project.deadline_date}</p>
                        <p><strong>Project Status:</strong> {project.project_status}</p>
                        <p><strong>General Description:</strong> {project.general_description}</p>
                        <p><strong>Technology Stack:</strong> {project.technology_stack.join(', ')}</p>
                        <p><strong>Team Members:</strong></p>
                        <div>
                            <p><strong>Active Members:</strong> {project.team_members[0].active_members.join(', ')}</p>
                            <p><strong>Past Members:</strong> {project.team_members[0].past_members.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="project-mem">Team Members</h2>
            <div className="team-memberss">
                <div className="members-columns">
                    <h2 className="headers">Active Members</h2>
                    <hr className="dividers"/>
                    <ul>
                        {activeMembers.map((employee, index) => (
                            <li key={index}>
                                {employee.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="members-column">
                    <h2 className="headers">Past Members</h2>
                    <hr className="dividers"/>
                    <ul>
                    {projectData.map((project, index) => (
            project.team_members[0].past_members.map((member, memberIndex) => (
                        <li key={`${index}-${memberIndex}`}>{member}</li>
                    ))
                    ))}
                    </ul>
                </div>
            </div>

           
        </div>
    );
};

export default ProjectView;
