import React from "react";
import { Box, Divider, Typography, Link } from "@mui/material";
import { X, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 0,
        pt: 2,
        pb: 2,
        backgroundColor: "#f4f4f4",
        minHeight: "4rem"
      }}
    >
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexWrap: { xs: "wrap", md: "nowrap" }
        }}
      >
        <Link href="/" variant="body2" underline="hover" color="text.secondary">
          @ 2025 Auditron
        </Link>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "inherit" } }} color="text.secondary">
          |
        </Typography>
        <Link href="/privacy" variant="body2" underline="hover" color="text.secondary">
          Privacy Policy
        </Link>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "inherit" } }} color="text.secondary">
          |
        </Typography>
        <Link href="/about" variant="body2" underline="hover" color="text.secondary">
          About
        </Link>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "inherit" } }} color="text.secondary">
          |
        </Typography>
        <Link href="/contact" variant="body2" underline="hover" color="text.secondary">
          Contact
        </Link>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "inherit" } }} color="text.secondary">
          |
        </Typography>
        <Link
          href="https://www.linkedin.com/company/auditronccl"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <LinkedIn  sx={{ fontSize: "25px", mt: "2px"}}/>
        </Link>
        <Link
          href="https://x.com/auditron_ccl"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <X fontSize="small" />
        </Link>      
      </Box>
    </Box>
  );
}
