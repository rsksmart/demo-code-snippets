import React from 'react';
import ReactDOM from 'react-dom/client';
import { DAppProvider } from '@usedapp/core';
import dappConfig from './usedapp.config';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DAppProvider config={dappConfig}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
);
