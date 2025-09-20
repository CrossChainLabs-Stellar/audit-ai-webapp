import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Link } from "@mui/material";
import { LinkedIn } from "@mui/icons-material";
import { BRAND } from "../theme/AppTheme";

import AndreeaAvatar from "../assets/Andreea.jpeg";
import GeorgeAvatar from "../assets/George.jpeg";

export default function About() {
  return (
    <Box sx={{ py: 6, backgroundColor: BRAND.dark, }}>
      <Container maxWidth="lg" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h3" align="center" sx={{ mb: 4 }}>
          About Auditron
        </Typography>

        {/* About the Product Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ height: 80 }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            Auditron is an AI-powered security benchmarking platform for the Stellar ecosystem.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            It continuously scan, audit, and benchmark Soroban projects, assigning each a transparent security score.
          </Typography>

          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li">
              <strong>For developers</strong> → actionable feedback and affordable audits.
            </Typography>
            <Typography component="li">
              <strong>For investors &amp; users</strong> → trusted visibility into project security.
            </Typography>
            <Typography component="li">
              <strong>For the community</strong> → a transparent standard that raises security across Stellar DeFi.
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 1 }}>
            Projects that meet the security standards are awarded the <strong>Auditron Certification Seal</strong>, 
            a mark of trust and reliability.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Auditron transforms auditing from a closed process into an <strong>open, ongoing measure of trust</strong>, 
            setting the <strong>security standard for the Stellar ecosystem</strong>.
          </Typography>
        </Box>

        {/* About the Team Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About the Team
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={AndreeaAvatar}
                      alt="Andreea Stefan"
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        Andreea Stefan
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Co-founder and CEO
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    Former Architect @ ConsenSys.<br />Co-founder of{" "}
                    <Link href="https://sorobanpulse.com" target="_blank" rel="noopener noreferrer">
                      SorobanPulse
                    </Link>.
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Link
                      href="https://www.linkedin.com/in/andreea-stefan-66740b20/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedIn fontSize="large" />
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={GeorgeAvatar}
                      alt="George Robert"
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        George Robert
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Co-founder and CTO
                      </Typography>
                    </Box>
                  </Box>
                    <Typography variant="body2">
                      Former Senior Engineer @ ConsenSys.<br />Co-founder of{" "}
                      <Link href="https://sorobanpulse.com" target="_blank" rel="noopener noreferrer">
                        SorobanPulse
                      </Link>.
                    </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Link
                      href="https://www.linkedin.com/in/george-robert-stefan-13385a9a/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedIn fontSize="large" />
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
