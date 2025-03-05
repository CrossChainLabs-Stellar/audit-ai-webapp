// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { isConnected, requestAccess, getAddress } from "@stellar/freighter-api";

const useStyles = makeStyles(() => ({
  container: {
    width: "100vw",
    height: "100vh", // ✅ Full height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #7f53ac 0%, #647dee 100%)",
  },
  root: {
    maxWidth: 600,
    padding: 20,
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Subtle shadow for better visibility
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
  },
}));

export default function Login({ onLogin }) {
  const classes = useStyles();
  const [publicKey, setPublicKey] = useState(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);

  useEffect(() => {
    // Check if Freighter is installed
    const checkFreighter = async () => {
      const connectionStatus = await isConnected();
      console.log('connectionStatus', connectionStatus);
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

      // Request access from Freighter
      const accessObj = await requestAccess();
      if (accessObj.error) {
        alert(`Error: ${accessObj.error}`);
        return;
      }

      const pk = accessObj.address;
      setPublicKey(pk);
      onLogin(pk); // Notify parent component

    } catch (error) {
      console.error("Stellar wallet connection error: ", error);
    }
  };

  return (
    <div className={classes.container}>
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          AuditAI Login
        </Typography>

        {!isFreighterInstalled ? (
          <Typography variant="body2" color="error">
            Freighter wallet is not installed! Please install it to continue.
          </Typography>
          ) : publicKey ? (
            <>
              <Typography variant="body1">
                Connected Stellar Account: <strong>
                  {publicKey
                    ? `${publicKey.slice(0, 6)}...${publicKey.slice(-6)}`
                    : ""}
                </strong>
              </Typography>
            <Typography variant="body2" color="textSecondary">
              You are now logged in.
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleConnectStellar}
          >
            Connect with Freighter
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
  );
}
