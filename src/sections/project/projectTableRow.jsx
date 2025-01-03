import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const ProjectTableRow = ({ row }) => {
  return (
    <TableRow>
      {Object.keys(row).map((key) => (
        <TableCell key={key}>{row[key]}</TableCell>
      ))}
    </TableRow>
  );
};

export default ProjectTableRow;
