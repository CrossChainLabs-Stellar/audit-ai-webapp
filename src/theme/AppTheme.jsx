import React from "react";
import { createTheme, ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";

// Inter font (optional but recommended to match design)
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

export const BRAND = {
  primary: "#8A2BE2",
  secondary: "#4A00E0",
  dark: "#0D0C22",
  light: "#F5F3FF",
  gray: "#E0E0E0",
  text: "#A0AEC0",
  border: "#1f2937",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: BRAND.primary },
    secondary: { main: BRAND.secondary },
    background: { default: BRAND.dark, paper: "#111827" },
    text: { primary: "#FFFFFF", secondary: BRAND.text },
    divider: BRAND.border,
  },
  typography: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 16, fontWeight: 700 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(31, 41, 55, 0.40)",
          border: `1px solid ${BRAND.border}`,
          backdropFilter: "blur(4px)",
        },
      },
    },
  },
});

export default function AppTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body, #root": { height: "100%" },
          body: { fontFamily: "Inter, sans-serif !important", backgroundColor: BRAND.dark },
          "::-webkit-scrollbar": { display: "none" },
          html: { msOverflowStyle: "none", scrollbarWidth: "none" },
          ":root": {
            "--brand-primary": BRAND.primary,
            "--brand-secondary": BRAND.secondary,
            "--brand-dark": BRAND.dark,
            "--brand-light": BRAND.light,
            "--brand-gray": BRAND.gray,
            "--brand-text": BRAND.text,
          },
          "@keyframes gradient-x": {
            "0%, 100%": { backgroundSize: "200% 200%", backgroundPosition: "left center" },
            "50%": { backgroundSize: "200% 200%", backgroundPosition: "right center" },
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
