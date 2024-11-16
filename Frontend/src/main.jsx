import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';

// Create root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with providers
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CarProvider>
        <App />
      </CarProvider>
    </AuthProvider>
  </BrowserRouter>
);
