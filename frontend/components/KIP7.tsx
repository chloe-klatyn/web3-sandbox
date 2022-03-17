import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { shortenAddress, shortenBalance, validateAddress } from '../helpers'

type FormData = {
  receivingAddress: string
  sendValue: string
}

interface props {
  kip7: any
}

const KIP7 = ({ kip7 }: props) => {
  const { caver, metamaskAddress, kaikasAddress } = useContext(providerContext)
  const [kip7Balance, setKip7Balance] = useState()
  const [tokenSymbol, setTokenSymbol] = useState()
  const [connectedAddress, setConnectedAddress] = useState()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const getWalletBalance = async () => {
    const userBalance = await kip7.methods.balanceOf(connectedAddress).call()
    console.log('wallet balance: ', userBalance)
    setKip7Balance(userBalance)
  }

  const getTokenInfo = async () => {
    const name = await kip7.methods.name().call()
    const symbol = await kip7.methods.symbol().call()
    setTokenSymbol(symbol)
    console.log('name: ', name, 'symbol:', symbol)
  }

  const transferTokens = async () => {
    const receiver = getValues('receivingAddress')
    const sendValue = getValues('sendValue')
    const peb = await caver.utils.toPeb(sendValue, 'KLAY')
    const gasPrice = await caver.klay.getGasPrice()
    console.log('receiver: ', receiver, 'value:', peb)
    const id = toast.loading('Sending Tokens....', { theme: 'colored' })
    try {
      const txn = await kip7.methods
        .transfer(receiver, sendValue)
        .send({ from: connectedAddress, gasPrice: gasPrice, gas: '0xF4240' })
      console.log('txn: ', txn)
      toast.update(id, {
        render: 'Tokens sent successfully',
        type: 'success',
        autoClose: 3000,
        isLoading: false,
      })
    } catch (err: any) {
      console.error(err)
      toast.update(id, {
        render: err.message,
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      })
    }
  }

  const validateValue = (input: any) => {
    if (kip7Balance && input > kip7Balance) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (kaikasAddress) {
      setConnectedAddress(kaikasAddress)
    }
    if (metamaskAddress) {
      setConnectedAddress(metamaskAddress)
    }
  }, [kaikasAddress, metamaskAddress])

  useEffect(() => {
    if (kip7 && connectedAddress) {
      getWalletBalance()
      getTokenInfo()
    }
  }, [kip7, connectedAddress])

  return (
    <div className="flex flex-col items-center w-full">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
          {connectedAddress && kip7Balance && tokenSymbol && (
            <>
              <span>{shortenAddress(connectedAddress)}</span>
              <span>
                {shortenBalance(kip7Balance).toLocaleString()} {tokenSymbol}
              </span>
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
          <label className="block">Number of Tokens</label>
          <input
            className="rounded-md shadow-sm block py-2 px-2 w-full border border-gray-200"
            type="number"
            {...register('sendValue', { required: true, validate: validateValue })}
          />
          {errors.sendValue && errors.sendValue.type === 'validate' && (
            <div className="text-lightorange">Value is more than balance</div>
          )}
          <button
            className="flex font-light items-center rounded-full bg-blue-600 px-4 py-2 text-white"
            type="submit"
            onClick={handleSubmit(transferTokens)}
          >
            Send Tokens
          </button>
        </div>
      </div>
    </div>
  )
}

export default KIP7
