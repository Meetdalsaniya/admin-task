import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEstimation,
  fetchEstimations,
} from "../../../redux/thunks/estimationThunk";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../../redux/slices/estimationSlice";
import { Iconify } from "../../../components/iconify/iconify";
import { showSuccess } from "../../../utils/toastUtil";

const EstimatesView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { estimations, loading } = useSelector((state) => state.estimations);
  const { user } = useSelector((state) => state.auth);
  console.log(estimations, "===========");

  const handelEdit = (e, id) => {
    e.preventDefault();
    navigate(`/estimates/${id}`);
  };

  const handelDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteEstimation(id)).then(() => {
      navigate("/estimates");
      showSuccess("Estimate Delete successful!");
    });
  };

  useEffect(() => {
    dispatch(fetchEstimations(user.id));
  }, [dispatch]);
  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Typography>Estimates</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/estimates/create")}
            startIcon={<Iconify icon={"ic:sharp-plus"} />}
          >
            Create Estimates
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimations?.map((estimation, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{estimation?.clinetname}</TableCell>
                <TableCell>${estimation?.total}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={(e) => handelEdit(e, estimation.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={(e) => handelDelete(e, estimation.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EstimatesView;
