const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { expect } = require("chai");

let firstAccount;
let ccipLocalSimulator;
let myToken;
let nftPoolLockAndRelease;
let wrappedMyToken;
let nftPoolBurnAndMint;
const tokenId = 0;

before(async () => {
  firstAccount = (await getNamedAccounts()).firstAccount;
  await deployments.fixture(["all"]);
  ccipLocalSimulator = await ethers.getContract(
    "CCIPLocalSimulator",
    firstAccount
  );
  myToken = await ethers.getContract("MyToken", firstAccount);
  nftPoolLockAndRelease = await ethers.getContract(
    "NFTPoolLockAndRelease",
    firstAccount
  );
  wrappedMyToken = await ethers.getContract("WrappedMyToken", firstAccount);
  nftPoolBurnAndMint = await ethers.getContract(
    "NFTPoolBurnAndMint",
    firstAccount
  );
});

describe("source chain -> dest chain", async () => {
  it("inited", async () => {
    await myToken.safeMint(firstAccount, "");
    const owner = await myToken.ownerOf(tokenId);
    expect(owner).to.equal(firstAccount);
  });
  it("locked", async () => {
    let { chainSelector_ } = await ccipLocalSimulator.configuration();
    await myToken.approve(nftPoolLockAndRelease.target, tokenId);
    await ccipLocalSimulator.requestLinkFromFaucet(
      nftPoolLockAndRelease.target,
      ethers.parseEther("10")
    );
    await nftPoolLockAndRelease.lockNFTAndSendMessage(
      tokenId,
      firstAccount,
      chainSelector_,
      nftPoolBurnAndMint.target
    );
    const owner = await myToken.ownerOf(tokenId);
    expect(owner).to.equal(nftPoolLockAndRelease.target);
  });
  it("minted", async () => {
    const owner = await wrappedMyToken.ownerOf(tokenId);
    expect(owner).to.equal(firstAccount);
  });
});
describe("dest chain -> source chain", async () => {
  it("burned", async () => {
    let { chainSelector_ } = await ccipLocalSimulator.configuration();
    await wrappedMyToken.approve(nftPoolBurnAndMint.target, tokenId);
    await ccipLocalSimulator.requestLinkFromFaucet(
      nftPoolBurnAndMint,
      ethers.parseEther("10")
    );
    await nftPoolBurnAndMint.burnNFTAndSendMessage(
      tokenId,
      firstAccount,
      chainSelector_,
      nftPoolLockAndRelease.target
    );
    let totalSupply = await wrappedMyToken.totalSupply();
    expect(totalSupply).to.equal(0);
  });
  it("released", async () => {
    const owner = await myToken.ownerOf(tokenId);
    expect(owner).to.equal(firstAccount);
  });
});
