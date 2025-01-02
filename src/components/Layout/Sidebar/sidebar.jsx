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
import SideBarItems from "./sidebarItems";
import { Iconify } from "../../iconify/iconify";
import LogoutButton from "./logoutButton";


const Sidebar = ({ isOpen }) => {
  const drawerWidth = isOpen ? 240 : 60;

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
          {SideBarItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "28px",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isOpen && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
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
