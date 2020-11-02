const HTTPProviderRateLimitRetry = require('./http-provider-rate-limit-retry')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      provider: () => {
        const appCred = 'fb778d97ca8f49739978160d838576ef'; // from application credential widget
        const connectionURL = 'rinkeby.infura.io/v3/f1172b66c64b48c786f334adf1fab3b9'; // without protocol (https://)
        return new HTTPProviderRateLimitRetry(`https://${appCred}@${connectionURL}`, 100000);
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      /* type: 'quorum' // Use this property for Quorum environments */
    },
  },
  mocha: {
    enableTimeouts: false
  }
};

