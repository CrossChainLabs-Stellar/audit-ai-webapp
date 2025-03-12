// AuditAINavbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { isConnected, requestAccess } from "@stellar/freighter-api"; // <-- for Freighter
import logo from "../assets/AuditAILogo.svg";

export default function AuditAINavbar({ publicKey, onLogin }) {
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);

  useEffect(() => {
    // Check if Freighter is installed
    const checkFreighter = async () => {
      const connectionStatus = await isConnected();
      setIsFreighterInstalled(connectionStatus.isConnected);
    };
    checkFreighter();
  }, []);

  const handleLogin = async () => {
    try {
      if (!isFreighterInstalled) {
        alert("Freighter wallet not found. Please install the Freighter extension.");
        return;
      }

      // Request access from Freighter
      const accessObj = await requestAccess();
      if (accessObj.error) {
        alert(`Error: ${accessObj.error}`);
        return;
      }

      // Pass the public key back up to the parent or do any necessary post-login actions
      onLogin(accessObj.address);
    } catch (error) {
      console.error("Stellar wallet connection error: ", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
      <Toolbar>
        {/* Left: Logo and Title */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",   // disables underline
          }}>
          <img
            src={logo}
            alt="Auditron Logo"
            style={{ height: "40px", marginRight: "8px" }}
          />
          <Typography
            variant="h5"
            sx={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Auditron
          </Typography>
        </Box>

        {/* Center: Navigation Buttons (only if publicKey exists) */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {/*publicKey && (
            <Button
              component={Link}
              variant="outlined"
              color="inherit"
              to="/dashboard"
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
          )*/}
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
              variant="outlined"
              color="inherit"
              to="/dashboard"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderColor: "rgba(255, 255, 255, 0.5)",
                "&:hover": { borderColor: "white" },
              }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
