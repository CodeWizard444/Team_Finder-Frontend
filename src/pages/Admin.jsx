import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { FaPlus } from 'react-icons/fa';

const Admin = () => {
    const [roles, setRoles] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    const [selectedRoles, setSelectedRoles] = useState(() => {
        const savedSelectedRoles = localStorage.getItem('selectedRoles');
        return savedSelectedRoles ? JSON.parse(savedSelectedRoles) : {};
    });
    const [employees, setEmployees] = useState([]); // Starea pentru lista de angajați
    const [newRoleName, setNewRoleName] = useState(''); // Starea pentru numele noului rol
    useEffect(() => {
        localStorage.setItem('roles', JSON.stringify(roles));
    }, [roles]);

    useEffect(() => {
        localStorage.setItem('selectedRoles', JSON.stringify(selectedRoles));
    }, [selectedRoles]);

    useEffect(() => {
        const fetchTeamRoles = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organization/team-roles',{
                    headers: {
                        Authorization: `Bearer ${token}`, // Adăugați token-ul în antetul cererii
                    },
                });
                const roleNames = response.data.roles.map(role => role.role_name); // Extragem doar numele rolurilor
                setRoles(roleNames); // Setăm lista de nume de roluri în starea 'roles'
            } catch (error) {
                console.error('Error fetching team roles:', error);
            }
        };

        fetchTeamRoles();
    }, []);

    
    useEffect(() => {
        const fetchOrganizationMembers = async () => {
            try {
                const token = localStorage.getItem('token'); // Obțineți token-ul din localStorage
                const response = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organizator/members', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adăugați token-ul în antetul cererii
                    },
                });
                setEmployees(response.data.users); // Setează lista de angajați în starea 'employees'
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        };

        fetchOrganizationMembers();
    }, []);
    const addRole = async () => {
        try {
            const token = localStorage.getItem('token'); // Obțineți token-ul din localStorage
            const response = await axios.post(
                'https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organization/create/team-roles',
                { role_name: newRoleName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adăugați token-ul în antetul cererii
                    },
                }
            );
            console.log('Role created successfully:', response.data);
            setRoles(prevRoles => [...prevRoles, newRoleName]); // Adăugăm noul rol în lista de roluri
            setNewRoleName(''); // Resetăm starea pentru numele noului rol
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    const assignRole = async (employeeName, selectedRole) => {
        try {
            const token = localStorage.getItem('token'); // Obțineți token-ul din localStorage
            await axios.post(
                `https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organizator/${employeeName}/assignRole`,
                { role: selectedRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adăugați token-ul în antetul cererii
                    },
                }
            );
            console.log(`Role ${selectedRole} assigned to employee ${employeeName} successfully`);
            const updatedSelectedRoles = { ...selectedRoles, [employeeName]: selectedRole };
            setSelectedRoles(updatedSelectedRoles);
        } catch (error) {
            console.error('Error assigning role:', error);
        }
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
                {employees.map((employee, index) => (
                    <div key={index} className="employee-item">
                        {/* Afișarea numelui de utilizator al angajatului */}
                        <span className="fnc-item">{employee.username}</span>
                        <span className="fnc-item">
                            {/* Afișarea listei de selectare pentru rolurile disponibile */}
                            <select 
                                value={selectedRoles[employee.username] || ''} 
                                onChange={(e) => assignRole(employee.username, e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="Employee">Employee</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Department Manager">Department Manager</option>
                                <option value="Organization Admin">Admin</option>
                            </select>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
