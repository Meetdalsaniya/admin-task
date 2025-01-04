// src/App.js
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginView from "./sections/login/view/login-view";
import Layout from "./components/Layout/layout";
import ProjectsView from "./sections/project/view/project-view";
import EstimatesView from "./sections/estimates/view/estimates-view";
import RegisterView from "./sections/Register/view/register-view";
import { checkAuthStatus } from "./redux/thunks/authThunk";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import PrivateRoute from "./routes/privateRoute";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check the user's authentication status when the app loads
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes for Login and Register */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />

        {/* Protected Layout Routes */}
        <Route path="/" element={<Layout />}>
          {PrivateRoute.map((e, index) => {
            return (
              <Route
                key={index}
                path={e.path}
                element={<ProtectedRoute>{e.component}</ProtectedRoute>}
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
