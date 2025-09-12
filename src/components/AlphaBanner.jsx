// src/components/AlphaBanner.jsx
import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Chip, Stack } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { Client } from "../utils/client";
import { BRAND } from "../theme/AppTheme";

export default function AlphaBanner() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const client = new Client();

  const handleSignup = async (e) => {
    e?.preventDefault?.();
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
    <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          textAlign: "center",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          background: `linear-gradient(135deg, ${BRAND.secondary}, #6D28D9)`,
          boxShadow: "0 30px 80px rgba(0,0,0,.45)",
        }}
      >
        {/* Alpha notice */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Chip
            icon={<BoltIcon sx={{ color: BRAND.secondary }} />}
            label="Alpha Release"
            sx={{
              bgcolor: "#fff",
              color: BRAND.secondary,
              fontWeight: 800,
              "& .MuiChip-icon": { color: BRAND.secondary },
            }}
          />
        </Stack>
        <Typography sx={{ color: "#E9D5FF", mb: 0.5 }}>
          This alpha release allows you to generate <b>one report</b> only.
        </Typography>

        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, mt: 1 }}>
          Thank you for testing Auditron!
        </Typography>
        <Typography sx={{ color: "#E9D5FF", mb: 3 }}>
          Join to stay informed about the latest updates and releases.
        </Typography>

        {/* Email form */}
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
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
            size="medium"
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
            Join
          </Button>
        </Box>

        {statusMessage && (
          <Typography sx={{ mt: 1.5, color: "#fff" }}>{statusMessage}</Typography>
        )}
      </Box>
    </Container>
  );
}
