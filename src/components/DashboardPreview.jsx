// src/components/DashboardPreview.jsx
import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
} from "@mui/material";

import { BRAND } from "../theme/AppTheme";

export default function DashboardPreview() {
    return (
        <Box sx={{ bgcolor: BRAND.dark, color: "#fff", minHeight: "100vh" }}>
            {/* Dashboard Preview (MacBook mock) -v2*/}
            <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: BRAND.dark }}>
                <Container maxWidth="lg">
                    {/* Title + Subtitle */}
                    <Box sx={{ textAlign: "center", maxWidth: 768, mx: "auto", mb: { xs: 6, md: 8 } }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff" }}>
                            Your Security Command Center
                        </Typography>
                        <Typography sx={{ mt: 2, fontSize: 18, color: "#cbd5e1" }}>
                            Get a sneak peek at our upcoming Security Dashboard - your unified, intuitive hub for monitoring Soroban projects across the Stellar ecosystem.
                        </Typography>
                    </Box>

                    {/* MacBook Mockup */}
                    <Box
                        id="macbook-mockup"
                        sx={{
                            position: "relative",
                            mx: "auto",
                            height: 600,
                            width: { xs: "100%", sm: 950 },
                            maxWidth: "100%",
                            bgcolor: "#000",
                            border: "12px solid #000",
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            boxShadow: "0 25px 60px rgba(2,6,23,0.6)",
                            overflow: "visible",
                        }}
                    >
                        {/* Top vents (3) */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: -12,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 60,
                                height: 5,
                                bgcolor: "#1f2937",
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: -12,
                                left: "15%",
                                width: 80,
                                height: 5,
                                bgcolor: "#1f2937",
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: -12,
                                right: "15%",
                                width: 80,
                                height: 5,
                                bgcolor: "#1f2937",
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8,
                            }}
                        />

                        {/* Screen wrapper */}
                        <Box
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                height: "100%",
                                width: "100%",
                                bgcolor: "#f9fafb", // off-white
                            }}
                        >
                            {/* Screen content */}
                            <Box
                                id="dashboard-screen"
                                sx={{
                                    p: 3,
                                    height: "100%",
                                    width: "100%",
                                    overflowY: "auto",
                                }}
                            >
                                {/* Header row */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        pb: 2,
                                        borderBottom: "1px solid #e5e7eb",
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                                            Security Dashboard
                                        </Typography>
                                        <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                                            Overview of Stellar DeFi Projects
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        {/* Search */}
                                        <Box sx={{ position: "relative" }}>
                                            {/* Simple magnifier (SVG) */}
                                            <Box
                                                component="svg"
                                                viewBox="0 0 24 24"
                                                sx={{
                                                    position: "absolute",
                                                    left: 10,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    width: 18,
                                                    height: 18,
                                                    color: "#9ca3af",
                                                }}
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20l-5.99-6Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                                                />
                                            </Box>
                                            <TextField
                                                placeholder="Search projects..."
                                                size="small"
                                                sx={{
                                                    width: 256,
                                                    "& .MuiOutlinedInput-root": {
                                                        pl: 4,
                                                        pr: 1.5,
                                                        py: 0.5,
                                                        fontSize: 14,
                                                        bgcolor: "#fff",
                                                        "& fieldset": { borderColor: "#d1d5db" },
                                                        "&:hover fieldset": { borderColor: BRAND.primary },
                                                        "&.Mui-focused fieldset": { borderColor: BRAND.primary },
                                                    },
                                                }}
                                            />
                                        </Box>

                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})`,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                "&:hover": { opacity: 0.95, background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})` },
                                            }}
                                        >
                                            New Audit
                                        </Button>
                                    </Box>
                                </Box>

                                {/* KPI cards */}
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                                        gap: 1.5,
                                        mt: 2.5,
                                        "@media (max-width:900px)": {
                                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                        },
                                        "@media (max-width:600px)": {
                                            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                                        },
                                    }}
                                >
                                    {[
                                        { label: "Total Projects", value: "128", color: "#1f2937" },
                                        { label: "Approved", value: "95", color: "#16a34a" },
                                        { label: "Under Review", value: "21", color: "#eab308" },
                                        { label: "Issues Found", value: "12", color: "#ef4444" },
                                    ].map((kpi) => (
                                        <Box
                                            key={kpi.label}
                                            sx={{
                                                bgcolor: "#fff",
                                                p: 2,
                                                borderRadius: 2,
                                                border: "1px solid #e5e7eb",
                                            }}
                                        >
                                            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>
                                                {kpi.label}
                                            </Typography>
                                            <Typography sx={{ fontSize: 28, fontWeight: 800, color: kpi.color, mt: 0.5 }}>
                                                {kpi.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Table */}
                                <Box sx={{ mt: 2.5, bgcolor: "#fff", borderRadius: 2, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                                    <Box component="table" sx={{ width: "100%", fontSize: 14, color: "#4b5563", borderCollapse: "separate", borderSpacing: 0 }}>
                                        <Box component="thead" sx={{ bgcolor: "#f9fafb" }}>
                                            <Box component="tr">
                                                {["Project", "Security Score", "Status", "Last Audit", "Actions"].map((h) => (
                                                    <Box
                                                        key={h}
                                                        component="th"
                                                        scope="col"
                                                        sx={{ textTransform: "uppercase", fontSize: 12, color: "#374151", px: 3, py: 1.5, textAlign: "left" }}
                                                    >
                                                        {h}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                        <Box component="tbody">
                                            {[
                                                {
                                                    logo: "https://storage.googleapis.com/uxpilot-auth.appspot.com/986599aa34-9c6bfd1ed369bfde4285.png",
                                                    name: "StellarSwap",
                                                    score: { value: "92", bg: "#dcfce7", fg: "#166534" },
                                                    status: { label: "Approved", color: "#16a34a", icon: "check" },
                                                    date: "2025-08-15",
                                                },
                                                {
                                                    logo: "https://storage.googleapis.com/uxpilot-auth.appspot.com/986599aa34-22d7104dc8ab13d15eb3.png",
                                                    name: "Aqua Protocol",
                                                    score: { value: "78", bg: "#fef9c3", fg: "#854d0e" },
                                                    status: { label: "Under Review", color: "#eab308", icon: "hourglass" },
                                                    date: "2025-09-01",
                                                },
                                                {
                                                    logo: "https://storage.googleapis.com/uxpilot-auth.appspot.com/986599aa34-4d2509100681b1c0e1d9.png",
                                                    name: "Lume Wallet",
                                                    score: { value: "45", bg: "#fee2e2", fg: "#991b1b" },
                                                    status: { label: "Issues Found", color: "#ef4444", icon: "warning" },
                                                    date: "2025-07-22",
                                                },
                                            ].map((row, i) => (
                                                <Box key={row.name} component="tr" sx={{ borderBottom: i < 2 ? "1px solid #e5e7eb" : "none", bgcolor: "#fff" }}>
                                                    <Box component="td" sx={{ px: 3, py: 1.5, color: "#111827", fontWeight: 600 }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                                            <Box component="img" src={row.logo} alt={`${row.name} logo`} sx={{ width: 24, height: 24, borderRadius: "50%" }} />
                                                            {row.name}
                                                        </Box>
                                                    </Box>
                                                    <Box component="td" sx={{ px: 3, py: 1.5 }}>
                                                        <Box
                                                            sx={{
                                                                display: "inline-block",
                                                                fontSize: 12,
                                                                fontWeight: 700,
                                                                px: 1.25,
                                                                py: 0.25,
                                                                borderRadius: 999,
                                                                bgcolor: row.score.bg,
                                                                color: row.score.fg,
                                                            }}
                                                        >
                                                            {row.score.value}
                                                        </Box>
                                                    </Box>
                                                    <Box component="td" sx={{ px: 3, py: 1.5 }}>
                                                        <Box sx={{ color: row.status.color, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                                                            {/* simple icons via SVGs to avoid FA dep */}
                                                            {row.status.icon === "check" && (
                                                                <Box component="span" aria-hidden style={{ fontSize: 0 }}>
                                                                    ✓
                                                                </Box>
                                                            )}
                                                            {row.status.icon === "hourglass" && (
                                                                <Box component="span" aria-hidden style={{ fontSize: 0 }}>
                                                                    ⧗
                                                                </Box>
                                                            )}
                                                            {row.status.icon === "warning" && (
                                                                <Box component="span" aria-hidden style={{ fontSize: 0 }}>
                                                                    ⚠
                                                                </Box>
                                                            )}
                                                            {row.status.label}
                                                        </Box>
                                                    </Box>
                                                    <Box component="td" sx={{ px: 3, py: 1.5 }}>
                                                        {row.date}
                                                    </Box>
                                                    <Box component="td" sx={{ px: 3, py: 1.5 }}>
                                                        <Box
                                                            sx={{
                                                                fontWeight: 700,
                                                                color: BRAND.primary,
                                                                cursor: "pointer",
                                                                "&:hover": { textDecoration: "underline" },
                                                            }}
                                                        >
                                                            View Details
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* COMING SOON overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    bgcolor: "rgba(0,0,0,0.5)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    zIndex: 20,
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 1.5, color: "#fff" }}>
                                    COMING SOON
                                </Typography>
                                <Typography sx={{ mt: 1, fontSize: 18, color: "#d1d5db" }}>
                                    Our new dashboard is launching soon. Join the waitlist for early access!
                                </Typography>
                            </Box>
                        </Box>

                        {/* Base shadows / bottom lips */}
                        <Box
                            sx={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                mt: 0.5,
                                height: 12,
                                width: { xs: "103%", sm: "105%" },
                                bgcolor: "#0f172a",
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                mt: 2,
                                height: 8,
                                width: "50%",
                                bgcolor: "#1f2937",
                                borderBottomLeftRadius: 6,
                                borderBottomRightRadius: 6,
                            }}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
