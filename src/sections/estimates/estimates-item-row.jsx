import { Grid2, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { Iconify } from "../../components/iconify/iconify";

const EstimatesItemRow = ({
  item,
  sectionIndex,
  itemIndex,
  handleChange,
  handleItemRemove,
}) => {
  const itemTotal = item.quantity * item.price * (1 + item.margin / 100);

  return (
    <Grid2 container spacing={2} alignItems="center" sx={{ marginTop: "16px" }}>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <TextField
          label="Title"
          value={item.title}
          onChange={(e) =>
            handleChange(sectionIndex, itemIndex, "title", e.target.value)
          }
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <TextField
          label="Description"
          value={item.description}
          onChange={(e) =>
            handleChange(sectionIndex, itemIndex, "description", e.target.value)
          }
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1 }}>
        <TextField
          label="Unit"
          value={item.unit}
          onChange={(e) =>
            handleChange(sectionIndex, itemIndex, "unit", e.target.value)
          }
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1 }}>
        <TextField
          label="Quantity"
          type="number"
          value={item.quantity}
          onChange={(e) =>
            handleChange(
              sectionIndex,
              itemIndex,
              "quantity",
              parseFloat(e.target.value) || 0
            )
          }
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <TextField
          label="Price"
          type="number"
          value={item.price}
          onChange={(e) =>
            handleChange(
              sectionIndex,
              itemIndex,
              "price",
              parseFloat(e.target.value) || 0
            )
          }
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1 }}>
        <TextField
          label="Margin %"
          type="number"
          value={item.margin}
          onChange={(e) =>
            handleChange(
              sectionIndex,
              itemIndex,
              "margin",
              parseFloat(e.target.value) || 0
            )
          }
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <Typography variant="body1" align="right">
          {itemTotal.toFixed(2)}
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 6, md: 3, lg: 1 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <IconButton
          onClick={() => handleItemRemove(sectionIndex, itemIndex)}
          color="error"
        >
          <Iconify icon={"typcn:minus"} />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};

export default EstimatesItemRow;
