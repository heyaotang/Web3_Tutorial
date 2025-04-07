const { task } = require("hardhat/config");

task("check-nft").setAction(async (taskArgs, hre) => {
  const { firstAccount } = await getNamedAccounts();
  const myToken = await ethers.getContract("MyToken", firstAccount);
  const totalSupply = await myToken.totalSupply();
  console.log(`checking status of MyToken`);
  console.log(`MyToken => totalSupply: ${totalSupply}`);
  for (let i = 0; i < totalSupply; i++) {
    const owner = await myToken.ownerOf(i);
    console.log(`MyToken => TokenId: ${i} - Owner: ${owner}`);
  }
});

module.exports = {};
