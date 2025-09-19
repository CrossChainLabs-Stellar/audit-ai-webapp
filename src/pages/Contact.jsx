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
      bgcolor: "#F3F4F6", // gray-100
      color: "#111827", // gray-900
      borderRadius: 1, // ~ rounded-lg
      "& fieldset": { borderColor: "#E5E7EB" }, // gray-200
      "&:hover fieldset": { borderColor: "#E5E7EB" },
      "&.Mui-focused fieldset": { borderColor: "#8A2BE2" }, // brand-primary
      "&.Mui-focused": {
        boxShadow: "0 0 0 2px rgba(138,43,226,0.30)", // focus:ring-brand-primary/50
      },
    },
    "& .MuiInputBase-input::placeholder": { color: "#6B7280", opacity: 1 }, // gray-500
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
              maxWidth: 1100, // ~ max-w-5xl
              mx: "auto",
              bgcolor: "#FFFFFF",
              color: "#111827",
              borderRadius: 1, // rounded-2xl
              boxShadow:
                "0 40px 80px rgba(124,58,237,0.10), 0 20px 30px rgba(0,0,0,0.08)",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // md:grid-cols-2
            }}
          >
            {/* Left: form */}
            <Box sx={{ p: { xs: 3, sm: 6 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#1F2937", mb: 0.5 }}
              >
                Send us a Message
              </Typography>
              <Typography sx={{ color: "#6B7280", mb: 3 }}>
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
                      borderRadius: 1, // rounded-xl
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
