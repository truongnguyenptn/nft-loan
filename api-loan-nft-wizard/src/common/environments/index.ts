import { Cluster } from '@solana/web3.js';
import * as dotenv from 'dotenv';
dotenv.config();

const APP_NAME = process.env.APP_NAME || '';
const APP_PORT = process.env.APP_PORT || 3001;

const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = process.env.DB_PORT || '';
const DB_USER = process.env.DB_USER || '';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || '';

const DEVNET_RPC_URL = 'https://api.devnet.solana.com';
const CLUSTER: Cluster = 'devnet';

const ELUSIV_KEY = 'THIS_IS_A_ELUSIV_KEY';

const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';
const URL_HELIUS_DAS = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

export {
  APP_NAME,
  APP_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  DEVNET_RPC_URL,
  CLUSTER,
  ELUSIV_KEY,
  URL_HELIUS_DAS,
};
