import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

const lightPalette = {
  mode: "light",
  text: {
    main: "#202224",
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
};

const darkPalette = {
  mode: "dark",
  text: {
    main: "#ffffff",
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
};
export default function CustomThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);
  const theme = createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
