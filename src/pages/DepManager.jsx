import React, { useState } from 'react';
import './depmanager.css';
import mockData from '../data/mockData';
import { FaPlus, FaTrash} from 'react-icons/fa';
import PieChart from '../chart/PieChart';
import dataRoles from '../data/dataRoles';
import ChartStats from '../chart/ChartStats';
import LevelStats from '../chart/LevelStats';
import TotalStats from '../chart/TotalStats';

const DepManager = ({/* assignedSkills*/ }) => {
    const [employeesWithDepartments, setEmployeesWithDepartments] = useState([]);
    const [employeesWithoutDepartments, setEmployeesWithoutDepartments] = useState([]);
    const [departmentManager, setDepartmentManager] = useState(null);

    useState(() => {
        const employeesWithDepartmentsInit = mockData.filter(employee => employee.department !== "");
        const employeesWithoutDepartmentsInit = mockData.filter(employee => employee.department === "");
        setEmployeesWithDepartments(employeesWithDepartmentsInit);
        setEmployeesWithoutDepartments(employeesWithoutDepartmentsInit);

        const manager = dataRoles.find(employee => employee.role === "department manager");
        setDepartmentManager(manager);
    }, []);

    const moveToDepartments = (index) => {
        const employeeToMove = employeesWithoutDepartments[index];
        setEmployeesWithDepartments([...employeesWithDepartments, employeeToMove]);
        setEmployeesWithoutDepartments(employeesWithoutDepartments.filter((_, idx) => idx !== index));
    };

    const removeFromDepartments = (index) => {
        const employeeToRemove = employeesWithDepartments[index];
        setEmployeesWithDepartments(employeesWithDepartments.filter((_, idx) => idx !== index));
        setEmployeesWithoutDepartments([...employeesWithoutDepartments, employeeToRemove]);
    };

    return (
        <div className="manager-view">
            <div className="department-skills">
                <span className="header-title">Department Skills</span>
                {/*assignedSkills.map((skill, index) => (
                <p key={index}>{skill}</p>
                ))*/}
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
                                <td>{employee.name}</td>
                                <td>{employee.skills.join(", ")}</td>
                                <td>{employee.department}</td>
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
                                <td>{employee.name}</td>
                                <td>{employee.skills.join(", ")}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <button className="dep-btnn-t" onClick={() => removeFromDepartments(index)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                {departmentManager && <span>Department Manager: {departmentManager.name}</span>}
            </div>
            <div className="dep-projects">
                <a href="/depprojects" className="dep-proj-link">Department Projects</a>
            </div>
        </div>
    );
};

export default DepManager;
