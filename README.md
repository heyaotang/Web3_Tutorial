## Useful command

```shell

npx env-enc set-pw

# PRIVATE_KEY
# SEPOLIA_RPC_URL
# AMOY_RPC_URL
npx env-enc set

npx hardhat help

npx hardhat deploy --network hardhat --tags all

npx hardhat test --network hardhat

npx hardhat deploy --network sepolia --tags sourcechain

npx hardhat deploy --network amoy --tags destchain

npx hardhat mint-nft --network sepolia

npx hardhat mint-nft --network sepolia

npx hardhat check-nft --network sepolia

npx hardhat check-wnft --network amoy

npx hardhat lock-nft --network sepolia --tokenid 0

npx hardhat lock-nft --network sepolia --tokenid 1

npx hardhat check-nft --network sepolia

npx hardhat check-wnft --network amoy

npx hardhat burn-wnft --network amoy --tokenid 1

npx hardhat check-nft --network sepolia

npx hardhat check-wnft --network amoy

```

## Test Result

```text

> npx hardhat deploy --network sepolia --tags sourcechain
Nothing to compile
deploying MyToken contract
deploying "MyToken" (tx: 0xdc175803e9104885b1bc8a05ab3091b5a18f271330963d77e9a429d9656e2166)...: deployed at 0xA8B1531F7498AcE48a55155B05Ceeb9BA6b46b60 with 2679541 gas
MyToken contract deployed successfully
deploying NFTPoolLockAndRelease contract
deploying "NFTPoolLockAndRelease" (tx: 0xae4e3980d94160df251e167fc20fbd57cc316f1da5d3f5effca3f96ed31539c4)...: deployed at 0xb070240E40c5FF3a38Abd0C8a70901d4644f4c25 with 2552995 gas
NFTPoolLockAndRelease contract deployed successfully

> npx hardhat deploy --network amoy --tags destchain
Nothing to compile
deploying WrappedMyToken contract
deploying "WrappedMyToken" (tx: 0xfc04409d09f75bebcb62729fa2d2c7d54f0b165e6d2608cc66edbc0194d8a007)...: deployed at 0x0c81601eE8768EF311be95AED01b032c888c86cb with 2691226 gas
WrappedMyToken contract deployed successfully
deploying NFTPoolBurnAndMint contract
deploying "NFTPoolBurnAndMint" (tx: 0x33741eaa3529ab6564b07eee55f6849df5c6759453dcafca6c911e2d86c0d015)...: deployed at 0xf3b2973BC69B484948E267F0561d7F59d76bB1D2 with 2502834 gas
NFTPoolBurnAndMint contract deployed successfully

> npx hardhat lock-nft --network sepolia --tokenid 0
chainselector is not set in command
chainselector is 16281711391670634445
receiver's address is not set in command
receiver's address is 0xf3b2973BC69B484948E267F0561d7F59d76bB1D2
balance of pool is 100000000000000000
locking NFT of MyToken
locked NFT of MyToken
ccip transaction is sent, transaction hash is 0x6094a9d34c3a7e58f3ae602c64b5a7205a24ad02d964541b74d9087a9422524e

> npx hardhat lock-nft --network sepolia --tokenid 1
chainselector is not set in command
chainselector is 16281711391670634445
receiver's address is not set in command
receiver's address is 0xf3b2973BC69B484948E267F0561d7F59d76bB1D2
balance of pool is 163222701081900012
locking NFT of MyToken
locked NFT of MyToken
ccip transaction is sent, transaction hash is 0x0bd35acfb44099d3d688bdb09f6e159304443985ebe32b39601f0b2831b2e938

> npx hardhat check-nft --network sepolia
checking status of MyToken
MyToken => totalSupply: 2
MyToken => TokenId: 0 - Owner: 0xb070240E40c5FF3a38Abd0C8a70901d4644f4c25
MyToken => TokenId: 1 - Owner: 0xb070240E40c5FF3a38Abd0C8a70901d4644f4c25

> npx hardhat check-wnft --network amoy
checking status of WrappedMyToken
WrappedMyToken => totalSupply: 2
WrappedMyToken => TokenId: 0 - Owner: 0xf23f2b70e68A96bdb9f0C46d62b905A87CFc84C4
WrappedMyToken => TokenId: 1 - Owner: 0xf23f2b70e68A96bdb9f0C46d62b905A87CFc84C4

> npx hardhat burn-wnft --network amoy --tokenid 1
chainselector is not set in command
chainselector is 16015286601757825753
receiver's address is not set in command
receiver's address is 0xb070240E40c5FF3a38Abd0C8a70901d4644f4c25
balance of pool is 200000000000000000
burning NFT of WrappedMyToken
burned NFT of WrappedMyToken
ccip transaction is sent, transaction hash is 0x20cd11bd4da54795fb766d9b83aaa238d80c164cb07cbc8f9634a2965da9ae9b

> npx hardhat check-nft --network sepolia
checking status of MyToken
MyToken => totalSupply: 2
MyToken => TokenId: 0 - Owner: 0xb070240E40c5FF3a38Abd0C8a70901d4644f4c25
MyToken => TokenId: 1 - Owner: 0xf23f2b70e68A96bdb9f0C46d62b905A87CFc84C4

> npx hardhat check-wnft --network amoy
checking status of WrappedMyToken
WrappedMyToken => totalSupply: 1
WrappedMyToken => TokenId: 0 - Owner: 0xf23f2b70e68A96bdb9f0C46d62b905A87CFc84C4

```

## Explorer

```text
源链NFT
https://sepolia.etherscan.io/address/0xA8B1531F7498AcE48a55155B05Ceeb9BA6b46b60
源链池子
https://sepolia.etherscan.io/address/0xb070240E40c5FF3a38Abd0C8a70901d4644f4c25
目标链WNFT
https://amoy.polygonscan.com/address/0x0c81601eE8768EF311be95AED01b032c888c86cb
目标链池子
https://amoy.polygonscan.com/address/0xf3b2973BC69B484948E267F0561d7F59d76bB1D2
锁定源链NFT#0
https://ccip.chain.link/#/side-drawer/msg/0xf86944f00c70ec2952fb1fc0a44da4a5dbdfe02ee918a1daf58e56eb7b6ff857
锁定源链NFT#1
https://ccip.chain.link/#/side-drawer/msg/0xc4a918745cf9522b8f3d88bba5145f36574becc21680132502d82d187499e60c
烧毁目标链WNFT#1
https://ccip.chain.link/#/side-drawer/msg/0xffb9c096d48e400c97457b038a5c32821ad7ab196ad4b2c8f1e3dec2c8dc5b13

```
