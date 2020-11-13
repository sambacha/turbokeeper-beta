import { Contract, providers, BigNumber } from 'ethers'
import { getProvider } from '@web3/access'
import AggregatorV3InterfaceABI from '@web3/Contracts/ABI/AggregatorV3InterfaceABI'
import UsdContractsAddresses, { assets } from './oracleAddresses'
import { providerToNetwork } from '../../static/network'

interface IRoundData {
  roundId: BigNumber
  answer: BigNumber
  startedAt: BigNumber
  updatedAt: BigNumber
  answeredInRound: BigNumber
}

export type ContractsMap = {
  [key in assets]: Contract
}

export class OracleProvider {
  private static _instance: OracleProvider
  public contracts: ContractsMap
  private constructor(provider: providers.Web3Provider) {
    this.contracts = Object.fromEntries(
      Object.entries(UsdContractsAddresses[providerToNetwork(provider)]).map(([asset, address]) => [
        asset,
        new Contract(address, AggregatorV3InterfaceABI, provider)
      ])
    ) as ContractsMap
  }

  static async getInstance(): Promise<OracleProvider> {
    if (!OracleProvider._instance) {
      const provider = await getProvider()
      OracleProvider._instance = new OracleProvider(provider)
    }
    return OracleProvider._instance
  }

  public latestRoundData = async (asset: assets): Promise<IRoundData> => {
    const response = await this.contracts[asset].latestRoundData()
    return response
  }

  public getRoundData = async (asset: assets, blockOffset: number = 1): Promise<IRoundData> => {
    const latestRound = await this.latestRoundData(asset)
    const response = await this.contracts[asset].getRoundData(latestRound.roundId.sub(blockOffset))
    return response
  }

  public getLatestPrice = async (asset: assets): Promise<BigNumber> => {
    const latestRound = await this.latestRoundData(asset)
    return latestRound.answer
  }

  public getPreviousPrice = async (asset: assets): Promise<BigNumber> => {
    // seems like not all oracle migrated to new api
    try {
      const latestRound = await this.getRoundData(asset)
      return latestRound.answer
    } catch (error) {
      console.log(`error ${asset}`)
      return BigNumber.from(0)
    }
  }
}
