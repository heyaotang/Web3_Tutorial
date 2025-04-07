const { getNamedAccounts, network } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat.config");
module.exports = async ({ deployments }) => {
  const isDevelopmentChain = developmentChains.includes(network.name);
  const { firstAccount } = await getNamedAccounts();
  const { deploy, log } = deployments;
  let sourceRouter_;
  let linkToken_;
  if (isDevelopmentChain) {
    const ccipLocalSimulatorDeployment = await deployments.get(
      "CCIPLocalSimulator"
    );
    const ccipLocalSimulator = await ethers.getContractAt(
      "CCIPLocalSimulator",
      ccipLocalSimulatorDeployment.address
    );
    const configuration = await ccipLocalSimulator.configuration();
    sourceRouter_ = configuration.sourceRouter_;
    linkToken_ = configuration.linkToken_;
  } else {
    const configuration = networkConfig[network.config.chainId];
    sourceRouter_ = configuration.sourceRouter;
    linkToken_ = configuration.linkToken;
  }
  const wrappedMyTokenDeployment = await deployments.get("WrappedMyToken");
  const wrappedMyToken = await ethers.getContractAt(
    "WrappedMyToken",
    wrappedMyTokenDeployment.address
  );

  log("deploying NFTPoolBurnAndMint contract");
  await deploy("NFTPoolBurnAndMint", {
    contract: "NFTPoolBurnAndMint",
    from: firstAccount,
    args: [sourceRouter_, linkToken_, wrappedMyTokenDeployment.address],
    log: true,
    waitConfirmations: isDevelopmentChain
      ? 0
      : network.config.blockConfirmations,
  });
  log("NFTPoolBurnAndMint contract deployed successfully");
};

module.exports.tags = ["all", "destchain"];
