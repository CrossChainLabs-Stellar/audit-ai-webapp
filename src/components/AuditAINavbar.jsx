import React, { useEffect, useState } from "react";
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
  Divider,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import ShieldIcon from "@mui/icons-material/GppGood";
import DescriptionIcon from "@mui/icons-material/Description";

import { isConnected, requestAccess } from "@stellar/freighter-api";
import logoFreighter from "../assets/Logo-freighter.svg";
import menuAudit from "../assets/menu-run-audit.svg";
import menuReports from "../assets/menu-reports.svg";
import menuDisconnect from "../assets/menu-disconnect.svg";
import { BRAND } from "../theme/AppTheme";

export default function AuditAINavbar({
  publicKey,
  onLogin,
  onLogout,
  fixed = true,
  showSpacer = true,
}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const connectionStatus = await isConnected();
      setIsFreighterInstalled(!!connectionStatus?.isConnected);
    })();
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
      onLogin && onLogin(accessObj.address);
    } catch (e) {
      console.error(e);
    }
  };

  const gradientBtnSx = {
    background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})`,
    color: "#fff",
    fontWeight: 800,
    px: 2.5,
    py: 1,
    borderRadius: 2,
    textTransform: "none",
    boxShadow: 6,
    "&:hover": {
      boxShadow: 10,
      transform: "scale(1.03)",
      background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})`,
    },
    transition: "all .2s ease",
  };

  const linkSx = { color: BRAND.text, fontWeight: 600, "&:hover": { color: "#fff" } };

  return (
    <>
      <AppBar
        position={fixed ? "fixed" : "static"}
        elevation={0}
        sx={{
          bgcolor: "rgba(13,12,34,0.80)",
          backdropFilter: "blur(6px)",
          borderBottom: `1px solid ${BRAND.border}`,
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Left: logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                display: "grid",
                placeItems: "center",
              }}
            >
              <ShieldIcon sx={{ color: BRAND.primary }} />
            </Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
              Auditron
            </Typography>
          </Box>
          { }
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <MuiLink component={Link} to="/audit" underline="none" sx={linkSx}>
              Audit Now
            </MuiLink>
            <MuiLink component={Link} to="/dashboard" underline="none" sx={linkSx}>
              Dashboard
            </MuiLink>
            <MuiLink component={Link} to="/about" underline="none" sx={linkSx}>
              About
            </MuiLink>
            <MuiLink component={Link} to="/contact" underline="none" sx={linkSx}>
              Contact
            </MuiLink>
          </Stack>
          { }
          <Stack direction="row" alignItems="center" spacing={1}>
            {publicKey ? (
              <Button
                onClick={() => setUserDrawerOpen(true)}
                endIcon={<ArrowDropDownIcon />}
                sx={{ color: "#fff", fontWeight: 700 }}
              >
                {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
              </Button>
            ) : (
              <Button onClick={handleLogin} sx={gradientBtnSx}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box component="img" src={logoFreighter} alt="Freighter" sx={{ height: 18 }} />
                  <span>Connect</span>
                </Box>
              </Button>
            )}

            {isMobile && (
              <IconButton onClick={() => setNavDrawerOpen(true)} sx={{ color: "#fff", ml: 0.5 }}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {fixed && showSpacer && <Box sx={{ height: 64 }} />}

      {/* Mobile Nav Drawer */}
      <Drawer
        anchor="right"
        open={navDrawerOpen}
        onClose={() => setNavDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: BRAND.dark,
            color: "#fff",
            borderLeft: `1px solid ${BRAND.border}`,
          },
        }}
      >
        <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setNavDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: BRAND.border }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/audit" onClick={() => setNavDrawerOpen(false)}>
              <ListItemIcon>
                <img src={menuAudit} alt="Audit Now" style={{ width: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Audit Now" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={() => setNavDrawerOpen(false)}>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about" onClick={() => setNavDrawerOpen(false)}>
              <ListItemIcon>
                <InfoIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/contact" onClick={() => setNavDrawerOpen(false)}>
              <ListItemIcon>
                <MailIcon sx={{ color: "#fff" }} />
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
        onClose={() => setUserDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            bgcolor: "#111827",
            color: "#fff",
            borderLeft: `1px solid ${BRAND.border}`,
          },
        }}
      >
        <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setUserDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: BRAND.border }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={() => setUserDrawerOpen(false)}>
              <ListItemIcon>
                <img src={menuAudit} alt="Audit Now" style={{ width: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Audit Now" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={() => setUserDrawerOpen(false)}>
              <ListItemIcon>
                <img src={menuReports} alt="View Reports" style={{ width: 22 }} />
              </ListItemIcon>
              <ListItemText primary="View Reports" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onLogout && onLogout();
                setUserDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <img src={menuDisconnect} alt="Disconnect" style={{ width: 20 }} />
              </ListItemIcon>
              <ListItemText primary="Disconnect" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
