import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const webSocket = {
  url: `wss://rsk.getblock.io/mainnet/websocket`,
  options: {
    timeout: 5000, // ms
    headers: {
      'x-api-key': process.env.GETBLOCK_API_KEY,
    },
  },
};

const provider = new Web3.providers.WebsocketProvider(
  webSocket.url,
  webSocket.options,
);
const web3 = new Web3(provider);
export default web3;
