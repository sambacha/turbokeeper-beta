import { Network } from '../../static/network'
export enum assets {
  'ADA' = 'ADA',
  'ETH' = 'ETH',
  'BCH' = 'BCH',
  'BTC' = 'BTC',
  'BNT' = 'BNT',
  'BNB' = 'BNB',
  'COMP' = 'COMP',
  'DAI' = 'DAI',
  'DASH' = 'DASH',
  'EOS' = 'EOS',
  'LEND' = 'LEND',
  'LINK' = 'LINK',
  'SNX' = 'SNX'
}
const UsdContractsAddresses: { [key in Network]: { [key in assets]: string } } = {
  [Network.MAINNET]: {
    [assets.ADA]: '0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55',
    [assets.ETH]: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    [assets.BCH]: '0x9F0F69428F923D6c95B781F89E165C9b2df9789D',
    [assets.BNT]: '0x1E6cF0D433de4FE882A437ABC654F58E1e78548c',
    [assets.BTC]: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    [assets.BNB]: '0x14e613AC84a31f709eadbdF89C6CC390fDc9540A',
    [assets.COMP]: '0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5',
    [assets.DAI]: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
    [assets.DASH]: '0xFb0cADFEa136E9E343cfb55B863a6Df8348ab912',
    [assets.EOS]: '0x10a43289895eAff840E8d45995BBa89f9115ECEe',
    [assets.LEND]: '0x4aB81192BB75474Cf203B56c36D6a13623270A67',
    [assets.LINK]: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
    [assets.SNX]: '0xDC3EA94CD0AC27d9A86C180091e7f78C683d3699'
  },
  [Network.ROPSTEN]: {
    [assets.ADA]: '0xA729F64d7CfccD229438275D252691756002C4f1',
    [assets.ETH]: '0x30B5068156688f818cEa0874B580206dFe081a03',
    [assets.BCH]: '0xFE31f45bf8D756555971fcCeAbF802a9EaA7c4Ac',
    [assets.BNT]: '0x1e3470dB254494D14a99CE9d60818c4eb3995a23',
    [assets.BTC]: '0x0d5C2eC3A235D0DDfB98dbe058F790Eff0c34782',
    [assets.BNB]: '0x81641b323c6e32F2487E22EBceC7eEA7eD6f53b3',
    [assets.COMP]: '0xE331E3C01c8D85fE107b13ad2888a61a4885199f',
    [assets.DAI]: '0xaF540Ca83c7da3181778e3D1E11A6137e7e0085B',
    [assets.DASH]: '0x219131b3a83D2DeBc062Aa2165ae52B0D9780422',
    [assets.EOS]: '0xfB57D5BDc664c18bcad80abF4D56d2871BfAdb54',
    [assets.LEND]: '0x3dE7c1eDe4b07662bF31ac9d735635D16340Cd82',
    [assets.LINK]: '0x40c9885aa8213B40e3E8a0a9aaE69d4fb5915a3A',
    [assets.SNX]: '0xE8104FCe8eD56037ecE586e18d5515f12005C90E'
  }
  // ,
  // [Network.RINKEBY]: {
  //   [assets.ETH]: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
  //   [assets.BAT]: '0x031dB56e01f82f20803059331DC6bEe9b17F7fC9',
  //   [assets.BTC]: '0xECe365B379E1dD183B20fc5f022230C044d51404',
  //   [assets.BNB]: '0xcf0f51ca2cDAecb464eeE4227f5295F2384F84ED',
  //   [assets.DAI]: '0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF',
  //   [assets.SNX]: '0xE96C4407597CD507002dF88ff6E0008AB41266Ee'
  // }
}

export default UsdContractsAddresses
