import { createContext } from 'react'

interface context {
  klaytnProvider: any
  ethProvider: any
  metamaskAddress: any
  web3: any
  setKlaytnProvider: (a: any) => void
  setEthProvider: (a: any) => void
  setMetamaskAddress: (a: any) => void
  setWeb3: (a: any) => void
}

const contextDefaultValue = {
  klaytnProvider: null,
  ethProvider: null,
  metamaskAddress: null,
  web3: null,
  setKlaytnProvider: (a: any) => null,
  setEthProvider: (a: any) => null,
  setMetamaskAddress: (a: any) => null,
  setWeb3: (a: any) => null,
}

const context = createContext<context>(contextDefaultValue)

export default context
