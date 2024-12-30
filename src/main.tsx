import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { environmentService } from './config/environment';

// Validate environment before mounting
try {
  if (!environmentService.validate()) {
    throw new Error('Invalid environment configuration');
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #040707;
        color: #ff4444;
        padding: 20px;
        font-family: system-ui;
      ">
        <div>
          <h1 style="font-size: 24px; margin-bottom: 16px;">Configuration Error</h1>
          <p style="color: #666;">${error instanceof Error ? error.message : 'Failed to initialize application'}</p>
        </div>
      </div>
    `;
  }
  console.error('Application initialization failed:', error);
}