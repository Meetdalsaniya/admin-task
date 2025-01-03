import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ProjectFilter = ({ filters, handleFilterChange, resetFilters }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Select Date"
        type="date"
        value={filters.date || ''}
        onChange={(e) => handleFilterChange('date', e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginRight: '20px' }}
      />
      <FormControl style={{ marginRight: '20px' }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <MenuItem value="">Select Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={resetFilters}>Reset</Button>
    </div>
  );
};

export default ProjectFilter;
