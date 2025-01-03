import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { handleColumnSelect } from '../../utils/filterUtil';

const ProjectFilter = ({ filters, handleFilterChange, resetFilters,columns,setFilters }) => {
  const handleColumnSelectWrapper = (event) => {
    handleColumnSelect(event, setFilters, columns); // Use updated helper function
  };
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
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"   
            label="Status"     
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
        {/* Column Selection Filter */}
        <FormControl>
        <InputLabel>Columns</InputLabel>
        <Select
          multiple
          value={filters.columns}
          onChange={handleColumnSelectWrapper} // Pass the function to handle selection
          renderValue={(selected) => {
            if (selected.length > 2) {
              return selected.slice(0, 2).join(', ') + '...';
            }
            return selected.join(', ');  // Show selected columns
          }}
          label={'Columns'}
        >
          {columns.map((column) => (
            <MenuItem key={column} value={column}>
              <Checkbox checked={filters.columns.indexOf(column) > -1} />
              <ListItemText primary={column} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="outlined" onClick={resetFilters}>Reset</Button>
    </div>
  );
};

export default ProjectFilter;
