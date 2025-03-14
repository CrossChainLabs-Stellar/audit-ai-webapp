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
import menuAudit from "../assets/menu-run-audit.svg";
import menuReports from "../assets/menu-reports.svg";
import menuDisconnect from "../assets/menu-disconnect.svg";

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
                  marginRight: "20px", // Added marginRight
                  padding: "6px 12px", // Added padding
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
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#375e6f",
                    borderRadius: "8px",
                    marginTop: "16px",
                    width: "160px", // Set custom width
                    border: "1px solid rgba(255, 255, 255, 0.1)", // Very subtle border
                    boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.1)", // Lighter, shallower glow
                    marginLeft: "-6px", // Moves the menu exactly 6px left
                  },
                  "& .MuiMenu-list": {
                    padding: 0, // Remove extra padding inside the menu
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    gap: 1,
                    minHeight: "40px", // Increased height
                    padding: "14px 16px", // Adjust padding while keeping text centered
                    boxShadow: "0px 1px 1px rgba(255, 255, 255, 0.1)", // Glow between items
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "#2c3e50",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#2c3e50", // Removes unwanted highlight on selection
                    },
                  }}
                >
                  <img
                    src={menuAudit}
                    alt="Disconnect"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Run Audit
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    gap: 1,
                    minHeight: "40px", // Increased height
                    padding: "14px 16px", // Adjust padding while keeping text centered
                    boxShadow: "0px 1px 5px rgba(255, 255, 255, 0.1)", // Glow between items
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "#2c3e50",
                    },
                  }}
                >
                  <img
                    src={menuReports}
                    alt="Disconnect"
                    style={{ width: "20px", height: "20px" }}
                  />
                  My Reports
                </MenuItem>

                <MenuItem
                  onClick={handleDisconnect}
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    gap: 0.8,
                    minHeight: "40px", // Increased height
                    padding: "14px 16px", // Adjust padding while keeping text centered
                    boxShadow: "0px 1px 5px rgba(255, 255, 255, 0.1)", // Glow between items
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "#2c3e50",
                    },
                  }}
                >
                  <img
                    src={menuDisconnect}
                    alt="Disconnect"
                    style={{ marginLeft: "2px", width: "20px", height: "20px" }}
                  />
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
                display: "flex",
                alignItems: "center",
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
