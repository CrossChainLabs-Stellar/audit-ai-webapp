// src/components/Dashboard.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { isConnected, requestAccess } from "@stellar/freighter-api";

export default function Dashboard({ onLogin }) {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);

  useEffect(() => {
    // Check if Freighter is installed
    const checkFreighter = async () => {
      const connectionStatus = await isConnected();
      setIsFreighterInstalled(connectionStatus.isConnected);
    };
    checkFreighter();
  }, []);

  const handleSignIn = useCallback(() => {
    navigate("/");
  }, [navigate]);

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #283E51 0%, #4B79A1 100%)",
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          p: 4,
          textAlign: "center",
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Register
          </Typography>

          {/* Login Form */}
          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              name="project"
              label="Project/Team"
              placeholder="Enter your project or team name"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              name="email"
              label="Email address"
              placeholder="Enter your email address"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Freighter Login */}
          {isFreighterInstalled ? (
            publicKey ? (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1">
                  Connected Account:{" "}
                  <strong>
                    {publicKey.slice(0, 6)}...{publicKey.slice(-6)}
                  </strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  You are now logged in.
                </Typography>
              </Box>
            ) : (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={handleConnectStellar}
                sx={{ mt: 3, py: 1.5 }}
              >
                Connect with Freighter
              </LoadingButton>
            )
          ) : (
            <Typography variant="body2" color="error" sx={{ mt: 3 }}>
              Freighter wallet is not installed! Please install it to continue.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
