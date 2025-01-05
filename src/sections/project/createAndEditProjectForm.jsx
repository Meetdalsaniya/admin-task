import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  validateEmail,
  validateName,
  validateRequired,
  validateNumber,
} from "../../utils/validationUtil"; // Import helper functions
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "../../redux/thunks/projectThunk";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/toastUtil";

const CreateAndEditProjectForm = ({ currunt }) => {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme(); // Access MUI theme
  const [formData, setFormData] = useState({
    customerName: "",
    referenceNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    if (currunt) {
      setFormData({
        customerName: currunt.customerName || "",
        referenceNumber: currunt.referenceNumber || "",
        projectName: currunt.projectName || "",
        projectNumber: currunt.projectNumber || "",
        areaLocation: currunt.areaLocation || "",
        address: currunt.address || "",
        dueDate: currunt.dueDate || "",
        contact: currunt.contact || "",
        manager: currunt.manager || "",
        staff: currunt.staff || "",
        status: currunt.status || "",
        email: currunt.email || "",
      });
    }
  }, [currunt]);

  const [errors, setErrors] = useState({
    customerName: "",
    referenceNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle input change and validate on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field based on its name
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (fieldName, value) => {
    let formErrors = { ...errors };

    switch (fieldName) {
      case "customerName":
        formErrors.customerName = validateRequired(value)
          ? ""
          : "Customer name is required.";
        break;
      case "referenceNumber":
        formErrors.referenceNumber =
          validateRequired(value) && validateNumber(value)
            ? ""
            : "Reference number is required and must be a number.";
        break;
      case "projectName":
        formErrors.projectName = validateRequired(value)
          ? ""
          : "Project name is required.";
        break;
      case "projectNumber":
        formErrors.projectNumber =
          validateRequired(value) && validateNumber(value)
            ? ""
            : "Project number is required and must be a number.";
        break;
      case "areaLocation":
        formErrors.areaLocation = validateRequired(value)
          ? ""
          : "Area location is required.";
        break;
      case "address":
        formErrors.address = validateRequired(value)
          ? ""
          : "Address is required.";
        break;
      case "dueDate":
        formErrors.dueDate = validateRequired(value)
          ? ""
          : "Due date is required.";
        break;
      case "contact":
        formErrors.contact = validateRequired(value)
          ? ""
          : "Contact is required.";
        break;
      case "manager":
        formErrors.manager = validateRequired(value)
          ? ""
          : "Manager is required.";
        break;
      case "staff":
        formErrors.staff = validateRequired(value) ? "" : "Staff is required.";
        break;
      case "status":
        formErrors.status = validateRequired(value)
          ? ""
          : "Status is required.";
        break;
      case "email":
        formErrors.email = validateEmail(value)
          ? ""
          : "Please enter a valid email.";
        break;
      default:
        break;
    }

    setErrors(formErrors);
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((field) => field !== "") &&
      Object.values(errors).every((err) => !err)
    );
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldValue = formData[field];
      validateField(field, fieldValue);

      // If any field has an error, mark the form as invalid
      if (errors[field]) {
        isValid = false;
      }
    });
    if (isValid) {
      if (user) {
        const editProjectData = { ...formData, userId: user.id };
        dispatch(updateProject({ id, projectData: editProjectData })).then(
          () => {
            navigate("/projects");
            showSuccess("Project Edit successful!");
          }
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the entire form on submit
    let formErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldValue = formData[field];
      validateField(field, fieldValue);

      // If any field has an error, mark the form as invalid
      if (errors[field]) {
        isValid = false;
      }
    });

    // Check if form is valid
    if (isValid) {
      if (user) {
        const newProject = { ...formData, userId: user.id };
        dispatch(createProject(newProject)).then(() => {
          navigate("/projects");
          showSuccess("Project Create successful!");
        });
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[3],
        padding: "25px",
        borderRadius: "15px",
        marginTop: "10px",
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={700} mb={2}>
          {currunt ? "Edit Project" : "Create project"}
        </Typography>
      </Box>
      <form>
        <Grid container spacing={3}>
          {/* Customer Name */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
          </Grid>

          {/* Reference Number */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Reference Number"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleInputChange}
              error={!!errors.referenceNumber}
              helperText={errors.referenceNumber}
            />
          </Grid>

          {/* Project Name */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              error={!!errors.projectName}
              helperText={errors.projectName}
            />
          </Grid>

          {/* Project Number */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Project Number"
              name="projectNumber"
              value={formData.projectNumber}
              onChange={handleInputChange}
              error={!!errors.projectNumber}
              helperText={errors.projectNumber}
            />
          </Grid>

          {/* Area Location */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Area Location"
              name="areaLocation"
              value={formData.areaLocation}
              onChange={handleInputChange}
              error={!!errors.areaLocation}
              helperText={errors.areaLocation}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>

          {/* Due Date */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              error={!!errors.dueDate}
              helperText={errors.dueDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              error={!!errors.contact}
              helperText={errors.contact}
            />
          </Grid>

          {/* Manager */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Manager"
              name="manager"
              value={formData.manager}
              onChange={handleInputChange}
              error={!!errors.manager}
              helperText={errors.manager}
            />
          </Grid>

          {/* Staff */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Staff"
              name="staff"
              value={formData.staff}
              onChange={handleInputChange}
              error={!!errors.staff}
              helperText={errors.staff}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={handleInputChange}
                name="status"
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
              <FormHelperText>{errors.status}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              disabled={!isFormValid()}
              onClick={(e) => {
                currunt ? handleEditSubmit(e, currunt.id) : handleSubmit(e);
              }}
            >
              {!currunt ? "Add Project" : "Save Project"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={(e) => {
                setFormData({});
                navigate("/projects");
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateAndEditProjectForm;
