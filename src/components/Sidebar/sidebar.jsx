import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>LOGO</ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/projects">
            <ListItemIcon>dededee</ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button component={Link} to="/estimates">
            <ListItemIcon>T</ListItemIcon>
            <ListItemText primary="Estimates" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
