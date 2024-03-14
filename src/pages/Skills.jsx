import React, { useState, useEffect } from 'react';
import './skill.css';
import { FaPlus, FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import axios from 'axios';




const Skills = () => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('skills');
    return savedSkills ? JSON.parse(savedSkills) : [];
  });
  const [formData, setFormData] = useState({
    category_id: '',
    skill_name: '',
    description: '',
    user: '',
    departments: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkillIndex, setEditedSkillIndex] = useState(null);
  const [buttonPosition, setButtonPosition] = useState('bottom');
  const [assignedSkills, setAssignedSkills] = useState([])
  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleAddSkill = async (e) => {
    e.preventDefault();
    const { skillCategory, skillName, description, departments } = formData;

  
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('https://atc-2024-cyber-creators-be-linux-web-app.azurewebsites.net/api/skills/create', {
        category_name: skillCategory,
        skill_name: skillName,
        description: description,
        departments: departments // Trimite array-ul direct, fără a-l converti în format JSON
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 201) {
        
        const {skill_name, description, category_id} = response.data.skill.details;

      // Creează un obiect skill cu informațiile suplimentare
      const newSkill = {
        category_id: category_id,
    skill_name: skill_name,
    description: description,
    user: response.data.skill.user,
    departments: response.data.skill.departments
        // Alte proprietăți dacă sunt necesare
      };
        console.log(response)
        setSkills([newSkill, ...skills]);
        setFormData({
          skillCategory: '',
          skillName: '',
    description: '',
    author: '',
    departments: ''
        });
      } else {
        console.error('Error creating skill:', response.data.error);
      }
    } catch (error) {
      console.error('Error creating skill:', error.message);
    }
  };
  
  
  
  


  const handleUpdateSkill = (index) => {
    const skillToEdit = skills[index];
    setFormData(skillToEdit);
    setIsEditing(true);
    setEditedSkillIndex(index);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedSkillIndex(null);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };


  const handleAssignToDepartment = (assignedSkillName) => {
    setAssignedSkills([...assignedSkills, assignedSkillName]);
  };
  
  

  const handleFormFocus = () => {
    setButtonPosition('top');
  };

  const handleFormBlur = () => {
    setButtonPosition('bottom');
  };

  return (
    <div className="skill-page">
      <form
        className={`create-skill ${buttonPosition === 'top' ? 'form-top' : ''}`}
        onSubmit={handleAddSkill}
        onFocus={handleFormFocus}
        onBlur={handleFormBlur}
      >
        <input
          type="text"
          name="skillCategory"
          value={formData.skillCategory}
          onChange={handleChange}
          placeholder="Skill Category"
        />
        <input
          type="text"
          name="skillName"
          value={formData.skillName}
          onChange={handleChange}
          placeholder="Skill Name"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <input
          type="text"
          name="departments"
          value={formData.departments}
          onChange={handleChange}
          placeholder="Departments"
        />
        {isEditing ? (
          <>
            <button className="btnn-cancel" type="button" onClick={handleCancelEdit}>Cancel</button>
            <button className="btnn" type="submit"><FaCheck /></button>
          </>
        ) : (
          <button className="btnn" type="submit"><FaPlus /></button>
        )}
      </form>

      <table className="skill-table">
        <thead>
          <tr>
            <th>Skill Category</th>
            <th>Skill Name</th>
            <th>Description</th>
            <th>Author</th>
            <th>Departments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="contain">
        {skills.map((skill, index) => (
    <tr key={index}>

      <td>{skill.category_id}</td>
      <td>{skill.skill_name}</td>
      <td>{skill.description}</td>
      <td>{skill.user}</td>
      <td>{skill.departments}</td>
      <td>
        <button className="btnn-update" type="button" onClick={() => handleUpdateSkill(index)}><FaPencilAlt /></button>
        <button className="btnn-delete" type="button" onClick={() => handleDeleteSkill(index)}><FaTrash /></button>
        <button className="btnn-assign" type="button" onClick={() => handleAssignToDepartment(skill.skillName)}><FaUsers /></button>

      </td>
    </tr>
  ))}
</tbody>
      </table>
      <Link to="/depmanager"></Link>
    </div>
  );
};

export default Skills;