// src/components/AuditAINavbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function AuditAINavbar({ publicKey }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2c3e50", // A dark, professional background
      }}
    >
      <Toolbar>
        {/* Left: Title */}
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
                to="/upload"
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
                Upload Contract
              </Button>
              <Button
                component={Link}
                to="/audit"
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
                Audit Progress
              </Button>
              <Button
                component={Link}
                to="/results"
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
                Results
              </Button>
            </>
          )}
        </Box>

        {/* Right: If publicKey exists, display it; else show the Login button */}
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
