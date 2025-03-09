import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
  TextField
} from "@mui/material";
import { Link } from "react-router-dom";
import { X, LinkedIn, Telegram, GitHub } from '@mui/icons-material';
import SCFLogoBlack from '../assets/SCFLogoSVG-black.svg';

export default function Home() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSignup = async () => {
    if (!email) {
      setStatusMessage('Please enter an email.');
      return;
    }
    setStatusMessage('Done.');
  };

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
          background: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
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
            to="/dashboard"
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

      {/* SCF Kickstart Award Section */}
      <Box sx={{ py: 4, backgroundColor: "#ffffff", textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Proud Winner of the SCF Kickstart Award
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We’re honored to be recognized for our dedication to top-tier security and innovation in the Soroban ecosystem.
          </Typography>

          <a href="https://communityfund.stellar.org/kickstart" target="_blank" rel="noopener noreferrer">
            <Box
              component="img"
              src={SCFLogoBlack}
              alt="SCF Kickstart Award"
              sx={{
                maxWidth: "6rem",
                width: "100%",
                height: "auto",
                mb: 4,
              }}
            />
          </a>

          {/* Demo Video Section */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Demo Video: See AuditAI in Action
          </Typography>
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%", // 16:9 aspect ratio
              mb: 4,
            }}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/VIDEO_ID" 
              title="Audit AI Demo Video"
              frameBorder="0"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#f4f4f4",
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

          {/* Waiting List Section */}
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              marginBottom: '3rem',
              marginTop: '3rem',
            }}
            spacing={2}
          >
            <Typography variant="h5" sx={{ color: '#6ca4a4' }}>
              Join the Waiting List
            </Typography>
            <Typography variant="body1" align="center" sx={{ maxWidth: '30rem', marginBottom: '1rem' }}>
              Be the first to know when AuditAI launches. Sign up below and we’ll keep you updated.
            </Typography>
            <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '20rem' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignup}
                sx={{
                  backgroundColor: '#6ca4a4',
                  ':hover': {
                    backgroundColor: '#5c9292',
                  }
                }}
              >
                Sign Up
              </Button>
            </Stack>
            {statusMessage && <Typography variant="body2" color="text.secondary">{statusMessage}</Typography>}
          </Stack>

          {/* Socials Section */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Link to="https://x.com">
              <X sx={{ fontSize: 32, color: '#000000' }} />
            </Link>
            <Link to="https://www.linkedin.com">
              <LinkedIn sx={{ fontSize: 32, color: '#0A66C2' }} />
            </Link>
            <Link to="https://telegram.org">
              <Telegram sx={{ fontSize: 32, color: '#000000' }} />
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
