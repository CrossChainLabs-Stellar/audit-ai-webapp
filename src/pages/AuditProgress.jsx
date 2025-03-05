// src/pages/AuditProgress.js
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(8),
    textAlign: "center",
    padding: theme.spacing(4),
  },
  progress: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function AuditProgress({ auditId, onComplete }) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    if (!auditId) return;

    // Example polling or WebSocket approach:
    const interval = setInterval(() => {
      fetch(`/api/audits/${auditId}/status`)
        .then((res) => res.json())
        .then((data) => {
          setProgress(data.progress); // e.g. 0 - 100
          setStatus(data.status);     // e.g. "Running...", "Completed"
          if (data.status === "Completed") {
            clearInterval(interval);
            onComplete(); // e.g. navigate to results page
          }
        })
        .catch((err) => console.error("Progress error", err));
    }, 3000);

    return () => clearInterval(interval);
  }, [auditId, onComplete]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Auditing Your Contract
        </Typography>
        <Typography variant="body1">{status}</Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          className={classes.progress}
        />
        <Typography variant="body2">{progress}%</Typography>
        <Button
          variant="contained"
          disabled
          color="default"
        >
          Cancel (not implemented)
        </Button>
      </CardContent>
    </Card>
  );
}
