import React, { useState, useEffect } from 'react';
import './projectpage.css';

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
                <div className="box">
                    <input type="text" />
                    <label>Project Manager</label>
                </div>
                <div className="box">
                    <input type="text" />
                    <label>Employee 1</label>
                </div>
                <div className="box">
                    <input type="text" />
                    <label>Employee 2</label>
                </div>
                <div className="box">
                    <input type="text" />
                    <label>Employee 3</label>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
