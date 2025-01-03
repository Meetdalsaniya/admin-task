import React, { useEffect, useState } from 'react';
import ProjectFilter from '../projectFilter';
import ProjectTableRow from '../projectTableRow';
import ProjectTableHeader from '../projectTableHeader';
import { Paper, Table, TableBody, TableContainer, TableHead,  Button, Box } from '@mui/material';
import { applyFilters } from '../../../utils/filterUtil';
import { Iconify } from '../../../components/iconify/iconify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../../redux/thunks/projectThunk';


const ProjectsView = () => {
  const columns = ['projectName','address', 'areaLocation', 'contact','status','projectNumber', 'customerName','dueDate','email','manager','Action'];

  const [filters, setFilters] = useState({ date: '', status: 'all', columns: columns });
const {user} = useSelector((state)=>state.auth)
const {projects} = useSelector((state)=> state.projects)
  console.log("🚀 ~ ProjectsView ~ projects:", projects)
  const data = [
    { id: 1, name: 'John', date: '2025-01-01', status: 'active' },
    { id: 2, name: 'Jane', date: '2025-01-02', status: 'inactive' },
    { id: 3, name: 'Doe', date: '2025-01-03', status: 'active' },
    // Add more rows here
  ];
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ date: '', status: 'all', columns: columns });
  };

  const filteredData = applyFilters(projects, filters);


  const handleEditClick = (row) => {
    console.log('Edit clicked for project:', row);
    // Implement edit functionality here (e.g., open the edit form)
  };
  
  useEffect(() => {
    if (user) {
      dispatch(fetchProjects(user.id)); // Fetch projects for the logged-in user
    }
  }, [user, dispatch]);

  return (
    <div>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <ProjectFilter
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        columns={columns}
        setFilters={setFilters}
      />
<Box>

<Button onClick={()=>navigate('/projects/create')} variant={'contained'} startIcon={<Iconify icon={'ic:sharp-plus'}/>}>
Add Project
</Button>
</Box>
      </Box>
  
    

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <ProjectTableHeader columns={filters.columns} />
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <ProjectTableRow key={index} row={row} columns={filters.columns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectsView;
