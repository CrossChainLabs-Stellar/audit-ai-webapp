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
  useMediaQuery,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import { isConnected, requestAccess } from "@stellar/freighter-api";

import logo from "../assets/AuditAILogo.svg";
import logoFreighter from "../assets/Logo-freighter.svg";
import menuAudit from "../assets/menu-run-audit.svg";
import menuReports from "../assets/menu-reports.svg";
import menuDisconnect from "../assets/menu-disconnect.svg";

export default function AuditAINavbar({ publicKey, onLogin, onLogout }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  useEffect(() => {
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

      const accessObj = await requestAccess();
      if (accessObj.error) {
        alert(`Error: ${accessObj.error}`);
        return;
      }

      onLogin(accessObj.address);
    } catch (error) {
      console.error("Stellar wallet connection error: ", error);
    }
  };

  const handleUserDrawerToggle = () => {
    setUserDrawerOpen(!userDrawerOpen);
  };

  const handleNavDrawerToggle = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const handleDisconnect = () => {
    if (onLogout) onLogout();
    setUserDrawerOpen(false);
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
            mr: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Auditron Logo"
            sx={{
              height: { xs: 30, md: 40 },
              mr: { xs: 1, md: 2 },
              ml: { xs: 1, md: 2 },
            }}
          />
          <Typography
            variant="h4"
            sx={{
              textDecoration: "none",
              color: "white",
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            Auditron
          </Typography>
        </Box>

        {/* Center Links for Desktop Only */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Button component={Link} to="/dashboard" sx={{ color: "#e0e0e0", fontWeight: 600, fontSize: "17px", textTransform: "none" }}>
            Audit Now
          </Button>
          <Button component={Link} to="/about" sx={{ color: "#e0e0e0", fontWeight: 600, fontSize: "17px", textTransform: "none" }}>
            About
          </Button>
          <Button component={Link} to="/contact" sx={{ color: "#e0e0e0", fontWeight: 600, fontSize: "17px", textTransform: "none" }}>
            Contact
          </Button>
        </Box>

        {/* Right: Login/User + Mobile Menu */}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          {publicKey ? (
            <>
              <Button
                onClick={handleUserDrawerToggle}
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                  color: "inherit",
                  marginRight: "4px",
                  padding: "6px 12px",
                }}
              >
                {publicKey.slice(0, 2)}...{publicKey.slice(-4)}
                <ArrowDropDownIcon sx={{ marginLeft: "8px" }} />
              </Button>
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
                padding: "6px 12px",
              }}
            >
              <img src={logoFreighter} alt="Freighter Logo" style={{ width: "100px" }} />
            </Button>
          )}

          {/* Hamburger Icon (far right) */}
          {isMobile && (
            <IconButton
              onClick={handleNavDrawerToggle}
              sx={{ color: "white", ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Nav Drawer (right side) */}
      <Drawer
        anchor="right"
        open={navDrawerOpen}
        onClose={handleNavDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "200px",
            backgroundColor: "#2c3e50",
            color: "white",
            paddingTop: "20px",
          },
        }}
      >
        <IconButton
          onClick={handleNavDrawerToggle}
          sx={{
            alignSelf: "flex-end",
            marginRight: "10px",
            color: "white",
            padding: "4px",
            marginBottom: "20px",
          }}
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={handleNavDrawerToggle}>
              <ListItemIcon>
                <img src={menuAudit} alt="Audit Now" style={{ width: "26px", marginLeft: "2px" }} />
              </ListItemIcon>
              <ListItemText primary="Audit Now" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about" onClick={handleNavDrawerToggle}>
              <ListItemIcon>
                <InfoIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/contact" onClick={handleNavDrawerToggle}>
              <ListItemIcon>
                <MailIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* User Drawer */}
      <Drawer
        anchor="right"
        open={userDrawerOpen}
        onClose={handleUserDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "180px", md: "220px" },
            backgroundColor: "#375e6f",
            color: "white",
            paddingTop: "20px",
          },
        }}
      >
        <IconButton
          onClick={handleUserDrawerToggle}
          sx={{
            alignSelf: "flex-end",
            marginRight: "10px",
            color: "white",
            padding: "4px",
            marginBottom: "20px",
          }}
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={handleUserDrawerToggle}>
              <ListItemIcon>
                <img src={menuAudit} alt="Audit Now" style={{ width: "26px", marginLeft: "3px" }} />
              </ListItemIcon>
              <ListItemText primary="Audit Now" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={handleUserDrawerToggle}>
              <ListItemIcon>
                <img src={menuReports} alt="My Reports" style={{ width: "24px", marginLeft: "2px" }} />
              </ListItemIcon>
              <ListItemText primary="View Reports" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleDisconnect}>
              <ListItemIcon>
                <img src={menuDisconnect} alt="Disconnect" style={{ width: "23px", marginLeft: "5px" }} />
              </ListItemIcon>
              <ListItemText primary="Disconnect" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
