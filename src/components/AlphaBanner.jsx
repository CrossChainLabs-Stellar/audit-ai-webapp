import React, { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack } from '@mui/material';
import { Client } from '../utils/client';

export default function AlphaBanner() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const client = new Client();

  const handleSignup = async () => {
    if (!email) {
      setStatusMessage('Please enter an email.');
      return;
    }
    try {
      const response = await client.waitlist(email);
      setStatusMessage(response.message || 'Successfully signed up!');
    } catch (error) {
      console.error('Waitlist signup error:', error);
      setStatusMessage('Signup failed. Please try again later.');
    }
  };

  return (
    <Box sx={{ mb: 2, p: 2, backgroundColor: '#fff3cd', borderRadius: 1 }}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Alpha Release - Preview Version
      </Alert>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Welcome to AuditAI's alpha release! This preview version allows you to generate one report.
        Subscribe to our waiting list to stay informed about the latest updates and releases.
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          label="Email Address"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: '20rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          sx={{
            backgroundColor: '#6ca4a4',
            ':hover': { backgroundColor: '#5c9292' },
          }}
        >
          Sign Up
        </Button>
      </Stack>
      {statusMessage && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {statusMessage}
        </Typography>
      )}
    </Box>
  );
}
