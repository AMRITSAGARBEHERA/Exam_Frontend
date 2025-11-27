// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Register";
import CandidateDashboard from "./pages/Dashboard/CandidateDashboard";
import ResultsPage from "./pages/Dashboard/Activity";
import Dashboard from "./pages/Dashboard";
import ExamResults from "./pages/Exams/ExamResults";
import ProtectedRoute from "./components/ProtectedRoute";
import ExamInterface from "./pages/Exams/ExamInterface";
import DummyPaymentPage from "./pages/DummyPaymentPage";
import ResetPassword from "./pages/Authentication/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Candidate Routes */}
        <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/dummy-payment" element={<DummyPaymentPage />} />
          <Route path="/exam/:id/:mode?" element={<ExamInterface />} />
          <Route path="/activity" element={<ResultsPage />} />


          <Route path="/result/:id" element={<ExamResults />} />

          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={
            <div className="text-center mt-5">
              <h3 className="text-danger">Access Denied 🚫</h3>
              <p>You don’t have permission to view this page.</p>
            </div>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
  );
}

export default App;
