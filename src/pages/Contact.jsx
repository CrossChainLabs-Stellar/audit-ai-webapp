import React, { useState } from "react";
import { Container, Typography, Button, Box, Stack, TextField, Link } from "@mui/material";
import { X, LinkedIn } from "@mui/icons-material";
import Client from "../utils/client.js";

export default function Contact() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const client = new Client();

  const handleSignup = async () => {
    if (!email) {
      setStatusMessage('Please enter an email.');
      return;
    }
    try {
      const response = await client.waitlist(email);
      setStatusMessage(response.message || "Successfully signed up!");
    } catch (error) {
      console.error("Waitlist signup error:", error);
      setStatusMessage("Signup failed. Please try again later.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f4f4", py: 4 }}>
      <Container maxWidth="md">
        {/* Hero Section */}
        <Typography variant="h3" align="center" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          We'd love to hear from you. Whether you have a question, feedback, or want to join our waiting list, get in touch!
        </Typography>
        
        {/* Join Waiting List Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" sx={{ color: "#6ca4a4", mb: 2 }}>
            Join the Waiting List
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: "30rem", mx: "auto", mb: 2 }}>
            Be the first to know when Auditron launches. Sign up below and we’ll keep you updated.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
            <TextField
              label="Email Address"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "20rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              sx={{
                backgroundColor: "#6ca4a4",
                ":hover": {
                  backgroundColor: "#5c9292",
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
          {statusMessage && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {statusMessage}
            </Typography>
          )}
        </Box>

        {/* Socials Section */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Connect Socials:
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" color="inherit">
              <X sx={{ fontSize: 32, color: "#000000" }} />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" color="inherit">
              <LinkedIn sx={{ fontSize: 32, color: "#0A66C2" }} />
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
