import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Sidebar from "./Sidebar/sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar isOpen={isSidebarOpen} />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar isSidebarOpen={isSidebarOpen} onMenuClick={toggleSidebar} />
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
