// src/pages/AuditResults.js
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
  },
  item: {
    margin: theme.spacing(1, 0),
  },
}));

export default function AuditResults({ auditId }) {
  const classes = useStyles();
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    if (!auditId) return;
    fetch(`/api/audits/${auditId}/results`)
      .then((res) => res.json())
      .then((data) => {
        setFindings(data.findings || []);
      })
      .catch((err) => console.error("Results error", err));
  }, [auditId]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Audit Results
        </Typography>
        <List>
          {findings.map((finding, idx) => (
            <ListItem className={classes.item} key={idx}>
              <Typography variant="body1">
                {finding.severity.toUpperCase()} - {finding.description}
              </Typography>
            </ListItem>
          ))}
        </List>
        {findings.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No findings or audit data not available yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
