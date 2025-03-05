// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//import theme from "./theme"; // example theme file from boilerplate
import { ThemeProvider } from "./theme/theme-provider";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UploadContract from "./pages/UploadContract";
import AuditProgress from "./pages/AuditProgress";
import AuditResults from "./pages/AuditResults";

// Components
import AuditAINavbar from "./components/AuditAINavbar";

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [auditId, setAuditId] = useState(null);

  const handleLogin = (pk) => {
    console.log('App[handleLogin]', pk);
    setPublicKey(pk);
  };

  const handleContractUploaded = async (file) => {
    try {
      const formData = new FormData();
      formData.append("contract", file);

      // Suppose your backend endpoint is /api/audits
      const response = await fetch("/api/audits", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setAuditId(data.auditId); // store the returned job ID
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const handleAuditComplete = () => {
    // Navigate to results page after finishing.
    // With React Router, we might do a programmatic Navigate
    // or let <AuditProgress> do it. For simplicity:
    window.location.href = "/results";
  };

  return (
    <ThemeProvider>
      <Router>
        <AuditAINavbar publicKey={publicKey} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route
            path="/upload"
            element={publicKey ? <UploadContract onContractUploaded={handleContractUploaded} /> : <Navigate to="/login" />}
          />
          <Route
            path="/audit"
            element={auditId ? <AuditProgress auditId={auditId} onComplete={handleAuditComplete} /> : <Navigate to="/upload" />}
          />
          <Route
            path="/results"
            element={auditId ? <AuditResults auditId={auditId} /> : <Navigate to="/upload" />}
          />
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
