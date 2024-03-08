import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { blue, green } from "@mui/material/colors";

const EmployeeSkills = () => {
  const [skills, setSkills] = useState(() => {
    const storedSkills = localStorage.getItem('employeeSkills'); 
    if (storedSkills) {
      const parsedSkills = JSON.parse(storedSkills);
      const skillsWithIds = parsedSkills.map((skill, index) => ({
        ...skill,
        id: skill.id || index.toString(), 
      }));
      return skillsWithIds;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('employeeSkills', JSON.stringify(skills)); 
  }, [skills]);

  const getRowId = (row) => row.id;

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "skill", headerName: "Skill", flex: 1 },
    { field: "level", headerName: "Level", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
  ];

  const [newSkill, setNewSkill] = useState({
    name: "",
    skill: "",
    level: "",
    experience: "",
    department: "",
  });

  const handleAddSkill = () => {
    const id = Math.random().toString(36).substring(7);
    const newSkillWithId = { ...newSkill, id }; 
    setSkills([...skills, newSkillWithId]);
    setNewSkill({
      name: "",
      skill: "",
      level: "",
      experience: "",
      department: "",
    });
  };
  
  return (
    <Box ml="280px" bgcolor="#f0f0f0">
      <Box
        m="0 0 0 0"
        height="140vh"
        width="177vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: blue[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: blue[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: green,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: blue[600],
          },
        }}
      >
        <Box p={2} bgcolor="#fff" boxShadow={1} mb={2}>
          <Typography variant="h6">Add New Skill</Typography>
          <TextField
            label="Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Skill"
            value={newSkill.skill}
            onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            >
              <MenuItem value={1}>Learns</MenuItem>
              <MenuItem value={2}>Knows</MenuItem>
              <MenuItem value={3}>Does</MenuItem>
              <MenuItem value={4}>Helps</MenuItem>
              <MenuItem value={5}>Teaches</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Experience</InputLabel>
            <Select
              value={newSkill.experience}
              onChange={(e) => setNewSkill({ ...newSkill, experience: e.target.value })}
            >
              <MenuItem value="0-6 months">0-6 months</MenuItem>
              <MenuItem value="6-12 months">6-12 months</MenuItem>
              <MenuItem value="1-2 years">1-2 years</MenuItem>
              <MenuItem value="2-4 years">2-4 years</MenuItem>
              <MenuItem value="4-7 years">4-7 years</MenuItem>
              <MenuItem value="7+ years">7+ years</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Department"
            value={newSkill.department}
            onChange={(e) => setNewSkill({ ...newSkill, department: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddSkill}>Add Skill</Button>
        </Box>
        <DataGrid rows={skills} columns={columns} getRowId={getRowId} />
      </Box>
    </Box>
  );
};

export default EmployeeSkills;
