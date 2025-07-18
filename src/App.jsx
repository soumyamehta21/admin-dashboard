import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoutes";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Estimates from "./pages/Estimates";
import AddEstimate from "./pages/AddEstimate";
import EditEstimate from "./pages/EditEstimate";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <Projects />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/add"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <AddProject />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/edit/:id"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <EditProject />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estimations"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <Estimates />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estimations/add"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <AddEstimate />
            </Dashboard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estimations/edit/:id"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <EditEstimate />
            </Dashboard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
