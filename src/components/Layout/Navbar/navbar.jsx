import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { Iconify } from "../../iconify/iconify";


const Navbar = ({ isSidebarOpen,onMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: isSidebarOpen ? `calc(100% - 240px)` : `calc(100% - 60px)`,
        ml: `240px`,
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        transition: "width 0.3s ease, margin-left 0.3s ease",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ marginRight: 2 }}
        >
         <Iconify icon={'bx:menu'}/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "purple", marginRight: "10px" }}>H</Avatar>
          <Typography>Harley</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
