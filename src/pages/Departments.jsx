import React, { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';
import './departments.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedDepartment, setEditedDepartment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organization/departments', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setDepartments(response.data.departments.map((department, index) => ({ id: index, name: department }))); // Adaugă un id unic pentru fiecare departament
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const addDepartment = async (departmentName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/create',
                { department_name: departmentName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            console.log(response)
            const newDepartment = {
                id: departments.length, // Setează un id unic pentru noul departament
                name: response.data.department_name
            };
            setDepartments(prevDepartments => [
                ...prevDepartments,
                newDepartment
            ]);
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    const deleteDepartment = async (departmentName) => {
        try {
            const token = localStorage.getItem('token'); 
            await axios.delete(
                `https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/${encodeURIComponent(departmentName)}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            setDepartments(prevDepartments => prevDepartments.filter(dep => dep.name !== departmentName));
            console.log(`Department with name "${departmentName}" deleted successfully`);
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };
    

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
                        onClick={() => deleteDepartment(depp.name)}
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
                {deps.map(depp => (
                    <DepartmentItem
                        key={depp.id} // Utilizăm id-ul departamentului ca și cheie unică
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

            <DepartmentsList deps={departments} />

        </div>
    );
};

export default Departments;
