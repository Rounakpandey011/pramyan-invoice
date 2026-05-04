import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f766e',
            color: '#fff',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: '500',
            borderRadius: '12px',
          },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
