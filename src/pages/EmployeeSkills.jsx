import { Box,Typography} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import  mockData from '../data/mockData';
import { AdminPanelSettingsOutlined as AdminIcon, LockOpenOutlined as LockIcon, SecurityOutlined as SecurityIcon,AddModeratorOutlined as ModeratorIcon } from '@mui/icons-material';

import { blue, green } from "@mui/material/colors";


const EmployeeSkills= () => {
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "level",
      headerName: "Level",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "experience",
      headerName: "Experience",
      flex: 1,
    },
    {
      field: "skill",
      headerName: "Skill",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="80%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
                access === "admin"
                  ? blue[900] 
                  : access === "department-manager"
                  ? blue[700] 
                  : access === "project-manager"
                  ? blue[500] 
                  : blue[300] 
              }
            borderRadius="4px"
          >
           {access === "admin" && <AdminIcon />}
           {access === "department-manager" && <ModeratorIcon />}
          {access === "project-manager" && <SecurityIcon />}
          {access === "user" && <LockIcon />}
          <Typography color="black" sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box  ml="280px" bgcolor="#f0f0f0">
      <Box
        m="0 0 0 0"
        height="100vh"
        width="177vh"
        sx={{
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
        <DataGrid  rows={mockData} columns={columns} />
      </Box>
    </Box>
  );
};

export default EmployeeSkills;
