// src/pages/NewAudit.jsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/GppGood";
import { BRAND } from "../theme/AppTheme";

const COLORS = {
  darkA: "#1F2937", // tailwind slate-800
  darkB: "#111827", // slate-900
  card: "#1a2333",
  accent: "#6366F1",
  accentHover: "#4F46E5",
  teal: "#14B8A6",
  border: "#374151",
  textMuted: "#9CA3AF",
  textLight: "#D1D5DB",
};

export default function NewAudit() {
  // STATE
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("files"); // 'files' | 'github'
  const [files, setFiles] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [validation, setValidation] = useState("");

  const inputRef = useRef(null);
  const dropRef = useRef(null);

  // VALIDATION
  const isFilesReady = activeTab === "files" && files.length > 0;
  const isGithubReady = activeTab === "github" && githubUrl.trim() !== "";
  const contractReady = isFilesReady || isGithubReady;
  const canGenerate = walletConnected && contractReady;

  // HANDLERS
  const toggleWallet = () => {
    const next = !walletConnected;
    setWalletConnected(next);
    if (!next) setValidation("Please connect your wallet first.");
    else if (!contractReady) setValidation("Please provide a smart contract to audit.");
    else setValidation("");
  };

  const onTabFiles = () => {
    setActiveTab("files");
    // validation update
    if (!walletConnected) setValidation("Please connect your wallet first.");
    else if (files.length === 0) setValidation("Please provide a smart contract to audit.");
    else setValidation("");
  };
  const onTabGithub = () => {
    setActiveTab("github");
    // validation update
    if (!walletConnected) setValidation("Please connect your wallet first.");
    else if (!githubUrl.trim()) setValidation("Please provide a smart contract to audit.");
    else setValidation("");
  };

  const handleInputClick = () => inputRef.current?.click();

  const handleInputChange = (e) => {
    if (!e.target.files) return;
    addFiles(e.target.files);
    e.target.value = ""; // reset input
  };

  const addFiles = useCallback((fileList) => {
    const next = [...files];
    for (const f of fileList) {
      // dedupe by name+size
      if (!next.some((x) => x.name === f.name && x.size === f.size)) {
        next.push(f);
      }
    }
    setFiles(next);
    // update validation
    if (walletConnected && next.length > 0) setValidation("");
  }, [files, walletConnected]);

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current?.classList.remove("dragging");
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current?.classList.add("dragging");
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current?.classList.remove("dragging");
  };

  const removeFile = (idx) => {
    const next = files.slice();
    next.splice(idx, 1);
    setFiles(next);
    if (activeTab === "files" && next.length === 0) {
      setValidation(walletConnected ? "Please provide a smart contract to audit." : "Please connect your wallet first.");
    }
  };

  const totalSizeKB = useMemo(
    () => files.reduce((acc, f) => acc + f.size, 0) / 1024,
    [files]
  );

  const onGenerate = () => {
    if (!walletConnected) return setValidation("Please connect your wallet first.");
    if (!contractReady) return setValidation("Please provide a smart contract to audit.");
    setValidation("");
    // TODO: wire to your actual generation flow (upload files / fetch repo, call backend, route to progress page)
    // For now, a simple console log:
    console.log("Generate audit:", { files, githubUrl });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#e5e7eb",
        // gradient backdrop like the HTML
        background: `linear-gradient(135deg, ${COLORS.darkA}, ${COLORS.darkB})`,
      }}
    >
      {/* Spacer for translucent header if your appbar is fixed; remove if not needed */}
      <Box sx={{ height: 64 }} />

      <Container
        maxWidth="sm"
        sx={{ py: { xs: 6, md: 10 }, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: `${COLORS.card}CC`, // /80
            backdropFilter: "blur(10px)",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 4,
            boxShadow:
              "0 0 25px rgba(99,102,241,0.20), 0 0 10px rgba(99,102,241,0.10)", // glow
            p: { xs: 3, md: 4 },
          }}
        >
          {/* Title */}
          <Stack alignItems="center" spacing={1} sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff" }}>
              Smart Contract Audit
            </Typography>
            <Typography sx={{ color: COLORS.textMuted }}>
              Secure your smart contracts with our AI-powered audit.
            </Typography>
          </Stack>

          {/* STEP 1: Wallet */}
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: COLORS.accent,
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                1
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
                Connect Your Wallet
              </Typography>
            </Stack>

            {walletConnected ? (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 5 }}>
                <Chip
                  icon={<CheckIcon sx={{ color: "#fff !important" }} />}
                  label="Wallet connected"
                  sx={{
                    bgcolor: COLORS.teal,
                    color: "#fff",
                    fontWeight: 700,
                    "& .MuiChip-icon": { color: "#fff" },
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={toggleWallet}
                  sx={{
                    ml: 1,
                    borderColor: "#10b981",
                    color: "#10b981",
                    "&:hover": { borderColor: "#10b981", bgcolor: "rgba(16,185,129,0.08)" },
                  }}
                  startIcon={<ShieldIcon />}
                >
                  Disconnect
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 5 }}>
                <Button
                  onClick={toggleWallet}
                  startIcon={<WalletIcon />}
                  sx={{
                    bgcolor: COLORS.accent,
                    color: "#fff",
                    fontWeight: 700,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": { bgcolor: COLORS.accentHover, transform: "scale(1.02)" },
                    transition: "all .2s ease",
                  }}
                >
                  Connect Wallet
                </Button>
                <Typography variant="body2" sx={{ color: COLORS.textMuted }}>
                  Freighter supported
                </Typography>
              </Stack>
            )}
          </Stack>

          <Divider sx={{ borderColor: COLORS.border, my: 2 }} />

          {/* STEP 2: Contract */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: COLORS.accent,
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                2
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
                Provide Smart Contract
              </Typography>
            </Stack>

            {/* Tabs (buttons) */}
            <Box sx={{ ml: 5 }}>
              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 2,
                  p: 0.5,
                  width: "fit-content",
                  bgcolor: "rgba(17,24,39,0.5)", // brand-dark/50
                }}
              >
                <Button
                  onClick={onTabFiles}
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    px: 2,
                    py: 1,
                    fontWeight: 700,
                    borderRadius: 1.5,
                    color: activeTab === "files" ? "#fff" : COLORS.textMuted,
                    bgcolor: activeTab === "files" ? COLORS.accent : "transparent",
                    "&:hover": {
                      bgcolor: activeTab === "files" ? COLORS.accent : "rgba(55,65,81,0.5)",
                    },
                    transition: "all .2s ease",
                  }}
                >
                  Upload Files
                </Button>
                <Button
                  onClick={onTabGithub}
                  startIcon={<GitHubIcon />}
                  sx={{
                    px: 2,
                    py: 1,
                    fontWeight: 700,
                    borderRadius: 1.5,
                    color: activeTab === "github" ? "#fff" : COLORS.textMuted,
                    bgcolor: activeTab === "github" ? COLORS.accent : "transparent",
                    "&:hover": {
                      bgcolor: activeTab === "github" ? COLORS.accent : "rgba(55,65,81,0.5)",
                    },
                    transition: "all .2s ease",
                  }}
                >
                  GitHub Repo
                </Button>
              </Stack>
            </Box>

            {/* Files content */}
            {activeTab === "files" && (
              <Stack spacing={2} sx={{ ml: 5 }}>
                {/* Dropzone */}
                <Box
                  ref={dropRef}
                  onClick={handleInputClick}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  sx={{
                    border: `2px dashed ${COLORS.border}`,
                    borderRadius: 3,
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all .2s ease",
                    bgcolor: "rgba(17,24,39,0.5)",
                    "&.dragging": {
                      borderColor: COLORS.accent,
                      bgcolor: "rgba(17,24,39,0.3)",
                    },
                    "&:hover": {
                      borderColor: COLORS.accent,
                      bgcolor: "rgba(17,24,39,0.3)",
                    },
                  }}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                    accept=".rs"
                  />
                  <Stack spacing={1} alignItems="center" sx={{ color: COLORS.textMuted }}>
                    <CloudUploadIcon sx={{ fontSize: 36, color: COLORS.accent }} />
                    <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                      Drag & drop files here
                    </Typography>
                    <Typography>
                      or <Box component="span" sx={{ color: COLORS.accent, fontWeight: 600 }}>click to browse</Box>
                    </Typography>
                    <Typography variant="caption">Supports  .rs</Typography>
                  </Stack>
                </Box>

                {/* File list */}
                <Stack spacing={1}>
                  {files.map((f, i) => (
                    <Stack
                      key={`${f.name}-${f.size}-${i}`}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        bgcolor: "rgba(17,24,39,0.5)",
                        border: `1px solid ${COLORS.border}`,
                        p: 1.25,
                        borderRadius: 2,
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                        <InsertDriveFileIcon sx={{ color: COLORS.teal }} />
                        <Typography
                          sx={{ color: "#e5e7eb", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 260 }}
                          title={f.name}
                        >
                          {f.name}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
                          {(f.size / 1024).toFixed(1)} KB
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeFile(i)}
                          sx={{
                            color: COLORS.textMuted,
                            "&:hover": { color: "#ef4444" },
                            opacity: 0.9,
                          }}
                          aria-label={`Remove ${f.name}`}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  ))}
                  {files.length > 1 && (
                    <Typography sx={{ color: COLORS.textMuted, fontSize: 12, ml: 0.5 }}>
                      Total size: {totalSizeKB.toFixed(1)} KB
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}

            {/* GitHub content */}
            {activeTab === "github" && (
              <Stack spacing={2} sx={{ ml: 5 }}>
                <Box sx={{ position: "relative" }}>
                  <GitHubIcon
                    sx={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: COLORS.textMuted,
                    }}
                  />
                  <TextField
                    fullWidth
                    placeholder="https://github.com/user/repo"
                    value={githubUrl}
                    onChange={(e) => {
                      setGithubUrl(e.target.value);
                      if (walletConnected && e.target.value.trim()) setValidation("");
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(17,24,39,0.85)",
                        color: "#fff",
                        borderRadius: 2,
                        pl: 5,
                        "& fieldset": { borderColor: COLORS.border },
                        "&:hover fieldset": { borderColor: COLORS.accent },
                        "&.Mui-focused fieldset": { borderColor: COLORS.accent },
                      },
                      "& input::placeholder": { color: COLORS.textMuted, opacity: 1 },
                    }}
                  />
                </Box>
              </Stack>
            )}
          </Stack>

          {/* CTA */}
          <Box sx={{ pt: 3 }}>
            <Button
              fullWidth
              disabled={!canGenerate}
              onClick={onGenerate}
              startIcon={<BoltIcon />}
              sx={{
                bgcolor: canGenerate ? COLORS.accent : "#4b5563",
                color: "#fff",
                fontWeight: 800,
                py: 1.5,
                borderRadius: 3,
                fontSize: 18,
                transition: "all .2s ease",
                "&:hover": {
                  bgcolor: canGenerate ? COLORS.accentHover : "#4b5563",
                  transform: canGenerate ? "scale(1.02)" : "none",
                },
                cursor: canGenerate ? "pointer" : "not-allowed",
                opacity: canGenerate ? 1 : 0.6,
              }}
            >
              Generate Audit Report
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                color: canGenerate ? COLORS.textMuted : "#fca5a5",
                mt: 1.25,
                minHeight: 20,
                fontSize: 13,
              }}
            >
              {validation}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
