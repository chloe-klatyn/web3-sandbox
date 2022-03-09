import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'

type FormData = {
  receivingAddress: string
  sendValue: string
}

const Transfer = () => {
  const { web3, metamaskAddress } = useContext(providerContext)
  const [receivingAddress, setReceivingAddress] = useState()
  const [metamaskBalance, setMetamaskBalace] = useState<number>()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const transferTokens = async () => {
    const sendValue = getValues('sendValue')
    const receiver = getValues('receivingAddress')
    try {
      const value = web3.utils.toWei(sendValue, 'ether')
      const txn = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: metamaskAddress,
            to: receiver,
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

  const validateValue = (input: any) => {
    if (input > metamaskBalance) {
      return false
    } else {
      return true
    }
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
            {...register('receivingAddress', { required: true, validate: validateAddress })}
          />
          {errors.receivingAddress && (
            <div className="text-lightorange">Please enter a valid wallet address</div>
          )}
          <label className="block">Amount in KLAY</label>
          <input
            className="rounded-md shadow-sm block py-2 px-2 w-full border border-gray-200"
            type="number"
            {...register('sendValue', { required: true, validate: validateValue })}
          />
          {errors.sendValue && errors.sendValue.type === 'validate' && (
            <div className="text-lightorange">Value is more than balance</div>
          )}
          <button
            className="flex items-center rounded-full bg-blue-600 px-4 py-2 text-white"
            onClick={handleSubmit(transferTokens)}
          >
            Send KLAY
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transfer
