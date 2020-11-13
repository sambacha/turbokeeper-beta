import { ethers, providers, Signer } from 'ethers'
let _provider: providers.Web3Provider
let _signer: Signer

const getProvider = async (): Promise<providers.Web3Provider> => {
  if (_provider) {
    return _provider
  } else {
    _provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    _provider.on('network', (_newNetwork, _oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (_oldNetwork) {
        window.location.reload()
      }
    })

    await _provider.getNetwork()
    return _provider
  }
}

const getSigner = async (): Promise<Signer> => {
  if (!_provider) {
    _provider = new ethers.providers.Web3Provider(window.ethereum)
  }
  await window.ethereum.enable()
  if (_signer) {
    return _signer
  } else {
    _signer = _provider.getSigner()
    return _signer
  }
}

export { getProvider, getSigner }
