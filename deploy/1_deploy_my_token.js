const { getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");
module.exports = async ({ deployments }) => {
  const isDevelopmentChain = developmentChains.includes(network.name);
  const { firstAccount } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying MyToken contract");
  await deploy("MyToken", {
    contract: "MyToken",
    from: firstAccount,
    args: [firstAccount, "MyToken", "MT"],
    log: true,
    waitConfirmations: isDevelopmentChain
      ? 0
      : network.config.blockConfirmations,
  });
  log("MyToken contract deployed successfully");
};

module.exports.tags = ["all", "sourcechain"];
