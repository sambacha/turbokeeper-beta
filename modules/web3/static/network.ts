import { providers } from 'ethers'

export enum Network {
  MAINNET = 1,
  ROPSTEN = 3
  // RINKEBY = 4
}
export const providerToNetwork = (provider: providers.Web3Provider): Network => {
  return provider.network.chainId
}
