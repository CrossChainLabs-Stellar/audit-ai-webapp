import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import SCFLogoBlack from "../assets/SCFLogoSVG-black.svg";
import Client from "../utils/client.js";
import BoltIcon from "@mui/icons-material/Bolt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DescriptionIcon from "@mui/icons-material/Description";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DashboardPreview from "../components/DashboardPreview.jsx";
import TechnologySection from '../components/TechnologySection.jsx'
import { BRAND } from "../theme/AppTheme";
import JoinToStayInformed from "../components/JoinToStayInformed.jsx";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const client = new Client();

  const handleSignup = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!email) {
      setStatusMessage("Please enter an email.");
      return;
    }
    try {
      const response = await client.waitlist(email);
      setStatusMessage(response.message || "Successfully signed up!");
      setEmail("");
    } catch (error) {
      console.error("Waitlist signup error:", error);
      setStatusMessage("Signup failed. Please try again later.");
    }
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, color: "#fff", minHeight: "100vh" }}>
      {/* Dashboard Preview (MacBook mock) -v2*/}

      <DashboardPreview></DashboardPreview>

      {/* CTA / Waitlist */}
      <JoinToStayInformed></JoinToStayInformed>
    </Box>
  );
}
