import React, { useState, useEffect } from 'react';
import './projectpage.css';
import mockData from '../data/mockData';
import { FaTrash } from 'react-icons/fa';
import { Button } from "@mui/material";
import { FaPlus } from 'react-icons/fa';
import projectData from '../data/projectData';
import skillData from '../data/skillData';
import axios from 'axios';

const ProjectPage = () => {
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [includePartiallyAvailable, setIncludePartiallyAvailable] = useState(false);
    const [includeCloseToFinish, setIncludeCloseToFinish] = useState(false);
    const [closeToFinishWeeks, setCloseToFinishWeeks] = useState(4);
    const [includeUnavailable, setIncludeUnavailable] = useState(false);
    const [showFilterOptions, setShowFilterOptions] = useState(false); 
    const [workHours, setWorkHours] = useState('');
    const [roles, setRoles] = useState('');
    const [comment, setComment] = useState('');
    const [activeMembers, setActiveMembers] = useState([]);
    const [proposedMembers, setProposedMembers] = useState([]);
    const [pastMembers, setPastMembers] = useState([]);
    const [comments, setComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    const [openProposeDialog, setOpenProposeDialog] = useState(false);
    const [openPropDialog, setOpenPropDialog] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [projectSkills, setProjectSkills] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    useEffect(() => {
        const active = mockData.filter(employee => employee.projects.length > 0);

        setActiveMembers(active);
    }, []);

    useEffect(() => {
        const fetchProjectDetails = async () => {

            const token = localStorage.getItem('token');
            const ProjectName = localStorage.getItem('currentproject');
            try {
                const response = await axios.get(`https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/projectDetails/${ProjectName}`,{
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }); // Înlocuiți 'ProjectNameHere' cu numele proiectului dorit
                setProjectDetails(response.data.projectDetails);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, []);

    console.log(projectDetails)

    const handleMoveToPastMembers = (employee) => {
        setActiveMembers(activeMembers.filter(emp => emp !== employee));
        setPastMembers([...pastMembers, employee]);
    };

    const handleDeallocation = (employee) => {
        setSelectedEmployee(employee);
        setOpenProposeDialog(true);
    };

    const handleSubmit = () => {
        if (selectedEmployee) {
            selectedEmployee.comments = comments;
            handleMoveToPastMembers(selectedEmployee);
            setComments('');
            setOpenProposeDialog(false);
        }
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

    const handleProposeForProject = (employee) => {
        setSelectedEmployee(employee);
    setOpenPropDialog(true);
    };
    
    const handleSubmitt = () => {
        console.log("Work Hours:", workHours);
        console.log("Roles:", roles);
        console.log("Comments:", comment);
        
        setWorkHours('');
        setRoles('');
        setComment('');
        
        if (selectedEmployee) { 
            setProposedMembers(prevProposedMembers => [...prevProposedMembers, selectedEmployee]);
        }
        
        setOpenPropDialog(false);
    };
    const handleSkillSubmit = (skill) => {
        if (selectedLevel) {
            const skillWithLevel = { skill: skill.skill, level: selectedLevel };
            setProjectSkills(prevSkills => [...prevSkills, skillWithLevel]);
            console.log("Skill selected:", skillWithLevel);
        }
        setSelectedSkill(skill.skill);
    };
    

    
    return (
        <div className="pag">
            <Button className="src-btnnn" variant="contained" onClick={handleSearchButtonClick}>Search</Button> 
            <Button className="ai-btnn" variant="contained">AI Generate Team </Button>
            <div className="technology">
            {projectDetails && (
                <div className="project-details">
                    <h2>{projectDetails.project_name}</h2>
                    <p><strong>Project Period:</strong> {projectDetails.project_period}</p>
                    <p><strong>Start Date:</strong> {new Date(projectDetails.deadline_date).toLocaleDateString()}</p>
                    <p><strong>Deadline Date:</strong> {new Date(projectDetails.deadline_date).toLocaleDateString()}</p>
                    <p><strong>Project Status:</strong> {projectDetails.project_status}</p>
                    <p><strong>General Description:</strong> {projectDetails.general_description}</p>
                    <p><strong>Technology Stack:</strong> {projectDetails.technology_stack}</p>
                    <div>
                        <p><strong>Team Members:</strong></p>
                        <ul>
                            {projectDetails.team_members.map((member, index) => (
                                <li key={index}>
                                    {member.username} - {member.roles} 
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p><strong>Past Members:</strong> {projectDetails.past_members.join(', ')}</p>
                        <p><strong>Proposed Members:</strong> {projectDetails.proposed_members.join(', ')}</p>
                    </div>
                </div>
            )}
            </div>
            <h2 className="skill-asgn">Skill assignment</h2>
            <div className="skill-assign">
                <div className="skilll-header">
                    <span className="fnc-itemm">Skill Name</span>
                    <span className="fnc-itemm">Skill Level</span>
                    <span className="fnc-itemm">Action</span>
                </div>
                {skillData.map((skill, index) => (
                <div key={index} className="skill-row">
                    <span>{skill.skill}</span>
                    <span>
                        <select onChange={(e) => setSelectedLevel(e.target.value)}>
                            <option value="">Select Level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </span>
                <span>
                <button className="add-btnn-skill" onClick={() => handleSkillSubmit(skill)}><FaPlus /></button>
                </span>
             </div>
            ))}
        </div>


            <h2 className="prj-skill">Required Skills for the Project</h2>
            <div className="project-skill">
            <div className="project-skill-header">
                    <span className="fncc-itemm">Skill Name</span>
                    <span className="fncc-itemm">Skill Level</span>
                </div>
                {projectSkills.map((skill, index) => (
                    <div key={index} className="project-skill-row">
                        <span className="skill-info">{skill.skill}</span>
                        <span className="skill-info">{skill.level}</span>
                    </div>
                ))}
            </div>
            <div className="team-members">
            {projectDetails && projectDetails.proposed_members && (
                <div className="members-column">
                    <h2 className="header">Proposed Members</h2>
                    <hr className="divider"/>
                    <ul>
                    {projectDetails.proposed_members.map((member, index) => (
                <li key={index}>{member}</li>
            ))}
                    </ul>
                </div>
            )}

{projectDetails && projectDetails.team_members && (
                <div className="members-column">
                    
                    <h2 className="header">Active Members</h2>
                    <hr className="divider"/>
                    <ul>
                    {projectDetails.team_members.map((member, index) => (
                 <li key={index}>
                    {member.username}
                    <button className="btnn-trs" onClick={() => handleDeallocation(member)}><FaTrash /></button>
                </li>
            ))}
        </ul>
                </div> )}

                {projectDetails && projectDetails.past_members && (
                <div className="members-column">
                    <h2 className="header">Past Members</h2>
                    <hr className="divider"/>
                    <ul>
                    {projectDetails.past_members.map((member, index) => (
                <li key={index}>{member}</li>
            ))}
                    </ul>
                </div>)}
            </div>

            {openProposeDialog && (
                <div className="proposal-dialogs">
                    <h2>Deallocation Reason</h2>
                    <div>
                        <label htmlFor="comments">Comments:</label>
                        <input type="text" id="comments" value={comments} onChange={(e) => setComments(e.target.value)} />
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            )}

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
                            <span className="header-item">Action</span>
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
                                        Close to finish projects (within 
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
                                    {employee.projects.reduce((total, project) => total + project.hours, 0) < 8 && ( 
                                        <button className="btnn-prop" variant="contained" onClick={() => handleProposeForProject(employee)}><FaPlus /></button> 
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {openPropDialog && (
                <div className="proposal-dialog">
                    <h2>Propose for Project</h2>
                    <div>
                        <label htmlFor="workHours">Work Hours:</label>
                        <input type="number" id="workHours" value={workHours} onChange={(e) => setWorkHours(Math.max(1, Math.min(8, e.target.value)))} min={1} max={8} />
                    </div>
                    <div>
                        <label htmlFor="roles">Roles:</label>
                        <input type="text" id="roles" value={roles} onChange={(e) => setRoles(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="comment">Comments:</label>
                        <input type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleSubmitt}>Submit</Button>
                    </div>
                </div>
             )}
        </div>
    );
};

export default ProjectPage;
