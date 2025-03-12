// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./theme/theme-provider";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Components
import AuditAINavbar from "./components/AuditAINavbar";
import Footer from "./components/Footer";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />PrivacyPolicy
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
