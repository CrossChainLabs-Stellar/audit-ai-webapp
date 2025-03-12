import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ py: 6, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ mb: 4 }}>
          About Auditron
        </Typography>
        
        {/* About the Product Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About the Product
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Accelerate smart contract security through fast and cost-effective audits
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Auditron is an AI-powered application designed to help dApp developers quickly and securely audit smart contracts at a fraction of the cost of traditional audits.
            By leveraging advanced AI models and machine learning techniques, Auditron provides developers with rapid, reliable security audits, enhancing the development lifecycle while minimizing the risk of security vulnerabilities.
            Additionally, Auditron empowers security audit organizations to scale their operations by automating the audit process, enabling them to handle more contracts with the same resources.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Problem:</strong> With the increase in blockchain adoption, security risks in smart contracts are becoming a critical concern. Traditional audits are time-consuming, expensive, and may not be accessible to smaller teams or projects. Audit firms themselves often struggle with scalability due to limited resources.
          </Typography>
          <Typography variant="body1">
            <strong>Solution:</strong> Auditron offers a fast, secure, and cost-effective way for developers and audit organizations to perform smart contract audits. Features include instant AI-driven audits, comprehensive PDF reports, GitHub integration, multi-chain support starting with Soroban, and continuous learning to improve audit capabilities.
          </Typography>
        </Box>
        
        {/* About the Team Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About the Team
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">
                    Andreea Stefan
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    Co-founder and CEO
                  </Typography>
                  <Typography variant="body2">
                    Former Architect @ ConsenSys.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">
                    George Robert
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    Co-founder and CTO
                  </Typography>
                  <Typography variant="body2">
                    Former Senior Engineer @ ConsenSys.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
