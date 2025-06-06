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

export default function Contact() {
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

  // Handle sending a contact message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!contactEmail || !message) {
      setContactStatus('Please provide your email and message.');
      return;
    }
    try {
      const response = await client.sendContactMessage({ name, email: contactEmail, subject, message });
      setContactStatus(response.message || "Message sent successfully!");
      // Clear the contact form
      setName('');
      setContactEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error("Contact message error:", error);
      setContactStatus("Failed to send message. Please try again later.");
    }
  };

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
      {/* Page Header */}
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        Get In Touch
      </Typography>

      {/* Card with Contact Form and Image */}
      <Card 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Form Section */}
        <CardContent 
          sx={{
            flex: '1 0 auto',
            backgroundColor: '#f0f0f0',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            We'd love to hear from you! Please fill out the form below.
          </Typography>
          <Box component="form" onSubmit={handleSendMessage} noValidate sx={{ mb: 2 }}>
            <Stack spacing={2}>
              <TextField 
                label="Name" 
                variant="outlined" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                fullWidth 
              />
              <TextField 
                label="Email Address" 
                variant="outlined" 
                type="email" 
                required 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                fullWidth 
              />
              <TextField 
                label="Subject" 
                variant="outlined" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                fullWidth 
              />
              <TextField 
                label="Message" 
                variant="outlined" 
                multiline 
                rows={4} 
                required 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                fullWidth 
              />
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                sx={{
                  backgroundColor: '#6ca4a4',
                  ':hover': { backgroundColor: '#5c9292' },
                }}
              >
                Send Message
              </Button>
            </Stack>
          </Box>
          {contactStatus && (
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {contactStatus}
            </Typography>
          )}
        </CardContent>

        {/* Image Section */}
        <CardMedia
          component="img"
          sx={{
            width: matches ? '50%' : '100%',
            objectFit: 'cover',
          }}
          image={contactImage}
          alt="Contact"
        />
      </Card>

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
