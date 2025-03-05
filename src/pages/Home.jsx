// src/pages/Home.js
import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  // Common card styling to ensure equal height
  const cardStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    p: 2,
    boxShadow: 3,
    transition: "transform 0.3s",
    minHeight: 180, // set a minimum height for all cards
    "&:hover": { transform: "translateY(-5px)" },
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          width: "100vw",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)", // professional dark blue-teal gradient
          color: "#fff",
          textAlign: "center",
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome to AuditAI
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Your Automated Smart Contract Audit Platform
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#f4f4f4", // clean, light gray background for a professional look
          width: "100vw",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={cardStyles}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Quick Audits
                  </Typography>
                  <Typography variant="body2">
                    Upload your Soroban smart contract and get a detailed analysis in minutes—saving you time and headaches.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={cardStyles}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Real-Time Progress
                  </Typography>
                  <Typography variant="body2">
                    View audit progress as it happens. We’ll notify you when your contract analysis is complete.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={cardStyles}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Detailed Findings
                  </Typography>
                  <Typography variant="body2">
                    Receive easy-to-understand reports outlining security issues, optimizations, and best-practice recommendations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
