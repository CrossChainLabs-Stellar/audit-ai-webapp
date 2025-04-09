// AuditAINavbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { isConnected, requestAccess } from "@stellar/freighter-api"; // Freighter
import logo from "../assets/AuditAILogo.svg";
import logoFreighter from "../assets/Logo-freighter.svg";
import menuAudit from "../assets/menu-run-audit.svg";
import menuReports from "../assets/menu-reports.svg";
import menuDisconnect from "../assets/menu-disconnect.svg";

export default function AuditAINavbar({ publicKey, onLogin, onLogout }) {
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Check if Freighter is connected
    const checkFreighter = async () => {
      const connectionStatus = await isConnected();
      setIsFreighterInstalled(connectionStatus.isConnected);
    };
    checkFreighter();
  }, []);

  const handleLogin = async () => {
    try {
      // Check if Freighter is installed
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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDisconnect = () => {
    if (onLogout) onLogout();
    setDrawerOpen(false);
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
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="Auditron Logo"
            style={{ height: "40px", marginRight: "15px", marginLeft: "20px" }}
          />
          <Typography variant="h4" sx={{ textDecoration: "none", color: "white" }}>
            Auditron
          </Typography>
        </Box>

        {/* Center: Placeholder for navigation (if needed) */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}></Box>

        {/* Right: User Info and Drawer Toggle */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {publicKey ? (
            <>
              <Button
                onClick={handleDrawerToggle}
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                  color: "inherit",
                  marginRight: "2px",
                  padding: "6px 12px",
                }}
              >
                {publicKey.slice(0, 2)}...{publicKey.slice(-4)}
                <ArrowDropDownIcon sx={{ marginLeft: "8px" }} />
              </Button>

              {/* Drawer (Sidebar Menu) */}
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: "220px",
                    backgroundColor: "#375e6f",
                    color: "white",
                    paddingTop: "20px",
                  },
                }}
              >
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    alignSelf: "flex-end",
                    marginRight: "10px",
                    color: "white",
                    padding: "4px", // Reduces button size
                    fontSize: "14px", // Ensures a smaller button
                    marginBottom: "20px",
                  }}
                >
                  <CloseIcon sx={{ fontSize: "20px" }} /> {/* Reduces icon size */}
                </IconButton>

                <List>
                  {/* Run Audit */}
                  <ListItem disablePadding>
                    <ListItemButton 
                      component={Link} 
                      to="/dashboard" 
                      onClick={handleDrawerToggle} 
                      sx={{
                      "&:hover": {
                        backgroundColor: "#2c3e50", // Updated hover color
                      },
                    }}>
                      <ListItemIcon>
                        <img src={menuAudit} alt="Run Audit" style={{ width: "26px", marginLeft: "3px" }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "16px"}}>
                            Audit Now
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>

                  {/* My Reports */}
                  <ListItem disablePadding>
                  <ListItemButton 
                      component={Link} 
                      to="/dashboard" 
                      onClick={handleDrawerToggle} 
                      sx={{
                      "&:hover": {
                        backgroundColor: "#2c3e50", // Updated hover color
                      },
                    }}>
                      <ListItemIcon>
                        <img src={menuReports} alt="My Reports" style={{ width: "24px", marginLeft: "2px" }} />
                      </ListItemIcon>
                      <ListItemText primary={
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "16px"}}>
                            View Reports
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>

                  {/* Disconnect */}
                  <ListItem disablePadding>
                    <ListItemButton 
                      onClick={handleDisconnect}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#2c3e50", // Updated hover color
                        },
                      }}>
                      <ListItemIcon>
                        <img src={menuDisconnect} alt="Disconnect" style={{ width: "23px", marginLeft: "5px" }} />
                      </ListItemIcon>
                      <ListItemText primary={
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "16px"}}>
                            Disconnect
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                marginRight: "12px",
                padding: "6px 12px",
              }}
            >
              <img src={logoFreighter} alt="Freighter Logo" style={{ width: "100px" }} />
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
