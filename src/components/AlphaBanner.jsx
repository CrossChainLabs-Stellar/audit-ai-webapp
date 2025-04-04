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
    <Box 
      sx={{ 
        mb: 2,
        p: 3,
        maxWidth: '800px',   // Limits the banner width
        margin: '0 auto',    // Centers the banner
        background: 'linear-gradient(135deg, #4ca1af, #c4e0e5)', 
        borderRadius: 1, 
        boxShadow: 3,
        position: 'relative' 
      }}
    >
      <Alert 
        severity="info" 
        sx={{ 
          mt: 2, 
          mb: 2, 
          backgroundColor: 'rgba(255,255,255,0.7)', 
          color: 'black',
          border: '1px solid rgba(0,0,0,0.3)'
        }}
      >
        This alpha release allows you to generate one report only!
      </Alert>

      <Typography variant="body1" align="left" sx={{ marginBottom: '1rem', ml: '3px', fontSize: '15px'}}>
        Thank you for testing Auditron!<br/>Sign up to stay informed about the latest updates and releases.
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <TextField
          label="Email Address"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ 
            width: '20rem',
            fontSize: '15px',
            backgroundColor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: '#c4e0e5' },
              '&.Mui-focused fieldset': { borderColor: '#c4e0e5' },
            },
            '& .MuiInputLabel-root': {
              color: 'grey',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'grey',
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          sx={{
            bgcolor: "#448696",
            '&:hover': {
              bgcolor: "#375e6f",
            },
          }}
        >
          Sign Up
        </Button>
      </Stack>

      {statusMessage && (
        <Typography variant="body2" sx={{ mt: 2, color: 'black' }}>
          {statusMessage}
        </Typography>
      )}
    </Box>
  );
}
