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
import { useTranslation } from "react-i18next";

const navItems = [
  {
    label: "dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/dashboard",
    paths: ["/dashboard", "/"],
  },
  {
    label: "projects",
    icon: <GridView fontSize="small" />,
    path: "/projects",
    paths: ["/projects", "/projects/add", "/projects/edit/:id"],
  },
  {
    label: "estimates",
    icon: <RequestQuote fontSize="small" />,
    path: "/estimations",
    paths: ["/estimations", "/estimations/add", "/estimations/edit/:id"],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
            const isActive =
              item.paths.includes(location.pathname) ||
              (item.path === "/projects" &&
                location.pathname.startsWith("/projects/edit/")) || 
              (item.path === "/estimations" &&
                location.pathname.startsWith("/estimations/edit/"));

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
                      backgroundColor: isActive
                        ? "primary.main"
                        : "transparent",
                      color: isActive ? "white" : "text.primary",
                      borderRadius: "8px",
                      mx: 2,
                      mb: 0.5,
                      "&:hover": {
                        backgroundColor: isActive
                          ? "primary.main"
                          : "action.hover",
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
                      <Box display={"flex"}>{t(item.label)}</Box>
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
              <ListItemText primary={t("logout")} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
}
