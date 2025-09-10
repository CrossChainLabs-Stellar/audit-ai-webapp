import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppTheme from "./theme/AppTheme";
//import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTheme>
      <App />
    </AppTheme>
  </StrictMode>
);
