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
  useTheme,
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
import { EmptyState } from "../../../components/EmptyData/emptyData";

const EstimatesView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { estimations, loading } = useSelector((state) => state.estimations);
  const { user } = useSelector((state) => state.auth);
  console.log(estimations);

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
          <Typography fontSize={"1.25rem"}>Estimates</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/estimates/create")}
            startIcon={<Iconify icon={"ic:sharp-plus"} />}
          >
            Create Estimates
          </Button>
        </Box>
      </Box>
      {estimations.length == 0 ? (
        <>
          <EmptyState />
        </>
      ) : (
        <TableContainer
          sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[3],

            borderRadius: "15px",
            marginTop: "10px",
          }}
          component={Paper}
        >
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
                  <TableCell>${Math.round(estimation?.total)}</TableCell>
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
      )}
    </div>
  );
};

export default EstimatesView;
