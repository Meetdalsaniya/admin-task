import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, loadUser, registerUser } from "../thunks/authThunk";
import { createProject, fetchProjects } from "../thunks/projectThunk";

const initialState =  { projects: [], loading: false, error: null }

const projectSlice = createSlice({
   name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); // Add new project to the list
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload; // Update the list of projects
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearErrors, resetState, setAuthData } = projectSlice.actions;

export default projectSlice.reducer;
