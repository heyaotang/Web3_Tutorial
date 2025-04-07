const { task } = require("hardhat/config");

task("mint-nft").setAction(async (taskArgs, hre) => {
  const { firstAccount } = await getNamedAccounts();
  const myToken = await ethers.getContract("MyToken", firstAccount);
  console.log(`minting NFT of MyToken`);
  const transaction = await myToken.safeMint(
    firstAccount,
    "https://test.test/test.json"
  );
  await transaction.wait(5);
  console.log(`minted NFT of MyToken`);
});

module.exports = {};
