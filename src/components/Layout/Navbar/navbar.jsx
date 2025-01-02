import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import GlobalSearch from "./GlobalSearch/globalSearch";
import { Iconify } from "../../iconify/iconify";
import UserProfile from "./UserProfile/userProfile";

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: isSidebarOpen ? `calc(100% - 240px)` : `calc(100% - 60px)`,
        ml: isSidebarOpen ? `240px` : `60px`,
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        transition: "width 0.3s ease",
      }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
        <Iconify icon={'bx:menu'}/>
        </IconButton>
        <Box sx={{ flexBasis: "300px" }}>
          <GlobalSearch />
        </Box>
        <Box sx={{ ml: "auto" }}>
          <UserProfile />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
