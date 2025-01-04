import { Box, Typography } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
const DashboardChart = ({ data, labels }) => {
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
      <Box sx={{ width: "100%", height: "550px" }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default DashboardChart;
