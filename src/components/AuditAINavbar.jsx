// AuditAINavbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { isConnected, requestAccess } from "@stellar/freighter-api"; // <-- for Freighter
import logo from "../assets/AuditAILogo.svg";
import logoFreighter from "../assets/Logo-freighter.svg";

export default function AuditAINavbar({ publicKey, onLogin, onLogout }) {
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    // Implement disconnect logic here.
    if (onLogout) onLogout();
    handleMenuClose();
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
            style={{ height: "40px", marginRight: "15px", marginLeft: "20px" }}
          />
          <Typography
            variant="h4"
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

        {/* Right: Display dropdown menu if publicKey exists */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {publicKey ? (
            <>
              <Button
                onClick={handleMenuOpen}
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  color: "inherit",
                }}
              >
                {publicKey.slice(0, 2)}...{publicKey.slice(-4)}
                <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                  Run Audit
                </MenuItem>
                <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                  My Reports
                </MenuItem>
                <MenuItem onClick={handleDisconnect}>
                  Disconnect
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              color="inherit"
              to="/dashboard"
              sx={{
                textTransform: "none",
                fontSize: "14px",
                //borderColor: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                //gap: 1, // Adds spacing between the logo and text
                //"&:hover": { borderColor: "#533ABB" },
                marginRight: "20px",
                padding: "6px 12px",
              }}
            >
              <img 
                src={logoFreighter}
                alt="Freighter Logo" 
                style={{ width: "100px"}} 
              />
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
