import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import { Iconify } from '../../components/iconify/iconify';


const ProjectTableRow = ({ row, columns, handleEditClick, handleDeleteClick }) => {
  console.log("🚀 ~ ProjectTableRow ~ columns:", columns)
  return (
    <TableRow>
      {/* Display project data for each column */}
      {columns.map((column) => {
        // If the column is "Action", render the Edit and Delete buttons
        if (column === "Action") {
          return (
            <TableCell key={column}>
              <IconButton onClick={() => handleEditClick(row)}>
                <Iconify icon={'raphael:edit'} />
              </IconButton>
              <IconButton onClick={() => handleDeleteClick(row.id)}>
                <Iconify icon={'material-symbols:delete'} />
              </IconButton>
            </TableCell>
          );
        } else {
          return <TableCell key={column}>{row[column]}</TableCell>;
        }
      })}
    </TableRow>
  );
};

export default ProjectTableRow;
