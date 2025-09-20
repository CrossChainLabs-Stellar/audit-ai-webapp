// --- Technology Section (true gradient inside icons) ---
import React from "react";
import { Box, Container, Typography, Grid, Stack, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/GppGood";
import MemoryIcon from "@mui/icons-material/Memory";
import { BRAND } from "../theme/AppTheme";

export default function TechnologySection() {
  const tileSx = {
    borderRadius: 4,
    p: 3,
    height: "100%",
    textAlign: "center",
    backgroundColor: "rgba(31, 41, 55, 0.40)", // soft card
    border: `1px solid ${BRAND.border}`,
    transition: "transform .25s ease, border-color .25s ease, box-shadow .25s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      borderColor: BRAND.primary,
      boxShadow: "0 20px 45px rgba(138,43,226,0.15)",
    },
  };

  // Apply the gradient fill directly to the SVG <path>
  // Works because we add a <defs> with #auditronGrad in the DOM below.
  const gradFillSx = {
    fontSize: 48,
    // default color (in case gradient fails)
    color: "#8A2BE2",
    "& path": {
      fill: "url(#auditronGrad) !important",
    },
  };

  const nameSx = { fontWeight: 800, color: "#fff", mt: 1 };
  const captionSx = { color: "text.secondary", fontSize: 13, mt: 0.5 };

  const items = [
    {
      icon: <LanguageIcon sx={gradFillSx} />,
      name: "Rust",
      caption: "Memory-safe smart contracts",
      hint: "We analyze Rust code patterns and common traps specific to Soroban.",
    },
    {
      icon: <MemoryIcon sx={gradFillSx} />,
      name: "Soroban",
      caption: "Smart contract runtime",
      hint: "Deep Soroban context to catch real issues beyond generic linting.",
    },
    {
      icon: <StarIcon sx={gradFillSx} />,
      name: "Stellar",
      caption: "Ecosystem-native integration",
      hint: "SCF project discovery & on-chain registry for audit references.",
    },
    {
      icon: <BoltIcon sx={gradFillSx} />,
      name: "AI Analysis",
      caption: "Static & AI-powered findings",
      hint: "Rule-based checks feed LLM prompts for higher-accuracy results.",
    },
    {
      icon: <ShieldIcon sx={gradFillSx} />,
      name: "Security",
      caption: "Transparent benchmarking",
      hint: "Public scores, Certification Seal, and continuous monitoring.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: BRAND.dark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle brand glows */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(74,0,224,.14) 0%, transparent 35%), radial-gradient(circle at 85% 90%, rgba(138,43,226,.14) 0%, transparent 35%)",
        }}
      />

      {/* Hidden gradient defs (must be in the DOM so url(#auditronGrad) resolves) */}
      <Box sx={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
        <svg width="0" height="0" focusable="false" aria-hidden="true">
          <defs>
            <linearGradient id="auditronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A00E0" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Typography variant="h3" fontWeight={900} align="center" gutterBottom>
          Built for Stellar. Powered by AI.
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mb: 6, maxWidth: 900, mx: "auto" }}
        >
          Soroban at the core, with AI-driven analysis and a
          security first design, purpose-built for the Stellar ecosystem.
        </Typography>

        <Grid container spacing={3}>
          {items.map((t, i) => (
            <Grid key={i} item xs={6} md={2.4}>
              <Tooltip title={t.hint} arrow placement="top">
                <Stack sx={tileSx} alignItems="center">
                  {t.icon}
                  <Typography sx={nameSx}>{t.name}</Typography>
                  <Typography sx={captionSx}>{t.caption}</Typography>
                </Stack>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
