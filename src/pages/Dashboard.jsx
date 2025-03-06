import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  List,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { isConnected, requestAccess } from "@stellar/freighter-api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard({ onLogin }) {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [reportGenerating, setReportGenerating] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  
  // Standard colors for pie chart slices (order: High, Medium, Low)
  const COLORS = ["#FF6666", "#FFA500", "#4CAF50"];

  // Custom severity label styles
  const severityStyles = {
    High: {
      backgroundColor: "#FF6666",
      color: "white",
      padding: "2px 4px",
      borderRadius: "4px",
      fontWeight: "bold",
    },
    Medium: {
      backgroundColor: "#FFA500",
      color: "white",
      padding: "2px 4px",
      borderRadius: "4px",
      fontWeight: "bold",
    },
    Low: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "2px 4px",
      borderRadius: "4px",
      fontWeight: "bold",
    },
  };

  // Report Sections (non-findings content)
  const reportSections = [
    {
      title: "Summary",
      content:
        "This report provides a comprehensive audit of the Stellar Contracts Library, version 0.1.0-RC. The analysis covers the scope, system overview, and a detailed breakdown of security issues.",
    },
    {
      title: "Scope",
      content:
        "The audit examined the OpenZeppelin/stellar-contracts repository at a specific commit. In-scope files include those within the token/fungible and pausable directories.",
    },
    {
      title: "System Overview",
      content:
        "The Soroban mainnet launched in February 2024, making smart contract deployment on Stellar possible. This audit evaluates key modules in the Stellar Contracts Library.",
    },
    {
      title: "Security Model and Trust Assumptions",
      content:
        "The audit assumes the inherent security of the Soroban SDK and related dependencies. It is the responsibility of developers to integrate and customize the library functions carefully.",
    },
    {
      title: "Conclusion",
      content:
        "The audit concludes that while the Stellar Contracts Library is robust and well-documented, certain areas—particularly in security checks and macro handling—require further attention to ensure long-term reliability.",
    },
  ];

  useEffect(() => {
    // Check if Freighter is installed
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
    // If not logged in, prompt wallet login
    if (!publicKey) {
      await handleConnectStellar();
      if (!publicKey) return;
    }

    // Validate project name and file upload
    if (!projectName) {
      alert("Please enter your project name.");
      return;
    }
    if (!uploadedFile) {
      alert("Please upload a file.");
      return;
    }

    // Begin report generation
    setReportGenerating(true);
    // Simulate AI report generation with a timeout (3 seconds)
    setTimeout(() => {
      // Dummy findings data with six findings for demonstration
      const dummyVulnerabilities = [
        {
          id: "5.1",
          severity: "Medium",
          title: "Missing event emissions",
          file: uploadedFile ? uploadedFile.name : "<name_of_uploaded_file>",
          description:
            "Contracts are missing event emissions for important state changes, such as owner/admin address updates, token address changes, and initialization.",
          recommendation:
            "Consider emitting events in the functions where state changes occur.",
        },
        {
          id: "5.2",
          severity: "Low",
          title: "Getter functions with @external visibility",
          file: uploadedFile ? uploadedFile.name : "<name_of_uploaded_file>",
          description:
            "Several functions declared as getters use the @external decorator despite not modifying state.",
          recommendation:
            "Review function decorators and consider using @view for pure getters.",
        },
        {
          id: "5.3",
          severity: "High",
          title: "Improper access control in token minting",
          file: uploadedFile ? uploadedFile.name : "<name_of_uploaded_file>",
          description:
            "The token minting function lacks strict access control measures, potentially allowing unauthorized minting of tokens.",
          recommendation:
            "Implement robust access control checks to restrict minting operations.",
        },
        {
          id: "5.4",
          severity: "Medium",
          title: "Inconsistent state validation",
          file: uploadedFile ? uploadedFile.name : "<name_of_uploaded_file>",
          description:
            "Some functions perform state validation inconsistently, which may lead to unexpected behaviors.",
          recommendation:
            "Standardize state validation logic across all functions.",
        },
        {
          id: "5.5",
          severity: "Low",
          title: "Inadequate error messages",
          file: uploadedFile ? uploadedFile.name : "<name_of_uploaded_file>",
          description:
            "Error messages in several parts of the contract are vague and do not provide sufficient context for debugging.",
          recommendation:
            "Enhance error messages to be more descriptive and helpful for troubleshooting.",
        },
        {
          id: "5.6",
          severity: "High",
          title: "Potential reentrancy vulnerability",
          file: uploadedFile ? uploadedFile.name : "<name_of_uploaded_file>",
          description:
            "Certain external calls are unprotected, which could lead to reentrancy attacks if exploited.",
          recommendation:
            "Introduce reentrancy guards and validate external calls appropriately.",
        },
      ];
      setVulnerabilities(dummyVulnerabilities);
      setReportGenerating(false);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  // Compute severity counts for the Overview section
  const severityCounts = vulnerabilities.reduce((acc, vuln) => {
    acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
    return acc;
  }, {});
  const totalFindings = vulnerabilities.length;
  const pieData = [
    { name: "High", value: severityCounts.High || 0 },
    { name: "Medium", value: severityCounts.Medium || 0 },
    { name: "Low", value: severityCounts.Low || 0 },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        p: 3,
      }}
    >
      {/* Audit Form Container */}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom color="text.primary">
          Run Audit
        </Typography>

        {/* Project Name and File Upload */}
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField
            fullWidth
            name="project"
            label="Project"
            placeholder="Enter your project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
        </Box>

        {/* Generate Report Button */}
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={handleGenerateReport}
          sx={{ mt: 3, py: 1.5 }}
          loading={reportGenerating}
        >
          Generate Report using AI
        </LoadingButton>

        {/* Progress Indicator */}
        {reportGenerating && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Freighter Wallet Warning */}
        {!isFreighterInstalled && (
          <Typography variant="body2" color="error" sx={{ mt: 3 }}>
            Freighter wallet is not installed! Please install it to continue.
          </Typography>
        )}
      </Box>

      {/* Report Layout */}
      {totalFindings > 0 && (
        <Box
          sx={{
            mt: 6,
            mx: "auto",
            maxWidth: 800,
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* Title Section */}
          <Typography variant="h4" align="center" gutterBottom>
            Security Audit Report
          </Typography>
          <Typography variant="h4" align="center" gutterBottom>
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

          {/* Overview Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1">
              Total Findings: {totalFindings} (High: {severityCounts.High || 0}, Medium: {severityCounts.Medium || 0}, Low: {severityCounts.Low || 0})
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          </Box>

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
                  {vuln.id} [<span style={severityStyles[vuln.severity]}>{vuln.severity} Severity</span>]{" "}
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
        </Box>
      )}
    </Box>
  );
}
