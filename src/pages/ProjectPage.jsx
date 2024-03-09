import React, { useState, useEffect } from 'react';
import './projectpage.css';
import mockData from '../data/mockData';
import { FaTrash } from 'react-icons/fa';
import { Button } from "@mui/material";

const ProjectPage = () => {
    const [descriptionText, setDescriptionText] = useState(() => {
        const savedText = localStorage.getItem('descriptionText');
        return savedText ? savedText : "";
    });

    const [detailsText, setDetailsText] = useState(() => {
        const savedText = localStorage.getItem('detailsText');
        return savedText ? savedText : "";
    });

    const [technologyText, setTechnologyText] = useState(() => {
        const savedText = localStorage.getItem('technologyText');
        return savedText ? savedText : "";
    });

    const handleDescriptionTextChange = (event) => {
        setDescriptionText(event.target.value);
    };

    const handleDetailsTextChange = (event) => {
        setDetailsText(event.target.value);
    };

    const handleTechnologyTextChange = (event) => {
        setTechnologyText(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem('descriptionText', descriptionText);
    }, [descriptionText]);

    useEffect(() => {
        localStorage.setItem('detailsText', detailsText);
    }, [detailsText]);

    useEffect(() => {
        localStorage.setItem('technologyText', technologyText);
    }, [technologyText]);

    const [activeMembers, setActiveMembers] = useState([]);
    const [proposedMembers, setProposedMembers] = useState([]);
    const [pastMembers, setPastMembers] = useState([]);
    const [comments, setComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Retinem angajatul selectat pentru dealocare

    useEffect(() => {
        const active = mockData.filter(employee => employee.projects.length > 0);
        const proposed = mockData.filter(employee => employee.projects.length === 0);

        setActiveMembers(active);
        setProposedMembers(proposed);
    }, []);

    const [openProposeDialog, setOpenProposeDialog] = useState(false);

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
            // Adaugam comentariile pentru angajatul selectat
            selectedEmployee.comments = comments;
            // Mutam angajatul in coloana Past Members
            handleMoveToPastMembers(selectedEmployee);
            // Reseteaza starea de comentarii
            setComments('');
            // Inchide dialogul de dealocare
            setOpenProposeDialog(false);
        }
    };

    return (
        <div className="pag">
            <div className="description-box">
                <textarea 
                    value={descriptionText} 
                    onChange={handleDescriptionTextChange}
                    placeholder={descriptionText ? "" : "Click here to start typing..."}
                ></textarea>
            </div>
            <div className="details">
                <textarea 
                    value={detailsText} 
                    onChange={handleDetailsTextChange}
                    placeholder={detailsText ? "" : "Click here to start typing..."}
                ></textarea>
            </div>
            <div className="technology">
                <textarea 
                    value={technologyText} 
                    onChange={handleTechnologyTextChange}
                    placeholder={technologyText ? "" : "Click here to start typing..."}
                ></textarea>
            </div>
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
        </div>
    );
};

export default ProjectPage;
