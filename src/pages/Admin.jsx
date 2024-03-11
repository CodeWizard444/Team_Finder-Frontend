import React, { useState, useEffect } from 'react';
import './admin.css';
import mockData from '../data/mockData';
import { FaPlus } from 'react-icons/fa';

const Admin = () => {
    const [roles, setRoles] = useState(() => {
        const savedRoles = localStorage.getItem('roles');
        return savedRoles ? JSON.parse(savedRoles) : [];
    }); 
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    const [selectedRole, setSelectedRole] = useState(null); 
    const [newRoleName, setNewRoleName] = useState(''); 
    const [selectedRoles, setSelectedRoles] = useState(() => {
        const savedSelectedRoles = localStorage.getItem('selectedRoles');
        return savedSelectedRoles ? JSON.parse(savedSelectedRoles) : {};
    });

    useEffect(() => {
        localStorage.setItem('roles', JSON.stringify(roles));
    }, [roles]);

    useEffect(() => {
        localStorage.setItem('selectedRoles', JSON.stringify(selectedRoles));
    }, [selectedRoles]);

    const addRole = () => {
        if (newRoleName.trim() !== '') { 
            setRoles(prevRoles => [...prevRoles, newRoleName]); 
            setNewRoleName(''); 
        }
    };

    const assignRole = () => {
        if (selectedEmployee && selectedRole) {
            console.log(`Assigning role ${selectedRole} to employee ${selectedEmployee.name}`);
            setSelectedEmployee(null); 
            setSelectedRole(null); 
        }
    };

    const selectEmployee = (employee) => {
        setSelectedEmployee(employee);
    };

    const selectRole = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="adm-pg">
            <h2>Admin Page</h2>
            <div className="add-role-container">
                    <input 
                        type="text" 
                        className="inp"
                        value={newRoleName} 
                        onChange={(e) => setNewRoleName(e.target.value)} 
                        placeholder="Enter role name" 
                    />
                    
                </div>
                <button className="add-btnn" onClick={addRole}><FaPlus /></button>
            <div className="create-roles">
                <div className="boxx-header">
                    <span className="itm">Company Roles</span>
                </div>
                {roles.map((role, index) => (
                    <div key={index} className="role-item">
                        {role}
                    </div>
                ))}
            </div>
            <div className="promote-demote">
                <div className="boxx-header">
                    <span className="fnc-item">Name</span>
                    <span className="fnc-item">Status</span>
                </div>
                {mockData.map((employee, index) => (
                    <div key={index} className="employee-item">
                        <span className="fnc-item">{employee.name}</span>
                        <span className="fnc-item">
                            <select 
                                value={selectedRoles[employee.name] || ''} 
                                onChange={(e) => {
                                    const updatedSelectedRoles = { ...selectedRoles, [employee.name]: e.target.value };
                                    setSelectedRoles(updatedSelectedRoles);
                                }}
                            >
                                <option value="">Select Role</option>
                                <option value="Employee">Employee</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Department Manager">Department Manager</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
