import React, { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';
import SkillStorage from '../hooks/SkillStorage';
import './skill.css';


const Skills = () => {
    const [skill, setSkill] = SkillStorage('skill-storage.departments',[]);
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedSkill, setEditedSkill] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const addSkill = (skillName) => {
        setSkill(prevSkill => [
            ...prevSkill,
            {
                name: skillName,
                id: Date.now()
            }
        ]);
    };

    const deleteSkill = (id) => {
        setSkill(prevSkill => prevSkill.filter(dep => dep.id !== id));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addSkill(e.target.elements.skill.value);
        e.target.reset(); 
    };

    const enterEditMode = (skill) => {
        setEditedSkill(skill);
        setIsEditing(true);
        setPreviousFocusEl(document.activeElement);
    }

    const updateSkill = (updatedSkill) => {
        setSkill(prevSkill => prevSkill.map(dep => (
            dep.id === updatedSkill.id ? updatedSkill : dep
        )));
        closeEditMode();
    }

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocusEl.focus();
    }

    const SkillItem = ({ skilll }) => {
        return (
            <li className="skilll">
                <div className="skills">
                    {skilll.name}
                </div>
                <div className="skill-group">
                    <button
                        className='btnn-update'
                        aria-label={`Update ${skilll.name} Task`}
                        onClick={() => enterEditMode(skilll)}
                    >
                        <FaPencilAlt width={24} height={24} />
                    </button>

                    <button
                        className='btnn-delete'
                        aria-label={`Delete ${skilll.name} Task`}
                        onClick={() => deleteSkill(skilll.id)}
                    >
                        <FaTrash width={24} height={24} />

                    </button>
                </div>
            </li>
        );
    };

    const SkillList = ({ skillls }) => {
        return (
            <ul className="skillls">
                {skillls.sort((a, b) => b.id - a.id).map(skilll => (
                    <SkillItem
                        key={skilll.id}
                        skilll={skilll}
                        deleteSkill={deleteSkill}
                        
                    />
                ))}
            </ul>
        );
    };

    const EditForm = ({ editedSkill, updateSkill, closeEditMode }) => {
        const [updatedSkillName, setUpdatedSkillName] = useState(editedSkill.name);
      
        useEffect(()=> {
          const closeModalIfEscaped = (e) => {
            e.key === "Escape" && closeEditMode();
          }
      
          window.addEventListener('keydown', closeModalIfEscaped)
      
          return () => {
            window.removeEventListener('keydown', closeModalIfEscaped)
          }
        }, [closeEditMode])
      
        const handleFormSubmit = (e) => {
          e.preventDefault();
          updateSkill({...editedSkill, name: updatedSkillName})
        }
      
        return (
          <div
            className="skill"
            aria-labelledby="editSkill"
            onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
            >
            <form
              
              onSubmit={handleFormSubmit}
              >
              <div className="wrapper">
                <textarea
                id="editSkill"
                className="inputs"
                value={updatedSkillName}
                onInput={(e) => setUpdatedSkillName(e.target.value)}
                required
                autoFocus
                maxLength={500}
                placeholder="Update Skill"
                onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.target.value += '\n';
                }
                 }}
                ></textarea>
                <label
                  htmlFor="editSkill"
                  className="label"
                ></label>
              </div>
              <button
                className="btnn"
                aria-label={`Confirm edited task to now read ${updatedSkillName}`}
                type="submit"
                >
                <FaCheck strokeWidth={2} height={24} width={24} />
              </button>
            </form>
          </div>
        )
      };

    return (
        <div className="skill">
            <form onSubmit={handleFormSubmit}>
                <div className="wrapper">
                <textarea
                id="skill"
                className="inputs"
                required
                autoFocus
                maxLength={500}
                placeholder="Create Skill"
                onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.target.value += '\n';
                }
                 }}
                ></textarea>
                    <label htmlFor="skill" className="label"></label>
                </div>
                <button className="btnn" aria-label="Add Skill" type="submit">
                    <span><FaPlus /></span>
                </button>
            </form>

            {isEditing && (
                <EditForm
                    editedSkill={editedSkill}
                    updateSkill={updateSkill}
                    closeEditMode={closeEditMode}
                />
            )}

            <SkillList 
            skillls={skill} 
            deleteSkill={deleteSkill}
            />
        </div>
    );
};

export default Skills;
