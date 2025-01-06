import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, loadUser, registerUser } from "../thunks/authThunk";
import { listUser } from "../thunks/userThunk";

const initialState = {
  isLoading: false,
  users: [],
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetState: (state) => {},
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
  },
});

export const { clearErrors, resetState, setAuthData } = authSlice.actions;

export default authSlice.reducer;
