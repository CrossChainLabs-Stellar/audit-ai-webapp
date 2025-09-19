// src/pages/Contact.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Client } from "../utils/client";
import { BRAND } from "../theme/AppTheme";
import contactImage from "../assets/Contact.jpg";
import JoinToStayInformed from "../components/JoinToStayInformed.jsx";

export default function Contact() {
  // contact form
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  const client = new Client();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!contactEmail || !message) {
      setContactStatus("Please provide your email and message.");
      return;
    }
    try {
      const res = await client.message(name, contactEmail, subject, message);
      setContactStatus(res.message || "Message sent successfully!");
      setName("");
      setContactEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Contact message error:", err);
      setContactStatus("Failed to send message. Please try again later.");
    }
  };

  // input style to mirror gray inputs + purple focus ring
  const inputSx = {
      "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(17,24,39,0.50)",           // gray-900/50
      color: "#FFFFFF",                          // white text
      borderRadius: 1,                           // ~ rounded-lg
      "& fieldset": { borderColor: "#374151" },  // gray-700
      "&:hover fieldset": { borderColor: "#4B5563" }, // gray-600
      "&.Mui-focused fieldset": { borderColor: "#7B2BF9" }, // brand purple
      "&.Mui-focused": {
        boxShadow: "0 0 0 2px rgba(123,43,249,0.35)",       // focus:ring-brand-purple
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#9CA3AF", // gray-400
      opacity: 1,
    },
    "& .MuiInputAdornment-root": {
      color: "#9CA3AF", // icon color
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BRAND.dark, color: "#fff" }}>
      {/* ===== contact-section (matches provided design) ===== */}
      <Box
        id="contact-section"
        component="section"
        sx={{
          py: { xs: 10, md: 12 }, // ~ py-24
          bgcolor: BRAND.dark, // bg-brand-dark
        }}
      >
        {/* Header */}
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.01em",
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3rem" }, // ~ text-5xl
                color: "#FFFFFF",
                mb: 1.5,
              }}
            >
              Get In Touch
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: "#A0AEC0" }}>
              Have a question or want to work with us? Drop us a line.
            </Typography>
          </Box>
        </Container>

        {/* Card */}
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 1200,            // ~ max-w-6xl
              mx: "auto",
              bgcolor: "rgba(255,255,255,0.08)", // bg-white/10
              backdropFilter: "blur(16px)",      // backdrop-blur-lg
              border: "1px solid rgba(255,255,255,0.1)", // border-white/10
              borderRadius: 1,           
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)", // shadow-2xl
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}
          >
            {/* Left: form (Send us a message) */}
            <Box sx={{ p: { xs: 3, md: 6 }, color: "#fff" }}>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Send us a Message
              </Typography>
              <Typography sx={{ color: "grey.300", mb: 4 }}>
                We&apos;d love to hear from you! Please fill out the form below.
              </Typography>

              <Box component="form" onSubmit={handleSendMessage}>
                <Stack spacing={2.25}>
                  <TextField
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    placeholder="Message *"
                    multiline
                    minRows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 1,
                      // bg-gradient-to-r from-brand-secondary to-brand-primary
                      background:
                        "linear-gradient(90deg, #4A00E0 0%, #8A2BE2 100%)",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      py: 1.25,
                      borderRadius: 2, // rounded-xl
                      textTransform: "none",
                      border: "1px solid transparent",
                      transition: "transform .2s ease, box-shadow .2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 20px 45px rgba(138,43,226,0.25)",
                        borderColor: "rgba(255,255,255,0.12)",
                        background:
                          "linear-gradient(90deg, #4A00E0 0%, #8A2BE2 100%)",
                      },
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <i className="fa-solid fa-paper-plane" />
                      Send Message
                    </span>
                  </Button>
                </Stack>
              </Box>

              {contactStatus && (
                <Typography
                  sx={{
                    mt: 2,
                    color: "#6B7280",
                    textAlign: "center",
                  }}
                >
                  {contactStatus}
                </Typography>
              )}
            </Box>

            {/* Right: image (hidden on xs, shown on md+) */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "relative",
                minHeight: 420,
                bgcolor: "#0B0B1C",
              }}
            >
              <Box
              component="img"
              src={contactImage}
              alt="Contact"
              sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: { xs: "none", md: "block" },
                  position: "relative",
                  minHeight: 420,
                  bgcolor: "#0B0B1C",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Optional: keep your newsletter/CTA block below */}
      <JoinToStayInformed />
    </Box>
  );
}
