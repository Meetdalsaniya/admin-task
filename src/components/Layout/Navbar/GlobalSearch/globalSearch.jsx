import React, { useState, useRef } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Paper,
  ClickAwayListener,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBarItems from "../../Sidebar/sidebarItems";


const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const filteredItems = SideBarItems.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (path) => {
    navigate(path);
    setSearchTerm("");
    setOpen(false); // Close the dropdown after selection
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setOpen(e.target.value.length > 0);
  };

  const handleClickAway = () => {
    setOpen(false); // Close dropdown when clicking outside
  };

  return (
    <Box >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        autoComplete="off"
        sx={{
          backgroundColor: "white",
         
        }}
       
        inputRef={anchorRef}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ]}
        sx={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={3} sx={{ mt: 1, width: anchorRef.current?.offsetWidth || 300 }}>
            <List>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleItemClick(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default GlobalSearch;
