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
import { decode as base64Decode } from 'base-64';

import { Client } from "../utils/client";
import FreighterBanner from "../components/FreighterBanner";
import AlphaBanner from "../components/AlphaBanner";

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export default function Dashboard({ publicKey, onLogin }) {
  const navigate = useNavigate();
  //const [publicKey, setPublicKey] = useState(publicKey);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [fileName, setFileName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [reportGenerating, setReportGenerating] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [reportSections, setReportSections] = useState([]);
  const [auditExists, setAuditExists] = useState(false);
  const [loadingAudit, setLoadingAudit] = useState(publicKey ? true : false);

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

  const viewReport = async (report) => {
    if (report) {
      try {
        let trimmedReport = report;
        if (trimmedReport.startsWith('"') && trimmedReport.endsWith('"')) {
          trimmedReport = trimmedReport.slice(1, -1);
        }
        // Decode the Base64 string
        const decodedString = base64Decode(trimmedReport);
        // Parse JSON
        const decodedReport = JSON.parse(decodedString);

        setProjectName(decodedReport.fileName);
        setFileName(decodedReport.fileName);
        setVulnerabilities(decodedReport.vulnerabilities || []);
        setReportSections(decodedReport.reportSections || []);
        setReportDate(formatDate(decodedReport.date) || "");
      } catch (decodeErr) {
        console.error("Failed to decode audit report:", decodeErr);
        setVulnerabilities([]);
        setReportSections([]);
      }
    }
  }

  useEffect(() => {
    const checkFreighter = async () => {
      const connectionStatus = await isConnected();
      setIsFreighterInstalled(connectionStatus.isConnected);
    };
    checkFreighter();
    const checkAuditExists = async () => {
      if (publicKey) {
        const client = new Client();
        try {
          const result = await client.getAudit(publicKey);
          if (result?.success && result.report) {
            const { report } = result.report;
            await viewReport(report);
            setAuditExists(true);
          } else {
            setAuditExists(false);
          }
          setLoadingAudit(false);
        } catch (auditErr) {
          console.error("Error fetching audit:", auditErr);
          setAuditExists(false);
        }
      }
    };
    checkAuditExists();
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
      //setPublicKey(pk);
      onLogin(pk);

      // After connecting, use client.getAudit to check if an audit already exists
      const client = new Client();
      try {
        const result = await client.getAudit(pk);
        if (result?.success && result.report) {
          const { report } = result.report;
          await viewReport(report);

          setAuditExists(true);
        } else {
          setAuditExists(false);
        }
      } catch (auditErr) {
        console.error("Error fetching audit:", auditErr);
        setAuditExists(false);
      }
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
    setFileName(event.target.files[0].name);
    setProjectName(event.target.files[0].name);
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
    console.log({ publicKey, projectName, uploadedFile });
    const result = await client.runAudit(publicKey, projectName, fileName, uploadedFile);
    console.log(result);
    if (result && result.report) {
      const { report } = result.report;
      // Decode the Base64 encoded report using window.atob
      try {
        let trimmedReport = report;
        if (trimmedReport.startsWith('"') && trimmedReport.endsWith('"')) {
          trimmedReport = trimmedReport.slice(1, -1);
        }
        // Decode the Base64 string
        const decodedString = base64Decode(trimmedReport);
        // Parse JSON
        const decodedReport = JSON.parse(decodedString);

        setVulnerabilities(decodedReport.vulnerabilities || []);
        setReportSections(decodedReport.reportSections || []);
        setReportDate(formatDate(decodedReport.date) || "");
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
  <Box sx={{ minHeight: "100vh", p: 3, background: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)", }}>
    {/* Render the alpha banner if an audit already exists */}
    {auditExists && <AlphaBanner />}
    {!auditExists && !loadingAudit && (
  <Paper
    sx={{
      maxWidth: 700,
      mx: "auto",
      mt: 4,
      p: 4,
      boxShadow: 3,
      borderRadius: 2, // rounded corners for a modern look
      backgroundColor: "background.paper",
    }}
  >
    <Typography variant="h4" gutterBottom align="center" sx={{ mt: 2, mb: 5 }}>
      Run Audit
    </Typography>

    {/* STEP 1: Connect Freighter Wallet */}
    <Box sx={{ mb: 4, textAlign: "left" }}>
      <Typography variant="subtitle1" gutterBottom>
        STEP 1: Connect Freighter Wallet
      </Typography>
      {publicKey ? (
        <Typography variant="body2" color="secondary">
          {publicKey}
        </Typography>
      ) : (
        <Button
          variant="contained"
          onClick={handleConnectStellar}
          sx={{
            display: "inline-block",
            mt: 1,
            bgcolor: "#448696",
            '&:hover': {
              bgcolor: "#375e6f",
            },
          }}
        >
          Connect Freighter
        </Button>
      )}
      {!isFreighterInstalled && <FreighterBanner />}
    </Box>

    {/* STEP 2: Upload Smart Contract */}
    <Box sx={{ mb: 4, textAlign: "left" }}>
      <Typography variant="subtitle1" gutterBottom>
        STEP 2: Upload Smart Contract
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Button
          disabled={auditExists}
          variant="contained"
          component="label"
          sx={{
            bgcolor: "#448696",
            '&:hover': {
              bgcolor: "#375e6f",
            },
          }}
        >
          {uploadedFile ? "Change File" : "Upload File"}
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        {uploadedFile && (
          <Typography variant="body2" color="secondary" sx={{ ml: 2 }}>
            {fileName}
          </Typography>
        )}
      </Box>
    </Box>

    {/* STEP 3: Generate Report */}
    <Box sx={{ textAlign: "center" }}>
      {!canGenerateReport && !reportGenerating && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 1, fontStyle: "italic" }}
        >
          Please connect your wallet and upload a file first.
        </Typography>
      )}
      <LoadingButton
        fullWidth
        variant="contained"
        loading={reportGenerating}
        onClick={handleGenerateReport}
        disabled={!canGenerateReport}
        sx={{ display: "block", mt: 1, mb: 1, py: 2,
          bgcolor: "#448696",
          '&:hover': {
            bgcolor: "#375e6f",
          },
        }}
      >
        Generate Audit Report
      </LoadingButton>
      {reportGenerating && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Generating report...
          </Typography>
        </Box>
      )}
    </Box>
  </Paper>
)}

    {/* REPORT SECTION */}
    {vulnerabilities.length > 0 && (
      <Paper sx={{ mt: 6, mx: "auto", maxWidth: 800, p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center">
          Security Audit Report
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {fileName}
        </Typography>

        <Typography variant="subtitle1" align="center" gutterBottom>
          {reportDate}
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. Overview
          </Typography>
        </Box>

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
              {index + 2}. {section.title}
            </Typography>
            <Typography variant="body1">{section.content}</Typography>
          </Box>
        ))}

        {/* Findings Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            5. Findings
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
                <strong>File:</strong> {fileName}
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
