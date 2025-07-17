import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  GridView,
  RequestQuote,
  Logout,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/dashboard",
    paths: ["/dashboard", "/"],
  },
  {
    label: "Projects",
    icon: <GridView fontSize="small" />,
    path: "/projects",
    paths: ["/projects"],
  },
  {
    label: "Estimates",
    icon: <RequestQuote fontSize="small" />,
    path: "/estimations",
    paths: ["/estimations"],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "background.default",
          borderRight: "1px solid",
          borderColor: "background.default",
          paddingTop: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ px: 3, mb: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            style={{ justifyContent: "center", display: "flex" }}
          >
            LO
            <Box component="span" sx={{ color: "primary.main" }}>
              GO
            </Box>
          </Typography>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => {
            const isActive = item.paths.includes(location.pathname);

            return (
              <ListItem key={item.label} disablePadding>
                <NavLink
                  to={item.path}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListItemButton
                    sx={{
                      mx: 1.5,
                      my: 0.5,
                      marginLeft: 0,
                      marginRight: "24px",
                      borderRadius: "8px",
                      borderBottomLeftRadius: 0,
                      borderTopLeftRadius: 0,
                      backgroundColor: isActive
                        ? "primary.main"
                        : "transparent",
                      color: isActive ? "#fff" : "text.main",
                      position: "relative",
                      overflow: "hidden",
                      pl: 2.5,
                      "&:hover": {
                        backgroundColor: isActive
                          ? "primary.main"
                          : "rgba(72, 128, 255, 0.08)",
                        color: isActive ? "#fff" : "primary.main",
                        "& .MuiListItemIcon-root": {
                          color: isActive ? "#fff" : "primary.main",
                        },
                      },
                      "&:before": isActive
                        ? {
                            content: "''",
                            position: "absolute",
                            left: 8,
                            top: 0,
                            height: "100%",
                            width: 10,
                            backgroundColor: "background.default",
                          }
                        : {},
                      "& .MuiListItemIcon-root": {
                        color: isActive ? "#fff" : "#000",
                      },
                    }}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      paddingLeft="16px"
                      gap={"12px"}
                    >
                      <Box display={"flex"}>{item.icon}</Box>
                      <Box display={"flex"}>{item.label}</Box>
                    </Box>
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          })}
        </List>

        <Divider />

        <Box sx={{ p: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(logout());
                alert("Logged out");
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
}
