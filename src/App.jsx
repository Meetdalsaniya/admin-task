import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./sections/login/view/login-view";

import DashboardView from "./sections/dashboard/dashboard-view";
import Layout from "./components/Layout/layout";
import ProjectsView from "./sections/project/view/project-view";
import EstimatesView from "./sections/estimates/view/estimates-view";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes for Login and Register */}
        <Route path="/login" element={<LoginView />} />

        {/* Protected Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardView />} />
          <Route index path="/projects" element={<ProjectsView />} />
          <Route index path="/estimates" element={<EstimatesView />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
