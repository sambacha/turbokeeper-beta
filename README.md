# Turbokeeper

Turbokeeper is a general [meta-transaction](https://medium.com/@austin_48503/ethereum-meta-transactions-90ccf0859e84)
network. It's designed to support any case where an Ethereum dapp's users shouldn't be paying the gas costs for their transactions.

## Contents

Turbokeeper consists of three components. Build instructions for each exist in its respective directory:

| component                                                                        | description                                                                                       |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [turbokeeper](https://github.com/sambacha/turbokeeper/tree/master/turbokeeperhd) | The turbokeeper daemon, a node server that anyone can run to contribute to the Surrogeth network. |
| [burnRegistry](https://github.com/sambacha/turbokeeper/tree/master/burnRegistry) | A trustless discovery mechanism for turbokeeper nodes.                                            |
| [client](https://github.com/sambacha/turbokeeper/tree/master/client)             | Client-side lib for integrating your app with turbokeeper.                                        |
