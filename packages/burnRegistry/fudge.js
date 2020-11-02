const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");
const privateKey = fs
  .readFileSync(".secret")
  .toString()
  .trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gas: 6721975 // The default is 4712388 and that could get our way if we do load testing for batchRelayCall
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          privateKey,
          "https://rinkeby.infura.io/v3/f1172b66c64b48c786f334adf1fab3b9"
        ),
      network_id: 4
    }
  },

  compilers: {
    solc: {
      version: "0.5.10"
    }
  },

  plugins: ["truffle-watch"]
};
