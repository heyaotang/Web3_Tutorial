const { task } = require("hardhat/config");

task("check-wnft").setAction(async (taskArgs, hre) => {
  const { firstAccount } = await getNamedAccounts();
  const wrappedMyToken = await ethers.getContract(
    "WrappedMyToken",
    firstAccount
  );
  const totalSupply = await wrappedMyToken.totalSupply();
  console.log(`checking status of WrappedMyToken`);
  console.log(`WrappedMyToken => totalSupply: ${totalSupply}`);
  for (let i = 0; i < totalSupply; i++) {
    const owner = await wrappedMyToken.ownerOf(i);
    console.log(`WrappedMyToken => TokenId: ${i} - Owner: ${owner}`);
  }
});

module.exports = {};
