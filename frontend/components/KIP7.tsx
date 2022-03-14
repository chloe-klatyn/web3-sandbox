import Caver from 'caver-js'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { shortenAddress, shortenBalance, validateAddress, sleep } from '../helpers'
import fs from 'fs'

type FormData = {
  receivingAddress: string
  sendValue: string
}

const KIP7 = () => {
  const {
    web3,
    caver,
    ethProvider,
    klaytnProvider,
    metamaskAddress,
    kaikasAddress,
    currentWallet,
  } = useContext(providerContext)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

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
          {/* {metamaskAddress && metamaskBalance && (
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
          )} */}
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
            // {...register('sendValue', { required: true, validate: validateValue })}
          />
          {errors.sendValue && errors.sendValue.type === 'validate' && (
            <div className="text-lightorange">Value is more than balance</div>
          )}
          {currentWallet === 'Kaikas' ? (
            <button
              className="flex font-light items-center rounded-full bg-blue-600 px-4 py-2 text-white"
              type="submit"
              // onClick={handleSubmit(transferKaikasTokens)}
            >
              Send Tokens
            </button>
          ) : (
            <button
              className="flex font-light items-center rounded-full bg-blue-600 px-4 py-2 text-white"
              type="submit"
              // onClick={handleSubmit(transferMetamaskTokens)}
            >
              Send Tokens
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default KIP7
