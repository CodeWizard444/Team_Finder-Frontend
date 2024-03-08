import React, { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';
import LocalStorage from '../hooks/LocalStorage';
import './departments.css';
import { Link } from 'react-router-dom';

const Departments = () => {
    const [departments, setDepartments] = LocalStorage('react-storage.departments',[]);
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedDepartment, setEditedDepartment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const addDepartment = (departmentName) => {
        setDepartments(prevDepartments => [
            ...prevDepartments,
            {
                name: departmentName,
                id: Date.now()
            }
        ]);
    };

    const deleteDepartment = (id) => {
        setDepartments(prevDepartments => prevDepartments.filter(dep => dep.id !== id));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addDepartment(e.target.elements.department.value);
        e.target.reset(); 
    };

    const enterEditMode = (department) => {
        setEditedDepartment(department);
        setIsEditing(true);
        setPreviousFocusEl(document.activeElement);
    }

    const updateDepartment = (updatedDepartment) => {
        setDepartments(prevDepartments => prevDepartments.map(dep => (
            dep.id === updatedDepartment.id ? updatedDepartment : dep
        )));
        closeEditMode();
    }

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocusEl.focus();
    }

    const DepartmentItem = ({ depp }) => {
        return (
            <li className="depp">
                <div className="departmentt">
                <Link to="/depmanager" className="department-link">
                    {depp.name}
                </Link>
                </div>
                <div className="dep-group">
                    <button
                        className='btnnn-update'
                        aria-label={`Update ${depp.name} Task`}
                        onClick={() => enterEditMode(depp)}
                    >
                        <FaPencilAlt width={24} height={24} />
                    </button>

                    <button
                        className='btnnn-delete'
                        aria-label={`Delete ${depp.name} Task`}
                        onClick={() => deleteDepartment(depp.id)}
                    >
                        <FaTrash width={24} height={24} />

                    </button>
                </div>
            </li>
        );
    };

    const DepartmentsList = ({ deps }) => {
        return (
            <ul className="deps">
                {deps.sort((a, b) => b.id - a.id).map(depp => (
                    <DepartmentItem
                        key={depp.id}
                        depp={depp}
                        deleteDepartment={deleteDepartment}
                        
                    />
                ))}
            </ul>
        );
    };

    const EditForm = ({ editedDepartment, updateDepartment, closeEditMode }) => {
        const [updatedDepartmentName, setUpdatedDepartmentName] = useState(editedDepartment.name);
      
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
          updateDepartment({...editedDepartment, name: updatedDepartmentName})
        }
      
        return (
          <div
            className="dep"
            aria-labelledby="editDepartment"
            onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
            >
            <form
              
              onSubmit={handleFormSubmit}
              >
              <div className="wrapper">
                <input
                  type="text"
                  id="editDepartment"
                  className="inputs"
                  value={updatedDepartmentName}
                  onInput={(e) => setUpdatedDepartmentName(e.target.value)}
                  required
                  autoFocus
                  maxLength={60}
                  placeholder="Update Department"
                />
                <label
                  htmlFor="editDepartment"
                  className="label"
                ></label>
              </div>
              <button
                className="btnnn"
                aria-label={`Confirm edited task to now read ${updatedDepartmentName}`}
                type="submit"
                >
                <FaCheck strokeWidth={2} height={24} width={24} />
              </button>
            </form>
          </div>
        )
      };

    return (
        <div className="dep">
            <form onSubmit={handleFormSubmit}>
                <div className="wrapper">
                    <input
                        type="text"
                        id="department"
                        className="inputs"
                        required
                        autoFocus
                        maxLength={60}
                        placeholder="Create Departments"
                    />
                    <label htmlFor="department" className="label"></label>
                </div>
                <button className="btnnn" aria-label="Add Department" type="submit">
                    <span><FaPlus /></span>
                </button>
            </form>

            {isEditing && (
                <EditForm
                    editedDepartment={editedDepartment}
                    updateDepartment={updateDepartment}
                    closeEditMode={closeEditMode}
                />
            )}

            <DepartmentsList 
            deps={departments} 
            deleteDepartment={deleteDepartment}
            />
        </div>
    );
};

export default Departments;
