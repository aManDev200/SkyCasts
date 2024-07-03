import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CountryProvider } from './context/CountryContext'; // Import CountryProvider

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <CountryProvider>
        <App />
      </CountryProvider>
    </React.StrictMode>
  );
}
