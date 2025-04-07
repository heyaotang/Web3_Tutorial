require("@nomicfoundation/hardhat-toolbox");

// require('@nomicfoundation/hardhat-chai-matchers');
// require('@nomicfoundation/hardhat-ethers');
// require('@typechain/hardhat');
// require('hardhat-gas-reporter');
// require('solidity-coverage');

require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@chainlink/env-enc").config();
require("./task");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    firstAccount: {
      default: 0,
    }
  },
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      blockConfirmations: 5,
      companionNetworks: {
        destChain: "amoy",
      }
    },
    amoy: {
      chainId: 80002,
      url: process.env.AMOY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      blockConfirmations: 5,
      companionNetworks: {
        destChain: "sepolia",
      }
    }
  }
};
