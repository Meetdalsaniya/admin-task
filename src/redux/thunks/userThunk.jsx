import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listUser = createAsyncThunk(
    "user/userslist",
    async (_, { rejectWithValue }) => {
      try {
        // Make request to json-server with email and password
        const response = await axios.get(
          `http://localhost:8080/users`
        );
          return response.data;
      } catch (error) {
        // Handle server error
        return rejectWithValue("Server error. Please try again.");
      }
    }
  );
  