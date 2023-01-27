import { providers } from 'ethers';

/// <reference types="react-scripts" />

declare global {
  interface Window {
    ethereum: providers.ExternalProvider;
  }
}
