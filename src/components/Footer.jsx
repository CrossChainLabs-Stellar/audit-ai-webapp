import React from "react";
import { Box, Divider, Typography, Link } from "@mui/material";
import { X, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 0, pt: 2, backgroundColor: "#f4f4f4" }}>
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexWrap: "nowrap"
        }}
      >
        <Typography variant="body2" color="text.secondary">
          @ 2025 Auditron
        </Typography>
        <Link href="/privacy" underline="hover" color="inherit">
          Privacy Policy
        </Link>
        <Typography variant="body2" color="text.secondary">
          |
        </Typography>
        <Link href="/about" underline="hover" color="inherit">
          About
        </Link>
        <Typography variant="body2" color="text.secondary">
          |
        </Typography>
        <Link href="/contact" underline="hover" color="inherit">
          Contact
        </Link>
        <Typography variant="body2" color="text.secondary">
          |
        </Typography>
        <Link
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <X />
        </Link>
        <Link
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <LinkedIn />
        </Link>
      </Box>
    </Box>
  );
}
