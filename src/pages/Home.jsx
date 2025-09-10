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
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import ShieldIcon from '@mui/icons-material/GppGood';
import TechnologySection from '../components/TechnologySection.jsx';
import { BRAND } from "../theme/AppTheme";
import JoinToStayInformed from "../components/JoinToStayInformed.jsx";

export default function Home() {
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

  const gradientBtn = {
    background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})`,
    color: "#fff",
    fontWeight: 700,
    px: 3,
    py: 1.25,
    borderRadius: 2,
    boxShadow: 6,
    textTransform: "none",
    "&:hover": {
      boxShadow: 10,
      transform: "scale(1.03)",
      background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})`,
    },
    transition: "all .25s ease",
  };

  const softCard = {
    backgroundColor: "rgba(31, 41, 55, 0.40)",
    border: `1px solid ${BRAND.border}`,
    p: 4,
    borderRadius: 4,
    textAlign: "center",
    transition: "all .25s ease",
    "&:hover": {
      borderColor: BRAND.primary,
      transform: "scale(1.03)",
    },
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 12, md: 16 },
          pb: { xs: 10, md: 14 },
          minHeight: { md: "50rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* animated gradient base */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "linear-gradient(135deg, #0D0C22 0%, #1a1a3d 50%, #0D0C22 100%)",
            animation: "gradient-x 15s ease infinite",
          }}
        />
        {/* radial glows */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage:
              "radial-gradient(circle at top left, rgba(74,0,224,.2) 0%, transparent 30%), radial-gradient(circle at bottom right, rgba(138,43,226,.2) 0%, transparent 30%)",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.1 }}>
            AI-Powered Smart Contract Auditing
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Secure your blockchain projects with lightning-fast, comprehensive, and affordable smart contract audits.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button component={Link} to="/audit" sx={gradientBtn}>
              Audit Now
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              sx={{
                borderColor: "#374151",
                color: "#fff",
                px: 4,
                py: 1.25,
                borderRadius: 2,
                textTransform: "none",
                backgroundColor: "rgba(31,41,55,0.5)",
                backdropFilter: "blur(6px)",
                "&:hover": { backgroundColor: "#374151" },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>


      <DashboardPreview></DashboardPreview>
      {/* Features */}
      <Box sx={{ py: 10, bgcolor: "rgba(13,12,34,0.95)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={softCard}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${BRAND.secondary}, ${BRAND.primary})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 6,
                    }}
                  >
                    <BoltIcon />
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Quick Audits
                </Typography>
                <Typography color="text.secondary">
                  Simply upload your Soroban smart contract and get audited instantly, saving you both time and money with our automated analysis.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={softCard}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${BRAND.secondary}, ${BRAND.primary})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 6,
                    }}
                  >
                    <ShowChartIcon />
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Real-Time Progress
                </Typography>
                <Typography color="text.secondary">
                  View audit progress as it happens and detect vulnerabilities on the fly, ensuring your smart contracts deploy faster and safer.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={softCard}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${BRAND.secondary}, ${BRAND.primary})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 6,
                    }}
                  >
                    <DescriptionIcon />
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Detailed Reports
                </Typography>
                <Typography color="text.secondary">
                  Receive clear, AI-powered reports that highlight security issues, optimization tips, and best practice recommendations.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Technology */}
      <TechnologySection></TechnologySection>

      {/* SCF Award */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              mb: 2,
              borderRadius: "999px",
              bgcolor: "rgba(31,41,55,0.5)",
              border: "1px solid #374151",
            }}
          >
            <MilitaryTechIcon sx={{ fontSize: 36, color: "#F59E0B" }} />
          </Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Winner of the SCF Kickstart Award
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            We're proud to be recognized for our dedication to top-tier security and innovation in the Soroban ecosystem.
          </Typography>
          <MuiLink
            href="https://communityfund.stellar.org/project/auditai-lv1"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            <Box component="img" src={SCFLogoBlack} alt="SCF Kickstart Award" sx={{ width: 96, height: "auto" }} />
          </MuiLink>
        </Container>
      </Box>

      {/* CTA / Waitlist */}
      <JoinToStayInformed></JoinToStayInformed>
    </Box>
  );
}
