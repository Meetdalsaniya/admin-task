import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (projectData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8080/projects', projectData);
        return response.data; // Return the created project
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // Async thunk to fetch projects for a user
export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:8080/projects?userId=${userId}`);
        return response.data; // Return the fetched projects
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );