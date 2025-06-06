import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Link, 
  TextField, 
  Button, 
  Stack 
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Client } from '../utils/client';
import contactImage from "../assets/Contact.jpg";

export default function Join() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // States for the contact message form
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('');

  // States for waiting list subscription
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');

  const client = new Client();


  // Handle waiting list subscription
  const handleSignup = async () => {
    if (!subEmail) {
      setSubStatus('Please enter an email.');
      return;
    }
    try {
      const response = await client.waitlist(subEmail);
      setSubStatus(response.message || "Successfully signed up!");
      // Optionally clear the waiting list email field
      setSubEmail('');
    } catch (error) {
      console.error("Waitlist signup error:", error);
      setSubStatus("Signup failed. Please try again later.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f4f4', py: 4 }}>


      {/* Waiting List Section */}
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          marginBottom: '3rem',
          marginTop: '3rem',
        }}
        spacing={2}
      >
        <Typography variant="h5" sx={{ color: '#6ca4a4' }}>
          Join to Stay Informed
        </Typography>
        <Typography variant="body1" align="center" sx={{ maxWidth: '30rem', marginBottom: '1rem' }}>
          Be the first to know about Auditron's latest updates and releases. Join below to stay informed.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            value={subEmail}
            onChange={(e) => setSubEmail(e.target.value)}
            sx={{ width: '20rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            sx={{
              backgroundColor: '#6ca4a4',
              ':hover': {
                backgroundColor: '#5c9292',
              }
            }}
          >
            Join
          </Button>
        </Stack>
        {subStatus && (
          <Typography variant="body2" color="text.secondary">
            {subStatus}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
