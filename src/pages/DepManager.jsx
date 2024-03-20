import React, { useState,useEffect } from 'react';
import './depmanager.css';
import mockData from '../data/mockData';
import { FaPlus, FaTrash} from 'react-icons/fa';
import PieChart from '../chart/PieChart';
import dataRoles from '../data/dataRoles';
import ChartStats from '../chart/ChartStats';
import LevelStats from '../chart/LevelStats';
import TotalStats from '../chart/TotalStats';
import axios from 'axios';

const DepManager = ({/* assignedSkills*/ }) => {
    const [employeesWithDepartments, setEmployeesWithDepartments] = useState([]);
    const [employeesWithoutDepartments, setEmployeesWithoutDepartments] = useState([]);
    const [departmentManager, setDepartmentManager] = useState(null);
    const [departmentSkills, setDepartmentSkills] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const storedDepartmentName = localStorage.getItem('departmentName');
        setDepartmentName(storedDepartmentName)

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                

                const response = await axios.get(`https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/${storedDepartmentName}/skills`,{
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });
                setDepartmentSkills(response.data.departmentSkills);

                const membersResponse = await axios.get(`https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/${storedDepartmentName}/members`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployeesWithDepartments(membersResponse.data.users);

                const noDepartmentResponse = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/noMembers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployeesWithoutDepartments(noDepartmentResponse.data.users);


                const managerResponse = await axios.get(`https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/${storedDepartmentName}/manager`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(managerResponse.data.managerName)
                setDepartmentManager(managerResponse.data.managerName);


                const notificationsResponse = await axios.get('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/getNotifications', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNotifications(notificationsResponse.data.notifications);

                console.log(notifications)

            } catch (error) {
                console.error('Error fetching department skills:', error);
            }
        };

        fetchData();
    }, []);

    const addEmployeeToDepartment = async (employeeName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/addEmployee', {
                employeeName
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            console.log('Employee added to department:', response.data);
        } catch (error) {
            console.error('Error adding employee to department:', error);
        }
    };

    useState(() => {
        const employeesWithDepartmentsInit = mockData.filter(employee => employee.department !== "");
        const employeesWithoutDepartmentsInit = mockData.filter(employee => employee.department === "");
        setEmployeesWithDepartments(employeesWithDepartmentsInit);
        setEmployeesWithoutDepartments(employeesWithoutDepartmentsInit);

    }, []);

    const moveToDepartments = async (index) => {
        try {
            const token = localStorage.getItem('token');
            const employeeToMove = employeesWithoutDepartments[index];
            
            // Facem cererea către API pentru a adăuga angajatul în departament
            await axios.post(
                'https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/addEmployee',
                { employeeName: employeeToMove.username },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
    
            // După ce cererea este finalizată cu succes, actualizăm starea locală a componentei
            setEmployeesWithDepartments([...employeesWithDepartments, employeeToMove]);
            setEmployeesWithoutDepartments(employeesWithoutDepartments.filter((_, idx) => idx !== index));
        } catch (error) {
            console.error('Error moving employee to department:', error);
            
            // Aici poți gestiona erorile într-un mod adecvat, cum ar fi afișarea unui mesaj către utilizator
        }
    };

    const removeFromDepartments = async (index) => {
        try {
            const token = localStorage.getItem('token');
            const employeeToRemove = employeesWithDepartments[index];
            

            await axios.put('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/departments/removeEmployee', {
                employeeName: employeeToRemove.username
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
  
            setEmployeesWithDepartments(employeesWithDepartments.filter((_, idx) => idx !== index));
            setEmployeesWithoutDepartments([...employeesWithoutDepartments, employeeToRemove]);
        } catch (error) {
            console.error('Error removing employee from department:', error);
            
        }
    };
    
    return (
        <div className="manager-view">
            <div className="department-skills">
    <span className="header-title">Department Skills</span>
    <ul>
        {departmentSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
        ))}
    </ul>
</div>


            <div className="employee-section">
                <span className="header-titles">Employees with no departments</span>
                <table className="no-dep-tableee">
                    <thead className="hdr">
                        <tr>
                            <th>Name</th>
                            <th>Skills</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesWithoutDepartments.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.username}</td>
                                <td>{employee.skill_names || "No skills"}</td>
                                <td>{"No department"}</td>
                                <td>
                                    <button  className="dep-btnn-p" onClick={() => moveToDepartments(index)}><FaPlus /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="employee-section">
                <span className="header-titles-1">Department Members</span>
                <table className="dep-tableee">
                    <thead className="hdr">
                        <tr>
                            <th>Name</th>
                            <th>Skills</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesWithDepartments.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.username}</td>
                                <td>{employee.skill_names || "No skills"}</td>
                                <td>{departmentName}</td>
                                <td>
                                    <button className="dep-btnn-t" onClick={() => removeFromDepartments(index)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="notifications">
    <span className="header-title">Notifications</span>
    {notifications.length === 0 ? (
        <p>No notifications</p>
    ) : (
        <ul>
            {notifications.map(notification => (
                <li key={notification.notification_id}>{notification.message}</li>
            ))}
        </ul>
    )}
</div>


            <div className="chart-data">
                <span className="chart-data-header">Department Skill Level Statistics</span>
                <PieChart />
            </div>

            <div className="percent-stats">
                <span className="percent-stats-header">Department Skill Level % Statistics</span>
                    <ChartStats />
            </div>
            
            <div className="level-stats">
                <span className="level-stats-header">Department People Skill Statistics</span>
                <LevelStats />
            </div>

            <div className="total-stats">
                <span className="total-stats-header">Department People Skill Statistics</span>
                <TotalStats />
            </div>

            <div className="dep-manager-name">
                {departmentManager && <span>Department Manager: {departmentManager}</span>}
            </div>
            <div className="dep-projects">
                <a href="/depprojects" className="dep-proj-link">Department Projects</a>
            </div>
        </div>
    );
};

export default DepManager;
