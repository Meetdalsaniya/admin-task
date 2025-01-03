import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/thunks/authThunk";
import { showSuccess } from "../../utils/toastUtil";

// Importing helper functions for validation
import { validateEmail, validatePassword, validateName } from "../../utils/validationUtil";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "name") {
      setNameError(validateName(e.target.value) ? "" : "Name is required");
    }
    if (e.target.name === "email") {
      setEmailError(validateEmail(e.target.value) ? "" : "Invalid email format");
    }
    if (e.target.name === "password") {
      setPasswordError(validatePassword(e.target.value) ? "" : "Password must be at least 6 characters long");
    }
    if (e.target.name === "confirmPassword") {
      setConfirmPasswordError(
        e.target.value === formData.password ? "" : "Passwords do not match"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!validatePassword(formData.password)) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    if (!validateName(formData.name)) {
      setNameError("Name is required");
      return;
    }
    if (formData.password === formData.confirmPassword) {
      setError("");
      dispatch(registerUser(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/login");
          showSuccess("User Registered successful!");
          console.log("User Registered");
        }
      });
    } else {
      setConfirmPasswordError("Passwords do not match");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Register Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={Boolean(nameError)}
            helperText={nameError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
          <Box mt={2}>
            <Button onClick={() => navigate('/login')} variant="body2">
              Already have an account? Sign In
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
