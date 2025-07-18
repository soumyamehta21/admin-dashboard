import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Avatar,
  Badge,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness2 as DarkModeIcon,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleSidebar } from "../redux/slices/themeSlice";
import { useTranslation } from "react-i18next";

export default function Topbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const getLanguageFlag = (lang) => {
    switch (lang) {
      case "en":
        return "https://flagcdn.com/gb.svg";
      case "fr":
        return "https://flagcdn.com/fr.svg";
      case "es":
        return "https://flagcdn.com/es.svg";
      default:
        return "https://flagcdn.com/gb.svg";
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        color: "#000",
        borderBottom: "1px solid",
        borderColor: "background.default",
        px: 3,
        py: 1,
        paddingBottom: 0,
        paddingTop: 0,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton edge="start" size="small" sx={{ ml: 1 }} onClick={handleSidebarToggle}>
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              backgroundColor: "background.dashboard",
              px: 2,
              py: 0.5,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              width: 300,
              border: "1px solid",
              borderColor: "primary.border",
              paddingTop: "2px",
              paddingBottom: "2px",
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: "gray", mr: 1 }} />
            <InputBase placeholder={t("search")} fullWidth />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton>
            <Badge badgeContent={6} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={getLanguageFlag(i18n.language)}
              alt="Flag"
              width={24}
              height={18}
              style={{ borderRadius: 2 }}
            />
            <Select
              variant="standard"
              disableUnderline
              value={i18n.language}
              onChange={handleLanguageChange}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="en">{t("english")}</MenuItem>
              <MenuItem value="fr">{t("french")}</MenuItem>
              <MenuItem value="es">{t("spanish")}</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              alt="Harley"
              src="https://i.pravatar.cc/150?img=15"
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <Typography variant="body2" fontWeight="medium" color="text.main">
                Harley
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t("admin")}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
