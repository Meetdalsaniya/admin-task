import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const ProjectTableHeader = ({ columns, handleSelectHeader }) => {
  return (
    <TableRow>
      {columns.map((column,index) => (
        <TableCell key={index} onClick={() => handleSelectHeader(column)} style={{ cursor: 'pointer' }}>
          {column}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ProjectTableHeader;
