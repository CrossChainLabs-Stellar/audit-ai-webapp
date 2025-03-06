import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
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
  const [pieChartData, setPieChartData] = useState([]);

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
    // Simulate AI report generation with a timeout (e.g., 3 seconds)
    setTimeout(() => {
      // Dummy vulnerabilities data for demonstration (also used in the pie chart)
      const dummyVulnerabilities = [
        { name: "SQL Injection", value: 5 },
        { name: "Cross-Site Scripting", value: 3 },
        { name: "Open Redirect", value: 2 },
      ];
      setVulnerabilities(dummyVulnerabilities);
      setPieChartData(dummyVulnerabilities);
      setReportGenerating(false);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  // Colors for pie chart slices
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Report Sections: inspired by the attached report reference
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
      title: "High Severity",
      content:
        "A high severity issue was identified regarding the omission of subsequent attributes when using attribute macros. This could potentially allow unauthorized access if not addressed.",
    },
    {
      title: "Medium Severity",
      content:
        "The approval period restrictions in the fungible token module were noted. While designed to prevent excessive token approval durations, this limitation may require further flexibility in future updates.",
    },
    {
      title: "Low Severity",
      content:
        "Low severity issues include bypassable environment type checks and minor documentation discrepancies. These issues, though not critical, are recommended for resolution to enhance clarity.",
    },
    {
      title: "Notes & Additional Information",
      content:
        "Additional observations include duplicated code in macros, potential unused variables, and recommendations for improved error handling. These suggestions aim to increase the maintainability of the codebase.",
    },
    {
      title: "Conclusion",
      content:
        "The audit concludes that while the Stellar Contracts Library is robust and well-documented, certain areas—particularly in security checks and macro handling—require further attention to ensure long-term reliability.",
    },
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
      {vulnerabilities.length > 0 && (
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
            <List>
              {reportSections.map((section, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={`${index + 1}. ${section.title}`} />
                </ListItem>
              ))}
            </List>
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

          {/* Vulnerabilities Overview */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" gutterBottom>
              Vulnerabilities Overview
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
            <List>
              {vulnerabilities.map((vuln, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${vuln.name}: ${vuln.value} issues`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
}
