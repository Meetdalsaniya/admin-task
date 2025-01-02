import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Iconify } from "../../iconify/iconify";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/thunks/authThunk";
import { showSuccess } from "../../../utils/toastUtil";

const LogoutButton = ({ isOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    showSuccess("Logout successful!");
    navigate("/login"); // Redirect to login after logout
  };
  return (
    <ListItem button sx={{cursor:"pointer"}} onClick={handleLogout}>
      <ListItemIcon
        sx={{
          minWidth: "28px",
          justifyContent: "center",
        }}
      >
        <Iconify icon={"material-symbols:logout-sharp"} />
      </ListItemIcon>
      {isOpen && <ListItemText primary={"Logout"} />}
    </ListItem>
  );
};

export default LogoutButton;
