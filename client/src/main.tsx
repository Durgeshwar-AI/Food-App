import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

// Ensure the root element is not null
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
