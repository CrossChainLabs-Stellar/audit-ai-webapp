// --- Technology Section (dark theme, matches homepage) ---
import React from "react";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/GppGood";
import { BRAND } from "../theme/AppTheme";

export default function TechnologySection() {
    const tileSx = {
        borderRadius: 3,
        p: 3,
        height: "100%",
        textAlign: "center",
        backgroundColor: "rgba(31, 41, 55, 0.40)", // soft card like features section
        border: `1px solid ${BRAND.border}`,
        transition: "all .25s ease",
        "&:hover": {
            transform: "translateY(-4px)",
            borderColor: BRAND.primary,
        },
    };

    const iconWrapSx = {
        width: 72,
        height: 72,
        borderRadius: 3,
        display: "grid",
        placeItems: "center",
        mx: "auto",
        mb: 1.5,
        boxShadow: 4,
        background: `linear-gradient(135deg, ${BRAND.secondary}, ${BRAND.primary})`,
    };

    const items = [
        { icon: <LanguageIcon sx={{ fontSize: 36, color: "#ff0808ff" }} />, name: "Rust" },
        { icon: <LanguageIcon sx={{ fontSize: 36, color: "#fff" }} />, name: "Soroban" },
        { icon: <StarIcon sx={{ fontSize: 36, color: "#fff" }} />, name: "Stellar" },
        { icon: <BoltIcon sx={{ fontSize: 36, color: "#fff" }} />, name: "AI Analysis" },
        { icon: <ShieldIcon sx={{ fontSize: 36, color: "#fff" }} />, name: "Security" },
    ];

    /*   { icon: <LanguageIcon sx={{ color: '#ea580c' }} />, name: 'Rust' },
     { icon: <LanguageIcon sx={{ color: '#2563eb' }} />, name: 'Soroban' },
     { icon: <StarIcon sx={{ color: '#f59e0b' }} />, name: 'Stellar' },
     { icon: <BoltIcon sx={{ color: '#7c3aed' }} />, name: 'AI Analysis' },
     { icon: <ShieldIcon sx={{ color: '#16a34a' }} />, name: 'Security' },*/

    return (
        <Box
            sx={{
                py: 10,
                bgcolor: BRAND.dark,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* radial brand glows (subtle) */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage:
                        "radial-gradient(circle at 15% 10%, rgba(74,0,224,.15) 0%, transparent 35%), radial-gradient(circle at 85% 90%, rgba(138,43,226,.15) 0%, transparent 35%)",
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative" }}>
                <Typography variant="h3" fontWeight={900} align="center" gutterBottom>
                    Built for the Stellar Ecosystem
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 6, maxWidth: 900, mx: "auto" }}
                >
                    Leveraging cutting-edge technology and deep integration with Stellar blockchain
                    infrastructure for unparalleled security analysis.
                </Typography>

                <Grid container spacing={3}>
                    {items.map((t, i) => (
                        <Grid item xs={6} md={2.4} key={i}>
                            <Stack alignItems="center" >
                                <Box sx={iconWrapSx} aria-hidden>
                                    {t.icon}
                                </Box>
                                <Typography fontWeight={800}>{t.name}</Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}