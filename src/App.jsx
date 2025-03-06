// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./theme/theme-provider";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

// Components
import AuditAINavbar from "./components/AuditAINavbar";

function App() {
  const [publicKey, setPublicKey] = useState(null);

  const handleLogin = (pk) => {
    setPublicKey(pk);
  };

  return (
    <ThemeProvider>
      <Router>
        <AuditAINavbar publicKey={publicKey} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard onLogin={handleLogin} />} />
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
