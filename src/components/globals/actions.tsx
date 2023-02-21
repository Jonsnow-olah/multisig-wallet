import {
    chain
  } from 'wagmi'


export const CHAIN_ID = 3141;
export const SCAN_BASE_URL = "";
// export const BANK_CONTRACT_ADDRESS = "0xc04E870738Cc98F70B0d93A7c8D6353c46e1e495";
export const BANK_CONTRACT_ADDRESS = "0xF567990Fc5F8E797703F33b5CFB3E6a3C4691F1e"; // polygon testnet 
export const FACTORY_CONTRACT_ADDRESS = "0x45670039865E1A33542919138566c3b6cA6705E6";


export const storeNewWalletAddress = async (address: string) => {
  await localStorage.setItem("consense_wallet_address", address);
}


export const storeConfirmation = async (amount: string) => {
  await localStorage.setItem("consense_wallet_con", amount);
}


export const getWalletAddress = async () => {
  let address = await localStorage.getItem("consense_wallet_address");
  return address;
}


export const getConfirmation = async () => {
  let address = await localStorage.getItem("consense_wallet_con");
  return address;
}

