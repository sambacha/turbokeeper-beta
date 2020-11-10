const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase,
          },
          providerOrUrl: "https://ropsten.infura.io/v3/YOUR-PROJECT-ID",
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/",
        }),
      network_id: "3",
    },
  },
};

// Or, alternatively pass in a zero-based address index.
provider = new HDWalletProvider({
  mnemonic: mnemonicPhrase,
  provider: "http://localhost:8545",
  addressIndex: 5,
});

provider.engine.stop();
