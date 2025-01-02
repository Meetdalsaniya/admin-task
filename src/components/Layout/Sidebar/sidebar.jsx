import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SideBarItems from "./sidebarItems";
import LogoutButton from "./logoutButton";


const Sidebar = ({ isOpen }) => {
  const drawerWidth = isOpen ? 240 : 60;
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: isOpen ? "center" : "flex-start",
            alignItems: "center",
            height: "64px",
            p: 1,
          }}
        >
          {isOpen ? "Logo" : "L"}
        </Box>
        <List>
          {SideBarItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Box sx={{marginX:"5px"}}>

              <ListItem
                button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  justifyContent: isOpen ? "flex-start" : "center",
                  backgroundColor: isActive ? "#1976d2" : "transparent",
                  color: isActive ? "white" : "inherit",
                  borderRadius: "8px",
             
                  marginY: "4px",
                  "&:hover": {
                    backgroundColor: isActive ? "#1565c0" : "#f4f4f4",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "28px",
                    justifyContent: "center",
                    color: isActive ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isOpen && <ListItemText primary={item.text} />}
              </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Logout Button at the bottom */}
      <Box sx={{ marginTop: "auto" }}>
        <LogoutButton isOpen={isOpen} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
