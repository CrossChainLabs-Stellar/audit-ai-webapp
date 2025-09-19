// src/components/JoinToStayInformed.jsx
import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { Client } from "../utils/client";
import { BRAND } from "../theme/AppTheme";

export default function JoinToStayInformed() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const client = new Client();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage("Please enter an email.");
      return;
    }
    try {
      const res = await client.waitlist(email);
      setStatusMessage(res.message || "Successfully signed up!");
      setEmail("");
    } catch (err) {
      console.error("Waitlist signup error:", err);
      setStatusMessage("Signup failed. Please try again later.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pb: { xs: 10, md: 14 } }}>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})`,
              borderRadius: 1,
              p: { xs: 4, md: 6 },
              textAlign: "center",
              boxShadow: "0 30px 80px rgba(0,0,0,.45)",
            }}
          >
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Join to Stay Informed
            </Typography>
            <Typography sx={{ color: BRAND.light, mb: 3 }}>
              Be the first to know about Auditron's latest updates, dashboard releases, and exclusive insights into smart contract security.
            </Typography>

        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
            mt: 4,
            maxWidth: 640,
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
            bgcolor: "rgba(0,0,0,0.2)",
            p: 1,
            borderRadius: 999,
          }}
        >
          <TextField
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
                color: "#fff",
                borderRadius: 999,
                px: 2,
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
              },
              "& input::placeholder": { color: "#E9D5FF", opacity: 1 },
            }}
          />
              <Button
                type="submit"
                sx={{
                  bgcolor: "#fff",
                  color: BRAND.secondary,
                  fontWeight: 800,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#E5E7EB", transform: "scale(1.03)" },
                  transition: "all .2s ease",
                }}
              >
                Subscribe
              </Button>
        </Box>

            {statusMessage && <Typography sx={{ mt: 1.5, color: "#fff" }}>{statusMessage}</Typography>}
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
