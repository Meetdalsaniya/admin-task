import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toastUtil";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validationUtil";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field as the user types
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        error = !validateRequired(value)
          ? "This field is required."
          : !validateEmail(value)
          ? "Invalid email address."
          : "";
        break;
      case "password":
        error = !validateRequired(value)
          ? "This field is required."
          : !validatePassword(value)
          ? "Password must be at least 6 characters."
          : "";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const emailError = !validateRequired(formData.email)
      ? "This field is required."
      : !validateEmail(formData.email)
      ? "Invalid email address."
      : "";

    const passwordError = !validateRequired(formData.password)
      ? "This field is required."
      : !validatePassword(formData.password)
      ? "Password must be at least 6 characters."
      : "";

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    dispatch(loginUser(formData))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
          showSuccess("User Login successful!");
        }
      })
      .catch((error) => {
        showError("Login failed. Please check your credentials.");
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography component="h1" variant="h5">
          Login to Account
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Forget Password Button */}
          <Box
            sx={{ display: "flex", justifyContent: "end", marginTop: "5px" }}
          >
            <Button
              onClick={() => navigate("/forget")}
              sx={{ padding: "0", color: "#1976d2" }}
            >
              Forget Password?
            </Button>
          </Box>

          {/* Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Register Link */}
          <Box mt={2}>
            <Button onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
