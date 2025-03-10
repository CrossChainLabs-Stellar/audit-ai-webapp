import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Divider
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { isConnected, requestAccess } from "@stellar/freighter-api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Client } from "../utils/client";
import reportData from "../test/reportData.json";
import FreighterBanner from "../components/FreighterBanner";

export default function Dashboard({ onLogin }) {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [reportGenerating, setReportGenerating] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [reportSections, setReportSections] = useState([]);

  const COLORS = ["#FF6666", "#FFA500", "#4CAF50"];

  // Custom severity label styles
  const severityStyles = {
    High: {
      backgroundColor: "#FF6666",
      color: "white",
      padding: "2px 4px",
      borderRadius: "4px",
      fontWeight: "bold"
    },
    Medium: {
      backgroundColor: "#FFA500",
      color: "white",
      padding: "2px 4px",
      borderRadius: "4px",
      fontWeight: "bold"
    },
    Low: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "2px 4px",
      borderRadius: "4px",
      fontWeight: "bold"
    }
  };

  useEffect(() => {
    const checkFreighter = async () => {
      const connectionStatus = await isConnected();
      setIsFreighterInstalled(connectionStatus.isConnected);
    };
    checkFreighter();
  }, []);

  const handleConnectStellar = async () => {
    try {
      if (!isFreighterInstalled) {
        return false; 
      }
      const accessObj = await requestAccess();
      if (accessObj.error) {
        alert(`Error: ${accessObj.error}`);
        return false;
      }
      const pk = accessObj.address;
      if (pk) {
        setPublicKey(pk);
        onLogin(pk);
        return true;
      }
    } catch (error) {
      console.error("Stellar wallet connection error: ", error);
    }
    return false;
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleGenerateReport = async () => {
    // Ensure wallet is connected
    if (!publicKey) {
      const connected = await handleConnectStellar();
      if (!connected) return;
    }

    // Validate required fields
    if (!projectName || !uploadedFile) {
      alert("Please provide a project name and upload a file.");
      return;
    }

    setReportGenerating(true);

    const client = new Client();
    try {
      const result = await client.runAudit(publicKey, projectName, uploadedFile);
      if (result && result.auditRow) {
        const { report } = result.auditRow;
        console.log(result.auditRow);
        // Decode the Base64 encoded report using window.atob
        try {
          const decodedReport = JSON.parse(window.atob(report));
          setVulnerabilities(decodedReport.vulnerabilities || []);
          setReportSections(decodedReport.reportSections || []);
        } catch (decodeErr) {
          console.error("Failed to decode audit report:", decodeErr);
          setVulnerabilities([]);
          setReportSections([]);
        }
      }
    } catch (error) {
      console.error("runAudit API error:", error);
    }
    setReportGenerating(false);
  };

  // Prepare data for Pie chart
  const severityCounts = vulnerabilities.reduce((acc, vuln) => {
    acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
    return acc;
  }, {});
  const pieData = [
    { name: "High", value: severityCounts.High || 0 },
    { name: "Medium", value: severityCounts.Medium || 0 },
    { name: "Low", value: severityCounts.Low || 0 }
  ];

  // Check if user can generate a report
  const canGenerateReport = publicKey && projectName && uploadedFile;

  return (
    <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "#f9fafb" }}>
      <Paper sx={{ maxWidth: 700, mx: "auto", p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
          Run Audit
        </Typography>

        {/* STEP 1: Connect Freighter Wallet */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Step 1: Connect Freighter Wallet
          </Typography>
          {publicKey ? (
            <Typography variant="body2" color="success.main">
              Wallet connected: <strong>{publicKey}</strong>
            </Typography>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleConnectStellar}
              sx={{ mt: 1 }}
            >
              Connect Freighter
            </Button>
          )}
          {/* Render the banner if Freighter is not installed */}
          {!isFreighterInstalled && <FreighterBanner />}
        </Box>

        {/* STEP 2: Enter Project Name */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Step 2: Provide a Project Name
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. My Soroban Contract"
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* STEP 3: Upload Contract File */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Step 3: Upload Your Contract
          </Typography>
          <Button variant="contained" component="label" sx={{ mt: 1 }}>
            {uploadedFile ? "Change File" : "Upload File"}
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
            />
          </Button>
          {uploadedFile && (
            <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
              Selected File: {uploadedFile.name}
            </Typography>
          )}
        </Box>

        {/* STEP 4: Generate Report */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Step 4: Generate Your Report
          </Typography>
          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            loading={reportGenerating}
            onClick={handleGenerateReport}
            disabled={!canGenerateReport}
            sx={{ py: 1.5, mt: 1 }}
          >
            Generate Report
          </LoadingButton>
          {reportGenerating && (
            <Box sx={{ mt: 2 }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Generating report...
              </Typography>
            </Box>
          )}
          {!canGenerateReport && !reportGenerating && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, fontStyle: "italic" }}
            >
              Please connect your wallet, provide a project name, and upload a file first.
            </Typography>
          )}
        </Box>
      </Paper>

      {/* REPORT SECTION */}
      {vulnerabilities.length > 0 && (
        <Paper sx={{ mt: 6, mx: "auto", maxWidth: 800, p: 4, boxShadow: 3 }}>
          <Typography variant="h4" align="center">
            Security Audit Report
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {projectName}
          </Typography>

          <Typography variant="subtitle1" align="center" gutterBottom>
            February 20, 2025
          </Typography>

          {/* Table of Contents */}
          <Box sx={{ mt: 3, borderTop: "1px solid #ccc", pt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Table of Contents
            </Typography>
            <Typography variant="body1">1. Overview</Typography>
            {reportSections.map((section, index) => (
              <Typography key={index} variant="body1">
                {index + 2}. {section.title}
              </Typography>
            ))}
            <Typography variant="body1">
              {reportSections.length + 2}. Findings
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Pie Chart */}
          <PieChart width={350} height={350} style={{ margin: "auto" }}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Report Sections */}
          {reportSections.map((section, index) => (
            <Box key={index} sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="body1">{section.content}</Typography>
            </Box>
          ))}

          {/* Findings Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>
              Findings
            </Typography>
            {vulnerabilities.map((vuln, index) => (
              <Box
                key={index}
                sx={{ mt: 2, borderBottom: "1px solid #ddd", pb: 2 }}
              >
                <Typography variant="subtitle1">
                  5.{index + 1}{" "}
                  <span style={severityStyles[vuln.severity]}>
                    {vuln.severity} Severity
                  </span>{" "}
                  {vuln.title}
                </Typography>
                <Typography variant="body2">
                  <strong>File:</strong> {vuln.file}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {vuln.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Code Snippet:</strong>
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    padding: 2,
                    borderRadius: 1,
                    overflowX: "auto",
                    fontFamily: "monospace"
                  }}
                >
                  {vuln.snippet}
                </Box>
                <Typography variant="body2">
                  <strong>Recommendation:</strong> {vuln.recommendation}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
