import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Estimates from "./pages/Estimates";
import AddEstimate from "./pages/AddEstimate";

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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
    </Routes>
  );
}

export default App;
