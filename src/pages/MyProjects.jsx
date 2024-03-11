import React from 'react';
import './myprojects.css';
import mockData from '../data/mockData';

const MyProjects = () => {
    const currentProjects = mockData.filter(project => project.projects.some(p => p.status !== "closed"));
    const pastProjects = mockData.filter(project => project.projects.every(p => p.status === "closed"));

    return (
        <div className="my-projects">
            <div className="project-sections">
                <section className="current-projects">
                    <h2>Current Projects</h2>
                    <div className="projects-container">
                        {currentProjects.map(project => (
                            project.projects.filter(p => p.status !== "closed").map(p => (
                                <div key={p.name} className="project">
                                    <h3>{p.name}</h3>
                                    <p>Roles: {p.roles}</p>
                                    <p>Technology stack: {project.skills.join(", ")}</p>
                                </div>
                            ))
                        ))}
                    </div>
                </section>

                <section className="past-projects">
                    <h2>Past Projects</h2>
                    <div className="projects-container">
                        {pastProjects.map(project => (
                            project.projects.filter(p => p.status === "closed").map(p => (
                                <div key={p.name} className="project">
                                    <h3>{p.name}</h3>
                                    <p>Roles: {p.roles}</p>
                                    <p>Technology stack: {project.skills.join(", ")}</p>
                                </div>
                            ))
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MyProjects;
