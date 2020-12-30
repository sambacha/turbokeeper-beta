# turbokeeper-client

turbokeeper-client is a lightweight JavaScript library used for interacting with the turbokeeper system. It's designed to be easy for mixers or wallets to integrate quickly.

## Installation

```
npm install turbokeeper-client
```

## Usage

```javascript
import {TurboKeeperClient} from "turbokeeper-client";

const client = new TurboKeeperClient(
  ethersJsProvider,
  network, // "KOVAN" || "MAINNET"
  reputationContractAddress, // defaults to current deployment on specified network
  protocol // "https" || "http"
);

const relayers = await client.getRelayers(
  1,
  new Set([]), // don't ignore any addresses
  new Set(["ip"]) // only return relayers with an IP address
);

if (relayers.length > 0) {
  const fee = await client.getRelayerFee(relayers[0]);

  // ... construct transaction using fee -> tx: {to, data, value}. If this tx is to be used in the burn
  // registry, it *must* be sent to the deployed RelayerForwarder contract

  const txHash = await client.submitTx(tx, relayers[0]);
}
```

For more, see [documentation](https://sambacha.github.io/turbokeeper/turbokeeper.html).
