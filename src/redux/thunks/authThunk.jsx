// thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration (doesn't store user in Redux)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users",
        userData
      );
      return response.data.message; // Return success message only
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Make request to json-server with email and password
      const response = await axios.get(
        `http://localhost:8080/users?email=${userData.email}&password=${userData.password}`
      );

      // Check if user exists
      if (response.data.length > 0) {
        // User found - return the first matching user
        return response.data[0];
      } else {
        // No user found - reject with error message
        return rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      // Handle server error
      return rejectWithValue("Server error. Please try again.");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("x-access-token");
      return "Logout Successfully";
    } catch (error) {
      return rejectWithValue("Something Error Occured");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/dashboard/profile`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Async thunk to check user authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Check if the token exists in localStorage

      if (token) {
        // If the token exists, return a success action with the token
        return { token }; // You can also add other user info here if needed
      } else {
        // If no token exists, return a failure action
        return rejectWithValue("No token found, user is not authenticated.");
      }
    } catch (error) {
      return rejectWithValue("Error checking authentication status.");
    }
  }
);
