import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LanguageIcon from "@mui/icons-material/Language";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`,
        ml: `240px`,
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton>{/* <NotificationsIcon /> */}</IconButton>
        <IconButton>{/* <LanguageIcon /> */}</IconButton>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "purple", marginRight: "10px" }}>H</Avatar>
          <Typography>Harley</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
