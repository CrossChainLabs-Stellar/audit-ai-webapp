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
  Stack,
  Link as MuiLink,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import { isConnected, requestAccess } from "@stellar/freighter-api";

import logoAuditron from "../assets/AuditAILogo.svg";
import logoFreighter from "../assets/Logo-freighter.svg";
import menuAudit from "../assets/menu-run-audit.svg";
import menuReports from "../assets/menu-reports.svg";
import menuDisconnect from "../assets/menu-disconnect.svg";
import ShieldIcon from '@mui/icons-material/GppGood';

export default function AuditAINavbar({ publicKey, onLogin, onLogout }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

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
    <AppBar position="static" sx={{ backgroundColor: "grey.50", color: "black" }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
          <Box component={Link} to="/" sx={{ width: 40, height: 40, borderRadius: 2, background: gradient, display: 'grid', placeItems: 'center' }}>
            <ShieldIcon sx={{ color: '#fff' }} />
          </Box>
          <Typography variant="h6" fontWeight={800}>Auditron</Typography>
        </Stack>

        {/* Center Links for Desktop Only */}

        <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <MuiLink component={Link} to="/dashboard" underline="none" color="text.primary" sx={{ '&:hover': { color: '#667eea' }, fontWeight: 600 }}>Dashboard</MuiLink>
          <MuiLink component={Link} to="/dashboard" underline="none" color="text.primary" sx={{ '&:hover': { color: '#667eea' }, fontWeight: 600 }}>Audit Now</MuiLink>
          <MuiLink component={Link} to="/about" underline="none" color="text.primary" sx={{ '&:hover': { color: '#667eea' }, fontWeight: 600 }}>About</MuiLink>
          <MuiLink component={Link} to="/contact" underline="none" color="text.primary" sx={{ '&:hover': { color: '#667eea' }, fontWeight: 600 }}>Contact</MuiLink>
        </Stack>

        {/* Right: Freighter / User + Mobile Menu */}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          {publicKey ? (
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
          ) : (
            <Box sx={{ ml: 2, px: 1.5, py: 0.5, borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 1, background: '#4e0597ff', color: '#fff', fontSize: 13, fontWeight: 700 }}>
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
            </Box>
          )}

          {/* Hamburger Icon (far right) */}
          {isMobile && (
            <IconButton
              onClick={handleNavDrawerToggle}
              sx={{ color: "black", ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Nav Drawer */}
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
