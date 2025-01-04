import React, { useEffect, useState } from "react";
import ProjectFilter from "../projectFilter";
import ProjectTableRow from "../projectTableRow";
import ProjectTableHeader from "../projectTableHeader";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Button,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { applyFilters } from "../../../utils/filterUtil";
import { Iconify } from "../../../components/iconify/iconify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchProjects,
} from "../../../redux/thunks/projectThunk";
import { showSuccess } from "../../../utils/toastUtil";
import { resetState } from "../../../redux/slices/estimationSlice";
import { EmptyState } from "../../../components/EmptyData/emptyData";

const ProjectsView = () => {
  const columns = [
    "projectName",
    "address",
    "areaLocation",
    "contact",
    "status",
    "projectNumber",
    "customerName",
    "dueDate",
    "email",
    "manager",
    "Action",
  ];

  const [filters, setFilters] = useState({
    date: "",
    status: "all",
    columns: [...columns],
  });
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ date: "", status: "all", columns: [...columns] });
  };

  const filteredData = applyFilters(projects, filters);

  const handleEditClick = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteProject(id)).then(() => {
      showSuccess("Project Delete successful!");
    }); // Dispatch delete action
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchProjects(user.id));
      dispatch(resetState()); // Fetch projects for the logged-in user
    }
  }, [user, dispatch]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ProjectFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
          columns={columns}
          setFilters={setFilters}
        />
        <Box>
          <Button
            onClick={() => navigate("/projects/create")}
            variant={"contained"}
            startIcon={<Iconify icon={"ic:sharp-plus"} />}
          >
            Add Project
          </Button>
        </Box>
      </Box>
      {projects == 0 ? (
        <EmptyState height={"66vh"} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <ProjectTableHeader columns={filters.columns} />
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <ProjectTableRow
                  key={index}
                  row={row}
                  columns={filters.columns}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ProjectsView;
