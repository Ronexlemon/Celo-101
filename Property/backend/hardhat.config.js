require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
const AccountKey = process.env.CeloAccount;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    alfajores:{
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [AccountKey],
      chainId: 44787,
    }
  }
};
