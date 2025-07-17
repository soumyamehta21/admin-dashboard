import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

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
        path="/estimations"
        element={
          <ProtectedRoute dynamicPath={"/login"}>
            <Dashboard>
              <div>Estimates Page - Coming Soon</div>
            </Dashboard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
