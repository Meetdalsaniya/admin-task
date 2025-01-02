import React from "react";
import { Box, Avatar, Typography, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const {user} = useSelector((state)=> state.auth)
  
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={user.email}>

      <Avatar sx={{ bgcolor:"blue", marginRight: "10px" }}>
        {"M"}
      </Avatar>
        </Tooltip>
      <Typography>{user?.name}</Typography>
    </Box>
  );
};

export default UserProfile;
