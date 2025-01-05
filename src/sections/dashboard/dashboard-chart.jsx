import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
const DashboardChart = ({ data, labels }) => {
  const theme = useTheme();
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: data,
        fill: true,
        borderColor: "blue",
        tension: 0.4,
        pointBackgroundColor: "blue",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <Box>
      <Typography variant="h6">Sales Details</Typography>
      <Box
        sx={{
          width: "98%",
          height: "500px",
          backgroundColor: theme.palette.background.default,
          boxShadow: theme.shadows[3],
          padding: "25px",
          borderRadius: "15px",
          marginTop: "10px",
        }}
      >
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default DashboardChart;
