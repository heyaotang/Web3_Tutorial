const { getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");
module.exports = async ({ deployments }) => {
  const isDevelopmentChain = developmentChains.includes(network.name);
  const { firstAccount } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying WrappedMyToken contract");
  await deploy("WrappedMyToken", {
    contract: "WrappedMyToken",
    from: firstAccount,
    args: [firstAccount, "WrappedMyToken", "WMT"],
    log: true,
    waitConfirmations: isDevelopmentChain
      ? 0
      : network.config.blockConfirmations,
  });
  log("WrappedMyToken contract deployed successfully");
};

module.exports.tags = ["all", "destchain"];
