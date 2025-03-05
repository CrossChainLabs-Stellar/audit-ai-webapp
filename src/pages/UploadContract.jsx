// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./Login";
import Home from "./Home";
import UploadContract from "./UploadContract";
import AuditProgress from "./AuditProgress";
import AuditResults from "./AuditResults";

// Components
import AuditAINavbar from "../components/AuditAINavbar";

function NotFound() {
  return <h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>;
}

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [auditId, setAuditId] = useState(null);

  const handleLogin = (pk) => {
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
    window.location.href = "/results";
  };

  return (
    <Router>
      <AuditAINavbar publicKey={publicKey} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
