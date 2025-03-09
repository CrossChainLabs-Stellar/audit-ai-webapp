import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

export default function FreighterBanner() {
  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="warning" sx={{ mb: 2 }}>
        Freighter wallet not detected. 
      </Alert>
      <Typography variant="body2" sx={{ mb: 2 }}>
        For the best experience, please install the Freighter wallet extension to interact with Stellar.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="https://www.freighter.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Install Freighter
      </Button>
    </Box>
  );
}
