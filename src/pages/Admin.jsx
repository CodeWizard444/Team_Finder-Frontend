import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { FaPlus , FaTrash} from 'react-icons/fa';

const Admin = () => {
    const [roles, setRoles] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    const [selectedRoles, setSelectedRoles] = useState(() => {
        const savedSelectedRoles = localStorage.getItem('selectedRoles');
        return savedSelectedRoles ? JSON.parse(savedSelectedRoles) : {};
    });
    const [employees, setEmployees] = useState([]);
    const [newRoleName, setNewRoleName] = useState(''); 
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
                        Authorization: `Bearer ${token}`, 
                    },
                });
                const roleNames = response.data.roles.map(role => role.role_name); 
                setRoles(roleNames); 
            } catch (error) {
                console.error('Error fetching team roles:', error);
            }
        };

        fetchTeamRoles();
    }, []);

    
    useEffect(() => {
        const fetchOrganizationMembers = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organizator/members', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data.users); 
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        };

        fetchOrganizationMembers();
    }, []);
    const addRole = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post(
                'https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organization/create/team-roles',
                { role_name: newRoleName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Role created successfully:', response.data);
            setRoles(prevRoles => [...prevRoles, newRoleName]); 
            setNewRoleName(''); 
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    const deleteRole = async (roleName) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organization/delete/team-roles/${roleName}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(`Role ${roleName} deleted successfully`);
            setRoles(prevRoles => prevRoles.filter(role => role !== roleName));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const assignRole = async (employeeName, selectedRole) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/organizator/${employeeName}/assignRole`,
                { role: selectedRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
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
                    <span className="itm">Action</span>
                </div>
                {roles.map((role, index) => (
                    <div key={index} className="roles-item">
                        {role}
                        <button className="deletee-btnn" onClick={() => deleteRole(role)}><FaTrash /></button>
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
                        <span className="fnc-item">{employee.username}</span>
                        <span className="fnc-item">
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
