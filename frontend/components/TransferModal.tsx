import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'

const Transfer = () => {
  const { metamaskAddress } = useContext(providerContext)

  const shortenAddress = (str: any) => {
    return str.substring(0, 8) + '...'
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-gray-700 place-content-center font-body mb-6 tracking-widest shadow-md w-1/3">
        <div className="border-b-2 p-4">{shortenAddress(metamaskAddress)}</div>
        <div className="p-4">
          <label className="block mb-2">Receiving Address</label>
          <input
            className="rounded-md shadow-sm block py-2 px-8 w-full border border-gray-200"
            type="text"
          />
          <label className="block mb-2">Amount in KLAY</label>
          <input
            className="rounded-md shadow-sm block py-2 px-8 w-full border border-gray-200"
            type="text"
          />
        </div>
      </div>
    </div>
  )
}

export default Transfer
