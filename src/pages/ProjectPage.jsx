import React, { useState, useEffect } from 'react';
import './projectpage.css';
import mockData from '../data/mockData';
import { FaTrash } from 'react-icons/fa';
import { Button } from "@mui/material";
import { FaPlus } from 'react-icons/fa';

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

    useEffect(() => {
        const active = mockData.filter(employee => employee.projects.length > 0);
        const proposed = mockData.filter(employee => employee.projects.length === 0);

        setActiveMembers(active);
        setProposedMembers(proposed);
    }, []);

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
        setOpenPropDialog(true);
    };

    const handleSubmitt = () => {
        console.log("Work Hours:", workHours);
        console.log("Roles:", roles);
        console.log("Comments:", comment);
    
        // Creăm o nouă instanță a obiectului selectedEmployee cu valorile actualizate
        const proposedEmployee = {
            ...selectedEmployee,
            comments: comment,
            workHours: workHours,
            roles: roles
        };
    
        // Adăugăm noul angajat propus la lista de angajați propuși
        setProposedMembers(prevProposedMembers => [...prevProposedMembers, proposedEmployee]);
    
        // Resetăm valorile pentru următoarea propunere
        setWorkHours('');
        setRoles('');
        setComment('');
    
        setOpenPropDialog(false);
    };
    
    return (
        <div className="pag">
            <Button className="src-btnnn" variant="contained" onClick={handleSearchButtonClick}>Search</Button> 
            <div className="technology"></div>
            <div className="team-members">
                <div className="members-column">
                    <h2 className="header">Proposed Members</h2>
                    <hr className="divider"/>
                    <ul>
                        {proposedMembers.map((employee, index) => (
                            <li key={index}>{employee.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="members-column">
                    <h2 className="header">Active Members</h2>
                    <hr className="divider"/>
                    <ul>
                        {activeMembers.map((employee, index) => (
                            <li key={index}>
                                {employee.name}
                                <button className="btnn-trs" onClick={() => handleDeallocation(employee)}><FaTrash /></button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="members-column">
                    <h2 className="header">Past Members</h2>
                    <hr className="divider"/>
                    <ul>
                        {pastMembers.map((employee, index) => (
                            <li key={index}>{employee.name}</li>
                        ))}
                    </ul>
                </div>
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
