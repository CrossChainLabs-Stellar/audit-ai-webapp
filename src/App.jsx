// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import NewAudit from "./pages/NewAudit";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Join from "./pages/Join";

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
//
      <Router>
        <AuditAINavbar publicKey={publicKey} onLogin={handleLogin} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<NewAudit publicKey={publicKey} onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard publicKey={publicKey} onLogin={handleLogin} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Join />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
        <Footer/>
      </Router>

  );
}

export default App;
