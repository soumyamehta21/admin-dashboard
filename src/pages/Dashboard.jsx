import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardContent from "./DashboardContent";

export default function Dashboard({ children }) {
  const sidebarOpen = useSelector((state) => state.theme.sidebarOpen);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: sidebarOpen ? "calc(100vw - 240px)" : "100vw",
          transition: "width 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <Topbar />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
            backgroundColor: "background.dashboard",
            height: "calc(100vh - 64px)",
          }}
        >
          {children || <DashboardContent />}
        </Box>
      </Box>
    </Box>
  );
}
