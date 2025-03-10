import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

export default function AlphaBanner() {
  return (
    <Box sx={{ mb: 2, p: 2, backgroundColor: '#fff3cd', borderRadius: 1 }}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Alpha Release - Preview Version
      </Alert>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Welcome to AuditAI's alpha release! This preview version allows you to generate one report.
        Subscribe to our waiting list to stay informed about the latest updates and releases.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/waitlist"
      >
        Subscribe to Waiting List
      </Button>
    </Box>
  );
}
