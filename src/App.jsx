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

  const handleLogout = () => {
    setPublicKey(null);
  };

  return (
    <ThemeProvider>
      <Router>
        <AuditAINavbar publicKey={publicKey} onLogin={handleLogin} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard publicKey={publicKey} onLogin={handleLogin} />} />
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
