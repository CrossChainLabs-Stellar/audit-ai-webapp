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
import contactImage from "../assets/Contact.jpg";
import { BRAND } from "../theme/AppTheme";
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

  // input style to mimic gray inputs + purple focus
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#F3F4F6", // gray-100
      color: "#111827",   // gray-900
      borderRadius: 2,
      "& fieldset": { borderColor: "#E5E7EB" }, // gray-200
      "&:hover fieldset": { borderColor: "#E5E7EB" },
      "&.Mui-focused fieldset": { borderColor: BRAND.primary },
      "&.Mui-focused": { boxShadow: `0 0 0 2px ${BRAND.secondary}33` }, // subtle ring
    },
    "& .MuiInputBase-input::placeholder": { color: "#6B7280", opacity: 1 }, // gray-500
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BRAND.dark, color: "#fff" }}>
      {/* Page header */}
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, letterSpacing: "-0.01em" }}
          >
            Get In Touch
          </Typography>
          <Typography sx={{ mt: 1.5, color: "#9CA3AF" }}>
            Have a question or want to work with us? Drop us a line.
          </Typography>
        </Box>
      </Container>

      {/* Contact Card */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 } }}>
        <Box
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            bgcolor: "#fff",
            color: "#111827",
            borderRadius: 4, // ~ rounded-2xl
            boxShadow:
              "0 40px 80px rgba(124,58,237,0.10), 0 20px 30px rgba(0,0,0,0.08)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          {/* Left: form */}
          <Box sx={{ p: { xs: 3, sm: 6 } }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1F2937" }}>
              Send us a Message
            </Typography>
            <Typography sx={{ mt: 1, color: "#6B7280" }}>
              We’d love to hear from you! Please fill out the form below.
            </Typography>

            <Box component="form" onSubmit={handleSendMessage} sx={{ mt: 4 }}>
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
                    bgcolor: "#4DB8B5", // brand-teal
                    color: "#fff",
                    fontWeight: 800,
                    py: 1.25,
                    borderRadius: 2,
                    textTransform: "none",
                    transition: "all .2s ease",
                    "&:hover": { opacity: 0.9, transform: "scale(1.02)" },
                    boxShadow: "0 8px 20px rgba(77,184,181,0.35)",
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </Box>

            {contactStatus && (
              <Typography
                sx={{ mt: 2, color: "#6B7280", textAlign: "center" }}
              >
                {contactStatus}
              </Typography>
            )}
          </Box>

          {/* Right: image (hidden on xs, shown on md+) */}
          <Box
            sx={{
              position: "relative",
              display: { xs: "none", md: "block" },
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
              }}
            />
          </Box>
        </Box>
      </Container>

      <JoinToStayInformed></JoinToStayInformed>
    </Box>
  );
}
