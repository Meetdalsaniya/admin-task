// src/components/PrivateRoute/privateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/thunks/authThunk";

// PrivateRoute component to protect routes based on authentication
const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated, tokenExpirationTime } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // Check token expiration on route access
  const currentTime = Date.now();

  if (isAuthenticated && tokenExpirationTime) {
    // If token has expired, log the user out and redirect to login
    if (currentTime > tokenExpirationTime) {
      dispatch(logoutUser()); // Log the user out
      return <Navigate to="/login" />;
    }
  }

  return isAuthenticated ? (
    children // Render the child component if the user is authenticated
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default ProtectedRoute;
