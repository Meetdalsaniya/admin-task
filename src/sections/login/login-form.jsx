import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/toastUtil";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error, user } = useSelector((state) => state.auth);
  console.log(user);
  console.log(error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
        showSuccess("User Login successful!");
        console.log("User Login");
      }
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <Box
            sx={{ display: "flex", justifyContent: "end", marginTop: "5px" }}
          >
            <Button
              onClick={() => navigate("/forget")}
              variant="body2"
              sx={{ padding: "0", color: "#1976d2" }}
            >
              Forget Password?
            </Button>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {/* {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Box mt={2}>
            <Button onClick={() => navigate("/register")} variant="body2">
              Don't have an account? Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
