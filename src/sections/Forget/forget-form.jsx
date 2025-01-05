import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgetForm = () => {
  const [formData, setFormData] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          Forget Account
        </Typography>
        <form>
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Forget
          </Button>
          <Box
            mt={2}
            sx={{ display: "flex", justifyContent: "end", color: "#1976d2" }}
          >
            <Button onClick={() => navigate("/login")} variant="body2">
              Login ?
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgetForm;
