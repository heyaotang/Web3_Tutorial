const { getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");
module.exports = async ({ deployments }) => {
  const isDevelopmentChain = developmentChains.includes(network.name);
  const { firstAccount } = await getNamedAccounts();
  const { deploy, log } = deployments;
  if (!isDevelopmentChain) {
    log("skip deploying CCIP simulator contract");
    return;
  }
  log("deploying CCIP simulator contract");
  await deploy("CCIPLocalSimulator", {
    contract: "CCIPLocalSimulator",
    from: firstAccount,
    args: [],
    log: true,
    waitConfirmations: 0,
  });
  log("CCIP simulator contract deployed successfully");
};

module.exports.tags = ["all", "test"];
