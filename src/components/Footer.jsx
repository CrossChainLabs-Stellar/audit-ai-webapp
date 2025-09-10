import React from "react";
import { Box, Container, Typography, Stack, IconButton, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter"; // displays the X/Twitter glyph
import { Link as RouterLink } from "react-router-dom";
import { BRAND } from "../theme/AppTheme";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        bgcolor: BRAND.dark,                // brand-dark
        borderTop: `1px solid ${BRAND.border}`, // gray-800 line
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Left: copyright */}
          <Typography sx={{ color: BRAND.text }}>
            © {new Date().getFullYear()} Auditron. All rights reserved.
          </Typography>

          {/* Middle: nav links */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              color: BRAND.text,
              "& a:hover": { color: "#fff" }, // hover to white
            }}
          >
            <MuiLink component={RouterLink} to="/privacy" underline="none" color="inherit">
              Privacy Policy
            </MuiLink>
            <MuiLink component={RouterLink} to="/about" underline="none" color="inherit">
              About
            </MuiLink>
            <MuiLink component={RouterLink} to="/contact" underline="none" color="inherit">
              Contact
            </MuiLink>
          </Stack>

          {/* Right: social icons */}
          <Stack direction="row" spacing={2}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/company/auditronccl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: BRAND.text, "&:hover": { color: "#fff" } }}
            >
              <LinkedInIcon fontSize="medium" />
            </IconButton>
            <IconButton
              component="a"
              href="https://x.com/auditron_ccl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              sx={{ color: BRAND.text, "&:hover": { color: "#fff" } }}
            >
              <TwitterIcon fontSize="medium" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
