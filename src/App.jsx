// src/App.js
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginView from "./sections/login/view/login-view";
import Layout from "./components/Layout/layout";
import RegisterView from "./sections/Register/view/register-view";
import { checkAuthStatus } from "./redux/thunks/authThunk";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import { privateRoutes, publicRoutes } from "./routes/routes";
import ForgetForm from "./sections/Forget/forget-form";

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
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Protected Layout Routes */}
        <Route path="/" element={<Layout />}>
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  {route.component}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
