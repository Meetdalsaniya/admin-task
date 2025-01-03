import React, { useState } from 'react'
import ProjectFilter from '../projectFilter';
import ProjectTableRow from '../projectTableRow';
import ProjectTableHeader from '../projectTableHeader';
import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { applyFilters } from '../../../utils/filterUtil';

const ProjectsView = () => {
  const [filters, setFilters] = useState({ date: '', status: '' });

  const data = [
    { id: 1, name: 'John', date: '2025-01-01', status: 'active' },
    { id: 2, name: 'Jane', date: '2025-01-02', status: 'inactive' },
    { id: 3, name: 'Doe', date: '2025-01-03', status: 'active' },
    // Add more rows here
  ];

  const columns = ['id', 'name', 'date', 'status'];


  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ date: '', status: '' });
  };

  const filteredData = applyFilters(data, filters);

  return (
    <div>
      <ProjectFilter
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <ProjectTableHeader columns={columns} />
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <ProjectTableRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

  


export default ProjectsView