import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'

const Transfer = () => {
  const { web3, metamaskAddress } = useContext(providerContext)
  const [receivingAddress, setReceivingAddress] = useState()
  const [metamaskBalance, setMetamaskBalace] = useState<string>()
  const [sendValue, setSendValue] = useState()

  // add blockies

  const transferTokens = async () => {
    try {
      const value = web3.utils.toWei(sendValue, 'ether')
      const txn = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: metamaskAddress,
            to: receivingAddress,
            value: value,
            gasPrice: '0xAE9F7BCC00', // 750 ston
            gas: '0x5208', // 21000
          },
        ],
      })
      console.log('txn: ', txn)
    } catch (err) {
      console.error(err)
    }
  }

  const getMetamaskBalance = async () => {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [metamaskAddress, 'latest'],
    })
    if (balance) {
      const wei = web3.utils.hexToNumberString(balance)
      const ether = web3.utils.fromWei(wei, 'ether')
      setMetamaskBalace(ether)
    } else {
      console.log('no blaance')
    }
  }

  const shortenAddress = (str: any) => {
    return str.substring(0, 8)
  }

  const validateAddress = (input: any) => {
    const prefix = input.slice(0, 2)
    if (input.length === 42 && prefix === '0x') {
      return true
    }
    return false
  }

  useEffect(() => {
    if (web3 && metamaskAddress) {
      getMetamaskBalance()
    }
  }, [web3, metamaskAddress])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="place-content-center font-body mb-6 tracking-widest shadow-md w-1/3">
        <div className="border-b-2 p-4 text-2xl flex place-content-between">
          <span>{metamaskAddress && shortenAddress(metamaskAddress)}</span>
          <span>{metamaskBalance} KLAY</span>
        </div>
        <div className="p-4 space-y-4">
          <label className="block">Receiving Address</label>
          <input
            className="rounded-md shadow-sm block py-2 px-2 w-full border border-gray-200"
            type="text"
            onChange={(e: any) => setReceivingAddress(e.target.value)}
          />
          <label className="block">Amount in KLAY</label>
          <input
            className="rounded-md shadow-sm block py-2 px-2 w-full border border-gray-200"
            type="number"
            onChange={(e: any) => setSendValue(e.target.value)}
          />
          <button
            className="flex items-center rounded-full bg-blue-600 px-4 py-2 text-white"
            onClick={transferTokens}
          >
            Send KLAY
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transfer
