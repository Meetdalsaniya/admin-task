import React from "react";
import { Box, Avatar, Typography, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const {user} = useSelector((state)=> state.auth)
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={user?.email}>

      <Avatar sx={{ bgcolor:"blue", marginRight: "10px" }}>
        {userInitial}
      </Avatar>
        </Tooltip>
      {/* <Typography>{user?.name}</Typography> */}
    </Box>
  );
};

export default UserProfile;
