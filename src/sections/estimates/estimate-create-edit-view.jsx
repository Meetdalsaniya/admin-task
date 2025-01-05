import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../utils/helpersUtil";
import EstimatesItemRow from "./estimates-item-row";
import {
  createEstimation,
  updateEstimation,
} from "../../redux/thunks/estimationThunk";
import { showSuccess } from "../../utils/toastUtil";
import { Iconify } from "../../components/iconify/iconify";

const EstimatesCreateEditView = ({ current }) => {
  const initialItem = {
    title: "",
    description: "",
    unit: "",
    quantity: 0,
    price: 0,
    margin: 0,
  };

  const initialSection = {
    title: "New Section",
    items: [initialItem],
  };

  const [sections, setSections] = useState([initialSection]);
  const [totals, setTotals] = useState({
    subTotal: 0,
    totalMargin: 0,
    totalAmount: 0,
  });
  const [clinetname, setClinetName] = useState("");

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (current) {
      setSections(current.sections || [initialSection]);
      setClinetName(current.clinetname);
    }
  }, [current]);

  useEffect(() => {
    const newTotals = sections.reduce(
      (acc, section) => {
        const sectionTotals = calculateTotals(section.items);
        acc.subTotal += parseFloat(sectionTotals.subTotal);
        acc.totalMargin += parseFloat(sectionTotals.totalMargin);
        acc.totalAmount += parseFloat(sectionTotals.totalAmount);
        return acc;
      },
      { subTotal: 0, totalMargin: 0, totalAmount: 0 }
    );
    setTotals(newTotals);
  }, [sections]);

  const handleSectionAdd = () => {
    setSections([...sections, { ...initialSection }]);
  };

  const handleItemAdd = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.push({ ...initialItem });
    setSections(updatedSections);
  };

  const handleItemRemove = (sectionIndex, itemIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(updatedSections);
  };

  const handleChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items[itemIndex][field] = value;
    setSections(updatedSections);
  };

  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    const totalEstimate = sections.reduce((acc, section) => {
      const sectionTotals = calculateTotals(section.items);
      return acc + parseFloat(sectionTotals.totalAmount);
    }, 0);
    const editData = {
      sections,
      userId: user.id,
      clinetname: clinetname,
      total: totalEstimate,
    };
    const response = await dispatch(
      updateEstimation({
        id: current.id,
        sections: editData,
      })
    ).then(() => {
      navigate("/estimates");
      showSuccess("estimate Edit successful!");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalEstimate = sections.reduce((acc, section) => {
      const sectionTotals = calculateTotals(section.items);
      return acc + parseFloat(sectionTotals.totalAmount);
    }, 0);
    const response = await dispatch(
      createEstimation({
        sections,
        userId: user.id,
        clinetname: clinetname,
        total: totalEstimate,
      })
    ).then(() => {
      navigate("/estimates");
      showSuccess("estimate Create successful!");
    });
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Estimation Module
      </Typography>
      <Box>
        <TextField
          label="Clint Name"
          value={clinetname}
          sx={{ marginBottom: "10px" }}
          onChange={(e) => {
            setClinetName(e.target.value);
          }}
        />
      </Box>
      {sections.map((section, sectionIndex) => {
        // const sectionTotal = calculateTotal(section.items);
        const sectionTotal = calculateTotals(section.items);
        return (
          <Paper
            key={sectionIndex}
            sx={{
              backgroundColor: theme.palette.background.default,
              boxShadow: theme.shadows[3],
              padding: "25px",
              borderRadius: "15px",
              marginTop: "10px",
            }}
            style={{ padding: 20, marginBottom: 20 }}
          >
            <Grid2 container justifyContent="space-between" alignItems="center">
              <Grid2>
                <TextField
                  label="Section Title"
                  value={section.title}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[sectionIndex].title = e.target.value;
                    setSections(updatedSections);
                  }}
                  fullWidth
                />
              </Grid2>
              <Grid2>
                <Typography variant="h6">
                  ${sectionTotal.totalAmount}
                </Typography>
              </Grid2>
            </Grid2>
            <Box>
              {section.items.map((item, itemIndex) => (
                <EstimatesItemRow
                  key={itemIndex}
                  item={item}
                  sectionIndex={sectionIndex}
                  itemIndex={itemIndex}
                  handleChange={handleChange}
                  handleItemRemove={handleItemRemove}
                />
              ))}
            </Box>
            <Button
              sx={{ marginTop: "12px" }}
              startIcon={<Iconify icon={"stash:plus-duotone"} />}
              onClick={() => handleItemAdd(sectionIndex)}
            >
              Add Item
            </Button>
          </Paper>
        );
      })}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginTop: "12px" }}>
              Sub Total:
            </Typography>
            <Typography>${totals.subTotal.toFixed(2)}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginTop: "12px" }}>
              Total Margin:
            </Typography>
            <Typography>${totals.totalMargin.toFixed(2)}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginTop: "12px" }}>
              Total Amount:
            </Typography>
            <Typography>${totals.totalAmount.toFixed(2)}</Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: "18px" }}>
          <Button
            startIcon={<Iconify icon={"stash:plus-duotone"} />}
            onClick={handleSectionAdd}
            variant="outlined"
          >
            Add Section
          </Button>
          <Button
            onClick={(e) => {
              !current ? handleSubmit(e) : handleChangeSubmit(e);
            }}
            variant="contained"
            color="primary"
            style={{ marginLeft: 20 }}
          >
            {!current ? "Add Estimate" : "Save Change"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EstimatesCreateEditView;
