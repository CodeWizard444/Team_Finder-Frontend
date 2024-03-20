import React, { useState } from "react";
import "./addproject.css";

const AddProject = (props) => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectPeriod: "",
    startDate: "",
    deadlineDate: "",
    projectStatus: "Not Started",
    generalDescription: "",
    technologyStack: [],
    teamRoles: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedStack = checked
        ? [...formData.technologyStack, value]
        : formData.technologyStack.filter((tech) => tech !== value);
      setFormData({ ...formData, [name]: updatedStack });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    props.handleAddProject(formData);
    props.setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          x
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>Project Period</label>
            <select
              name="projectPeriod"
              value={formData.projectPeriod}
              onChange={handleChange}
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
          <div className="item">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          {formData.projectPeriod === "Fixed" && (
            <div className="item">
              <label>Deadline Date</label>
              <input
                type="date"
                name="deadlineDate"
                value={formData.deadlineDate}
                onChange={handleChange}
              />
            </div>
          )}
           <div className="item">
            <label>Project Status</label>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
            >
              <option value="Not Started">Not Started</option>
              <option value="Starting">Starting</option>
            </select>
          </div>
          <div className="item">
            <label>General Description</label>
            <textarea
              placeholder="General Description"
              name="generalDescription"
              value={formData.generalDescription}
              onChange={handleChange}
            />
          </div>
          <div className="item">
          <label>Technology Stack</label>
            <div className="tech-stack-container">
              <div className="tech-stack-options">
                {[
                  "JavaScript",
                  "C++",
                  "Ruby",
                  "HTML/CSS",
                  "React.js",
                  "Angular",
                  "Node.js",
                  "Express.js",
                  "SQL",
                  "Pandas",
                  "NumPy",
                  "Kanban",
                  "Microsoft Azure",
                  "Google Cloud Platform",
                  "MySQL",
                  "PostgreSQL",
                  "MongoDB",
                  "Adobe Photoshop",
                  "Adobe Illustrator",
                ].map((tech) => (
                  <div key={tech} className="tech-stack-option">
                    <input
                      type="checkbox"
                      name="technologyStack"
                      value={tech}
                      checked={formData.technologyStack.includes(tech)}
                      onChange={handleChange}
                    />
                    <label>{tech}</label>
                  </div>
                ))}
                </div>
            </div>
          </div>
          {/* Add Team Roles section */}
          <button className="send-button" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
