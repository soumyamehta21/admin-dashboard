import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

const lightPalette = {
  mode: "light",
  text: {
    main: "#202224",
    secondary: "#6b7280",
  },
  primary: {
    main: "#4880ff",
    secondary: "#3a6fcc",
    border: "#d5d5d5",
  },
  background: {
    default: "#ffffff",
    dashboard: "#f5f6fa",
    paper: "#fff",
  },
  success: {
    main: "#10b981",
  },
  error: {
    main: "#ef4444",
  },
  divider: "#e5e7eb",
};

const darkPalette = {
  mode: "dark",
  text: {
    main: "#ffffff",
    secondary: "#9ca3af",
  },
  primary: {
    main: "#4880ff",
    secondary: "#3a6fcc",
    border: "#cfcfcf",
  },
  background: {
    default: "#273142",
    paper: "#1e1e1e",
    dashboard: "#1b2431",
  },
  success: {
    main: "#10b981",
  },
  error: {
    main: "#ef4444",
  },
  divider: "#374151",
};

export default function CustomThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);
  const theme = createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            backgroundColor: "transparent",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
