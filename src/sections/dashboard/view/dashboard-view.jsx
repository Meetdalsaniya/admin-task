import React from "react";
import DashboardChart from "../dashboard-chart";

const DashboardView = () => {
  const data = [30, 50, 70, 40, 60, 80, 100];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  return (
    <div>
      <DashboardChart data={data} labels={labels} />
    </div>
  );
};

export default DashboardView;
