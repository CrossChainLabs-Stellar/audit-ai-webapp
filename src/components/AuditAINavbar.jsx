import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/AuditAILogo.svg"; // Update the path to match your project structure

export default function AuditAINavbar({ publicKey }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2c3e50", // A dark, professional background
      }}
    >
      <Toolbar>
        {/* Left: Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="AuditAI Logo"
            style={{ height: "40px", marginRight: "8px" }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            AuditAI
          </Typography>
        </Box>

        {/* Center: Navigation Buttons (only if publicKey exists) */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {publicKey && (
            <>
              <Button
                component={Link}
                to="/dashboard"
                variant="outlined"
                color="inherit"
                sx={{
                  marginLeft: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": { borderColor: "white" },
                }}
              >
                My reports
              </Button>
            </>
          )}
        </Box>

        {/* Right: Display publicKey or Login button */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {publicKey ? (
            <Typography
              variant="body1"
              sx={{
                marginLeft: 2,
                color: "inherit",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              {publicKey.slice(0, 6)}...{publicKey.slice(-6)}
            </Typography>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderColor: "rgba(255, 255, 255, 0.5)",
                "&:hover": { borderColor: "white" },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
