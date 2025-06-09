import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

if(!SEPOLIA_RPC_URL){
  throw new Error("SEPOLIA_RPC_URL is not defined");
}

if(!PRIVATE_KEY){
  throw new Error("PRIVATE_KEY is not defined");
}

if(!ETHERSCAN_API_KEY){
  throw new Error("ETHERSCAN_API_KEY is not defined");
}

const config: HardhatUserConfig = {
  solidity: "0.8.20", // Or your version
  networks: {
    hardhat: {
      // Specific Hardhat Network configurations for 'npx hardhat run --network hardhat'
    },
    localhost: { // This is the one for 'npx hardhat node'
      url: "http://127.0.0.1:8545",
      // accounts: [privateKey1, privateKey2, ...] // Optional: if you want to use specific accounts from 'npx hardhat node' output
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;