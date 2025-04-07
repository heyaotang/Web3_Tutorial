const { task } = require("hardhat/config");
const { networkConfig } = require("../helper-hardhat.config");

task("lock-nft")
  .addOptionalParam("chainselector", "chain selector of dest chain")
  .addOptionalParam("receiver", "receiver's address on dest chain")
  .addParam("tokenid", "token id to be crossed chain")
  .setAction(async (taskArgs, hre) => {
    const { firstAccount } = await getNamedAccounts();
    let transaction;
    let chainSelector;
    let receiver;
    let tokenId = taskArgs.tokenid;
    if (taskArgs.chainselector) {
      chainSelector = taskArgs.chainselector;
    } else {
      chainSelector =
        networkConfig[network.config.chainId].companionChainSelector;
      console.log(`chainselector is not set in command`);
    }
    if (!chainSelector) {
      throw new Error("chainselector not found");
    }
    console.log(`chainselector is ${chainSelector}`);
    if (taskArgs.receiver) {
      receiver = taskArgs.receiver;
    } else {
      const receiverDeployment = await hre.companionNetworks[
        "destChain"
      ].deployments.get("NFTPoolBurnAndMint");
      receiver = receiverDeployment.address;
      console.log(`receiver's address is not set in command`);
    }
    if (!receiver) {
      throw new Error("receiver's address not found");
    }
    console.log(`receiver's address is ${receiver}`);
    // get contracts
    const linkToken = await ethers.getContractAt(
      "LinkToken",
      networkConfig[network.config.chainId].linkToken
    );
    let myToken = await ethers.getContract("MyToken", firstAccount);
    let nftPoolLockAndRelease = await ethers.getContract(
      "NFTPoolLockAndRelease",
      firstAccount
    );
    // make sure 1. owner approved pool to transfer NFT
    await myToken.approve(nftPoolLockAndRelease.target, tokenId);
    // make sure 2. pool have enougth balance
    transaction = await linkToken.transfer(
      nftPoolLockAndRelease.target,
      ethers.parseEther("0.1")
    );
    await transaction.wait(5);
    const balanceOfPool = await linkToken.balanceOf(
      nftPoolLockAndRelease.target
    );
    console.log(`balance of pool is ${balanceOfPool}`);
    //
    console.log(`locking NFT of MyToken`);
    transaction = await nftPoolLockAndRelease.lockNFTAndSendMessage(
      tokenId,
      firstAccount,
      chainSelector,
      receiver
    );
    await transaction.wait(5);
    console.log(`locked NFT of MyToken`);
    console.log(
      `ccip transaction is sent, transaction hash is ${transaction.hash}`
    );
  });

module.exports = {};
