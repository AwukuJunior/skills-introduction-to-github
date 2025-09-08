import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ProtectedLayout from "./layout/ProtectedLayout"; // Using the new layout component
import Transactions from "./components/Transactions";
import Analytics from "./components/Analytics";
import Tips from "./components/Tips";
import Settings from "./components/Settings";
import SavingGoals from "./components/SavingGoals";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/homepage" element={<ProtectedLayout />}>
          {/* Nested routes will render inside the Outlet in Homepage.jsx */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="tips" element={<Tips />} />
          <Route path="settings" element={<Settings />} />
          <Route path="savingGoals" element={<SavingGoals />} />
          {/* Default to dashboard */}
          <Route index element={<Navigate to="/homepage/dashboard" replace />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
