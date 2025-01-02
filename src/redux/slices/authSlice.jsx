// thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.log(data, "user Profile ");

      return data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
