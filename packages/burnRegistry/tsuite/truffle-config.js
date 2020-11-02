var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic =
  "field bid wise provide seed march feature flavor tuna nose stairs mystery rapid rough december gravity tooth convince bitter base art";
var infura_url = "fb778d97ca8f49739978160d838576ef@inkeby.infura.io/ws/v3/f1172b66c64b48c786f334adf1fab3b9";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infura_url);
      },
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.5.10"
    }
  },

  plugins: ["truffle-watch"]
};
