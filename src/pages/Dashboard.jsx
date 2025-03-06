import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, CircularProgress, Paper, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { isConnected, requestAccess } from "@stellar/freighter-api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import reportData from "../test/reportData.json";

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
        alert("Freighter wallet not found. Please install the Freighter extension.");
        return;
      }
      const accessObj = await requestAccess();
      if (accessObj.error) {
        alert(`Error: ${accessObj.error}`);
        return;
      }
      const pk = accessObj.address;
      setPublicKey(pk);
      onLogin(pk);
    } catch (error) {
      console.error("Stellar wallet connection error: ", error);
    }
  };

  const handleGenerateReport = async () => {
    if (!publicKey) {
      await handleConnectStellar();
      if (!publicKey) return;
    }

    if (!projectName || !uploadedFile) {
      alert("Please provide project name and upload a file.");
      return;
    }

    setReportGenerating(true);

    setTimeout(() => {
      const updatedVulnerabilities = reportData.vulnerabilities.map((vuln) => ({
        ...vuln,
        file: uploadedFile ? uploadedFile.name : vuln.file,
      }));
      setVulnerabilities(updatedVulnerabilities);
      setReportSections(reportData.reportSections);
      setReportGenerating(false);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const severityCounts = vulnerabilities.reduce((acc, vuln) => {
    acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "High", value: severityCounts.High || 0 },
    { name: "Medium", value: severityCounts.Medium || 0 },
    { name: "Low", value: severityCounts.Low || 0 },
  ];

  return (
    <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "#f9fafb" }}>
      <Paper sx={{ maxWidth: 700, mx: "auto", p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Run Audit
        </Typography>

        <TextField
          fullWidth
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
          Upload File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>

        <LoadingButton
          fullWidth
          variant="contained"
          loading={reportGenerating}
          onClick={handleGenerateReport}
          sx={{ py: 1.5 }}
        >
          Generate Report
        </LoadingButton>

        {!isFreighterInstalled && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            Please install Freighter wallet.
          </Typography>
        )}

        {reportGenerating && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Paper>

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

          <PieChart width={350} height={350} style={{ margin: "auto" }}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  {vuln.id} <span style={severityStyles[vuln.severity]}>{vuln.severity} Severity</span>{" "}
                  {vuln.title}
                </Typography>
                <Typography variant="body2">
                  <strong>File:</strong> {vuln.file}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {vuln.description}
                </Typography>
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
