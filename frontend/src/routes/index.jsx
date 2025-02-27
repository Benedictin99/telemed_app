import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Appointments from "../pages/Appointments";
import Consultations from "../pages/Consultations";
import MedicalRecords from "../pages/MedicalRecords";
import AuthSuccess from "../components/google/AuthSuccess";
import Terms from "../components/google/Terms";
import PrivacyPolicy from "../components/google/PrivacyPolicy";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import Discussions from "../pages/Discussions";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      {/* Routes protégées */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route
        path="/consultations"
        element={
          <PrivateRoute>
            <Consultations />
          </PrivateRoute>
        }
      />
      <Route
        path="/discussions"
        element={
          <PrivateRoute>
            <Discussions />
          </PrivateRoute>
        }
      />
      <Route
        path="/medical-records"
        element={
          <PrivateRoute>
            <MedicalRecords />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* Redirection par défaut vers login */}
      <Route path="*" element={<Navigate to="/home" />} />

      {/* Routes Google Auth */}
      <Route path="/auth/success" element={<AuthSuccess />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
};

export default AppRoutes;
