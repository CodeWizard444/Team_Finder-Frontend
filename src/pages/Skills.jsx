import React, { useState, useEffect } from 'react';
import './skill.css';
import { FaPlus, FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';

const Skills = () => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('skills');
    return savedSkills ? JSON.parse(savedSkills) : [];
  });
  const [formData, setFormData] = useState({
    skillCategory: '',
    skillName: '',
    description: '',
    author: '',
    departments: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkillIndex, setEditedSkillIndex] = useState(null);
  const [buttonPosition, setButtonPosition] = useState('bottom'); // Default position

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (isEditing) {
      // If in editing mode, update the existing skill
      const updatedSkills = [...skills];
      updatedSkills[editedSkillIndex] = formData;
      setSkills(updatedSkills);
      setIsEditing(false); // Leave editing mode only after updating skill
      setEditedSkillIndex(null); // Reset edited skill index
    } else {
      setSkills([...skills, formData]);
    }
    setFormData({
      skillCategory: '',
      skillName: '',
      description: '',
      author: '',
      departments: ''
    });
  };

  const handleUpdateSkill = (index) => {
    const skillToEdit = skills[index];
    setFormData(skillToEdit);
    setIsEditing(true);
    setEditedSkillIndex(index); // Set the index of the skill being edited
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedSkillIndex(null); // Reset edited skill index
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
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
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index}>
              <td>{skill.skillCategory}</td>
              <td>{skill.skillName}</td>
              <td>{skill.description}</td>
              <td>{skill.author}</td>
              <td>{skill.departments}</td>
              <td>
                <button className="btnn-update" type="button" onClick={() => handleUpdateSkill(index)}><FaPencilAlt /></button>
                <button className="btnn-delete" type="button" onClick={() => handleDeleteSkill(index)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skills;
