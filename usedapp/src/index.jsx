import React from 'react';
import ReactDOM from 'react-dom/client';
import { DAppProvider } from '@usedapp/core';
import dAppConfig from './config/dAppConfig';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DAppProvider config={dAppConfig}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
);
