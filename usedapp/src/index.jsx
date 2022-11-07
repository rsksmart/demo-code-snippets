import React from 'react';
import ReactDOM from 'react-dom/client';
import { DAppProvider } from '@usedapp/core';
import useDAppConfig from './config/useDApp';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DAppProvider config={useDAppConfig}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
);
