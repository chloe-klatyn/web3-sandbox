import Caver from 'caver-js'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormData = {
  receivingAddress: string
  sendValue: string
}

const Transfer = () => {
  const { web3, caver, ethProvider, klaytnProvider, metamaskAddress, kaikasAddress } =
    useContext(providerContext)
  const [metamaskBalance, setMetamaskBalace] = useState<number>()
  const [kaikasBalance, setKaikasBalance] = useState<any>()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const transferKaikasTokens = async () => {
    const sendValue = getValues('sendValue')
    const receiver = getValues('receivingAddress')
    try {
      const txn = await caver.klay.sendTransaction({
        type: 'VALUE_TRANSFER',
        from: kaikasAddress,
        to: receiver,
        value: caver.utils.toPeb(sendValue, 'KLAY'),
        gas: 8000000,
      })
      console.log('txn: ', txn)
    } catch (err: any) {
      console.error(err)
    }
  }

  const transferMetamaskTokens = async () => {
    const sendValue = getValues('sendValue')
    const receiver = getValues('receivingAddress')
    try {
      const value = web3.utils.toWei(sendValue, 'ether')
      console.log('value: ', value)
      const id = toast.loading('Sending Tokens....', { theme: 'colored' })
      const txn = await ethProvider.request({
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
      let transactionReceipt = null
      while (transactionReceipt == null) {
        transactionReceipt = await web3.eth.getTransactionReceipt(txn)
        await sleep()
      }
      console.log('receipt: ', transactionReceipt)
      toast.update(id, {
        render: 'Tokens sent successfully',
        type: 'success',
        autoClose: 3000,
        isLoading: false,
      })
    } catch (err: any) {
      console.error(err)
      toast.error(err.message, { theme: 'colored' })
    }
  }

  const getKaikasBalance = async () => {
    const caver = new Caver(klaytnProvider)
    const account = klaytnProvider.selectedAddress
    const balance = await caver.klay.getBalance(account)
    console.log('balance: ', balance)
    if (balance) {
      const klay = caver.utils.convertFromPeb(balance, 'KLAY')
      setKaikasBalance(klay)
    } else {
      console.log('no balance')
    }
  }

  const getMetamaskBalance = async () => {
    const balance = await ethProvider.request({
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

  const shortenBalance = (str: any) => {
    return Math.round(str * 10) / 10
  }

  const validateAddress = (input: any) => {
    const prefix = input.slice(0, 2)
    if (input.length === 42 && prefix === '0x') {
      return true
    }
    return false
  }

  const validateValue = (input: any) => {
    if (metamaskBalance && input > metamaskBalance) {
      return false
    } else {
      return true
    }
  }

  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }

  useEffect(() => {
    if (klaytnProvider) {
      getKaikasBalance()
    }
  }, [klaytnProvider])

  useEffect(() => {
    if (web3 && metamaskAddress) {
      getMetamaskBalance()
    }
  }, [web3, metamaskAddress])

  return (
    <div className="flex flex-col items-center w-full">
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="place-content-center font-body mb-6 tracking-widest shadow-md w-1/3">
        <div className="border-b-2 p-4 text-2xl flex place-content-between">
          {metamaskAddress && metamaskBalance && (
            <>
              <span>{shortenAddress(metamaskAddress)}</span>
              <span>{shortenBalance(metamaskBalance)} KLAY</span>
            </>
          )}
          {kaikasAddress && kaikasBalance && (
            <>
              <span>{shortenAddress(kaikasAddress)}</span>
              <span>{shortenBalance(kaikasBalance)} KLAY</span>
            </>
          )}
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
            placeholder="KLAY"
            {...register('sendValue', { required: true, validate: validateValue })}
          />
          {errors.sendValue && errors.sendValue.type === 'validate' && (
            <div className="text-lightorange">Value is more than balance</div>
          )}
          <button
            className="flex items-center rounded-full bg-blue-600 px-4 py-2 text-white"
            onClick={handleSubmit(transferKaikasTokens)}
          >
            Send KLAY
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transfer
