import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "calc(100vw - 240px)",
        }}
      >
        <Topbar />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
            backgroundColor: "background.dashboard",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
