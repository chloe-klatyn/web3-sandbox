import { createContext } from 'react'

interface context {
  klaytnProvider: any
  ethProvider: any
  setKlaytnProvider: (a: any) => void
  setEthProvider: (a: any) => void
}

const contextDefaultValue = {
  klaytnProvider: null,
  ethProvider: null,
  setKlaytnProvider: (a: any) => null,
  setEthProvider: (a: any) => null,
}

const context = createContext<context>(contextDefaultValue)

export default context
