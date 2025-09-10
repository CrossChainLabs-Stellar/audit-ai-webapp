import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
  TextField,
  IconButton,
  Link as MuiLink,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import ShieldIcon from '@mui/icons-material/GppGood';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/ManageSearch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SCFLogoBlack from '../assets/SCFLogoSVG-black.svg';
import Client from '../utils/client.js';

export default function Home() {
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
      setStatusMessage(response.message || "Successfully signed up!");
      setEmail('');
    } catch (error) {
      console.error("Waitlist signup error:", error);
      setStatusMessage("Signup failed. Please try again later.");
    }
  };

  // Shared styles
  const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  const glass = {
    backdropFilter: 'blur(10px)',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.2)'
  };

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      {/* Hero */}
      <Box sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: 420, md: 560 },
        background: gradient,
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'black', opacity: 0.08 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" fontWeight={800} sx={{ letterSpacing: -0.5, mb: 2 }}>Auditron</Typography>
          <Typography variant="h5" sx={{ color: 'grey.100', mb: 4 }}>
            Fast, secure, and affordable smart contract audits for the Stellar ecosystem
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              sx={{ bgcolor: '#fff', color: '#764ba2', fontWeight: 700, px: 4, py: 1.5, '&:hover': { bgcolor: 'grey.100', transform: 'translateY(-2px)' }, boxShadow: 3 }}
              startIcon={<SearchIcon />}
            >
              Start Audit Now
            </Button>
            <Button
              variant="text"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{ ...glass, color: '#fff', px: 4, py: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}
              href="#demo"
            >
              Watch Demo
            </Button>
          </Stack>
        </Container>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #f9fafb, transparent)' }} />
      </Box>

      {/* Award */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
        <Container maxWidth="md">
          <Box sx={{
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            border: '1px solid',
            borderColor: 'warning.light',
            background: 'linear-gradient(135deg, #FFFAE6, #FFF4E5)'
          }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', mx: 'auto', mb: 3, background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
              <StarIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" textAlign="center" fontWeight={800} gutterBottom>
              Winner of the SCF Kickstart Award
            </Typography>
            <Typography textAlign="center" color="text.secondary" sx={{ maxWidth: 740, mx: 'auto' }}>
              We're proud to be recognized for our dedication to top-tier security and innovation in the Stellar ecosystem.
            </Typography>
            <Stack alignItems="center" sx={{ mt: 3 }}>
              <MuiLink href="https://communityfund.stellar.org/project/auditai-lv1" target="_blank" rel="noopener noreferrer">
                <Box component="img" src={SCFLogoBlack} alt="SCF Kickstart Award" sx={{ width: 96, height: 'auto' }} />
              </MuiLink>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Dashboard Preview (MacBook Mock) */}
      <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>Security Dashboard</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>Monitor and audit DeFi projects in real-time</Typography>

          {/* Laptop Frame */}
          <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
            <Box sx={{ backgroundColor: '#1f2937', borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 2, pb: 0, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)' }}>
              {/* traffic lights */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Box sx={{ width: 12, height: 12, bgcolor: '#ef4444', borderRadius: '50%' }} />
                  <Box sx={{ width: 12, height: 12, bgcolor: '#f59e0b', borderRadius: '50%' }} />
                  <Box sx={{ width: 12, height: 12, bgcolor: '#22c55e', borderRadius: '50%' }} />
                </Stack>
                <Typography variant="caption" color="grey.400">Auditron Dashboard</Typography>
                <Box sx={{ width: 64 }} />
              </Stack>

              {/* Screen */}
              <Box sx={{ position: 'relative', p: 2, minHeight: 480, background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: 1 }}>
                <Box sx={{ position: 'absolute', inset: 16, borderRadius: 2, bgcolor: '#fff', overflow: 'hidden', boxShadow: 'inset 0 1px 6px rgba(0,0,0,0.06)' }}>
                  <Box component="img" alt="dashboard preview" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3c02dca6c3-cf8199a0dc99dc05d947.png" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                  {/* Coming soon overlay */}
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.95)', display: 'grid', placeItems: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                      <Box sx={{ width: 80, height: 80, borderRadius: '50%', display: 'grid', placeItems: 'center', background: gradient }}>
                        <RocketLaunchIcon sx={{ color: '#fff', fontSize: 32 }} />
                      </Box>
                      <Typography variant="h4" fontWeight={800}>Coming Soon</Typography>
                      <Typography color="text.secondary">Advanced security dashboard for comprehensive DeFi project monitoring</Typography>
                      <Stack direction="row" spacing={3} color="text.secondary">
                        <Stack direction="row" spacing={1} alignItems="center"><InsertChartOutlinedIcon fontSize="small"/><Typography variant="body2">Real-time Analytics</Typography></Stack>
                        <Stack direction="row" spacing={1} alignItems="center"><ShieldIcon fontSize="small"/><Typography variant="body2">Security Scoring</Typography></Stack>
                        <Stack direction="row" spacing={1} alignItems="center"><QueryStatsIcon fontSize="small"/><Typography variant="body2">Detailed Reports</Typography></Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Base */}
            <Box sx={{ backgroundColor: '#374151', height: 24, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, mx: 4, position: 'relative' }}>
              <Box sx={{ position: 'absolute', insetX: 0, top: 0, height: 6, bgcolor: '#4b5563', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: 10, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight={800} gutterBottom>Comprehensive Security Solutions</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 900, mx: 'auto' }}>
              Advanced tools and methodologies to ensure your Stellar smart contracts are secure, efficient, and ready for production.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {[
              { title: 'Quick Audits', desc: 'Simply upload your Soroban smart contract and get audited instantly, saving you both time and money.', icon: <BoltIcon /> , bgFrom:'#eff6ff', border:'#bfdbfe' },
              { title: 'Real-Time Progress', desc: 'View audit progress as it happens. Detect vulnerabilities on the fly, ensuring your smart contracts deploy faster and safer.', icon: <QueryStatsIcon /> , bgFrom:'#ecfdf5', border:'#a7f3d0' },
              { title: 'Detailed Reports', desc: 'Receive clear, AI-powered reports that highlight security issues, optimization tips, and best practice recommendations.', icon: <InsertChartOutlinedIcon /> , bgFrom:'#f5f3ff', border:'#ddd6fe' },
            ].map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: f.border, background: f.bgFrom, transition: 'all .2s', '&:hover': { boxShadow: 6 } }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: 2, display: 'grid', placeItems: 'center', mb: 2, background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' }}>
                    {f.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={800} gutterBottom>{f.title}</Typography>
                  <Typography color="text.secondary">{f.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats 
      <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              { value: '500+', label: 'Contracts Audited', color: '#667eea' },
              { value: '99.9%', label: 'Accuracy Rate', color: '#22c55e' },
              { value: '2,000+', label: 'Vulnerabilities Found', color: '#f59e0b' },
              { value: '24/7', label: 'Support Available', color: '#8b5cf6' },
            ].map((s, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Card elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                  <Typography variant="h3" fontWeight={800} sx={{ color: s.color, mb: 1 }}>{s.value}</Typography>
                  <Typography color="text.secondary" fontWeight={600}>{s.label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* Technology */}
      <Box sx={{ py: 10, bgcolor: '#fff' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>Built for the Stellar Ecosystem</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
            Leveraging cutting-edge technology and deep integration with Stellar blockchain infrastructure for unparalleled security analysis.
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: <LanguageIcon sx={{ color: '#ea580c' }} />, name: 'Rust' },
              { icon: <LanguageIcon sx={{ color: '#2563eb' }} />, name: 'Soroban' },
              { icon: <StarIcon sx={{ color: '#f59e0b' }} />, name: 'Stellar' },
              { icon: <BoltIcon sx={{ color: '#7c3aed' }} />, name: 'AI Analysis' },
              { icon: <ShieldIcon sx={{ color: '#16a34a' }} />, name: 'Security' },
            ].map((t, i) => (
              <Grid item xs={6} md={2.4} key={i}>
                <Stack alignItems="center" spacing={1.5}>
                  <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: 'grey.100', display: 'grid', placeItems: 'center' }}>{t.icon}</Box>
                  <Typography fontWeight={700}>{t.name}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Demo Anchor 
      <Box id="demo" sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight={800} textAlign="center" gutterBottom>
            Demo Video: See Auditron in Action
          </Typography>
          <Box sx={{ position: 'relative', pt: '56.25%', borderRadius: 2, overflow: 'hidden', boxShadow: 3, mt: 2 }}>
            <Box component="iframe"
                 src="https://www.youtube.com/embed/2URaB5ZThZI?rel=0"
                 title="Audit AI Demo Video"
                 frameBorder={0}
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowFullScreen
                 sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          </Box>
        </Container>
      </Box>*/}

      {/* Newsletter / Waitlist */}
      <Box sx={{ py: 10, background: gradient }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', color: '#fff' }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>Join to Stay Informed</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Be the first to know about Auditron's latest updates and releases. Join below to stay informed.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <TextField
              placeholder="Enter your email address"
              variant="outlined"
              size="medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', sm: 320 }, bgcolor: '#fff', borderRadius: 2 }}
            />
            <Button onClick={handleSignup} variant="contained" sx={{ bgcolor: '#fff', color: '#764ba2', fontWeight: 700, px: 4, '&:hover': { bgcolor: 'grey.100' } }}>
              Join
            </Button>
          </Stack>
          {statusMessage && (
            <Typography variant="body2" sx={{ mt: 2, color: '#fff' }}>{statusMessage}</Typography>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: '#0f172a', color: 'grey.300', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, background: gradient, display: 'grid', placeItems: 'center' }}>
                  <ShieldIcon sx={{ color: '#fff' }} />
                </Box>
                <Typography variant="h6" fontWeight={800} color="#fff">Auditron</Typography>
              </Stack>
              <Typography color="grey.400" sx={{ maxWidth: 420, mb: 2 }}>
                Securing the future of DeFi on Stellar with advanced smart contract auditing solutions.
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                  <TwitterIcon sx={{ color: 'grey.300' }} />
                </IconButton>
                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                  <GitHubIcon sx={{ color: 'grey.300' }} />
                </IconButton>
                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                  <LinkedInIcon sx={{ color: 'grey.300' }} />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" color="#fff" fontWeight={700} gutterBottom>Product</Typography>
              <Stack spacing={1}>
                <MuiLink component={Link} to="/dashboard" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Dashboard</MuiLink>
                <MuiLink component={Link} to="/dashboard" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Audit Now</MuiLink>
                <MuiLink component={Link} to="/reports" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Reports</MuiLink>
                <MuiLink component={Link} to="/analytics" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Analytics</MuiLink>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" color="#fff" fontWeight={700} gutterBottom>Company</Typography>
              <Stack spacing={1}>
                <MuiLink component={Link} to="/about" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>About</MuiLink>
                <MuiLink component={Link} to="/contact" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Contact</MuiLink>
                <MuiLink component={Link} to="/privacy" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Privacy Policy</MuiLink>
                <MuiLink component={Link} to="/terms" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Terms of Service</MuiLink>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 4 }} />

          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
            <Typography color="grey.500">© {new Date().getFullYear()} Auditron. All rights reserved.</Typography>
            <Stack direction="row" spacing={3}>
              <MuiLink component={Link} to="/privacy" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Privacy Policy</MuiLink>
              <MuiLink component={Link} to="/about" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>About</MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit" underline="none" sx={{ '&:hover': { color: '#fff' } }}>Contact</MuiLink>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
