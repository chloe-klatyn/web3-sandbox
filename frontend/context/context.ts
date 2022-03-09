import { createContext } from 'react'

interface context {
  klaytnProvider: any
  ethProvider: any
  metamaskAddress: any
  setKlaytnProvider: (a: any) => void
  setEthProvider: (a: any) => void
  setMetamaskAddress: (a: string) => void
}

const contextDefaultValue = {
  klaytnProvider: null,
  ethProvider: null,
  metamaskAddress: null,
  setKlaytnProvider: (a: any) => null,
  setEthProvider: (a: any) => null,
  setMetamaskAddress: (a: any) => null,
}

const context = createContext<context>(contextDefaultValue)

export default context
