import type { NextPage } from 'next'
import KIP7 from '../components/KIP7'
import KIP17 from '../components/KIP17'
import { useState } from 'react'

const Contracts: NextPage = () => {
  const [currentContract, setCurrentContract] = useState('KIP7')

  return (
    <div className="mt-10">
      <div className="flex justify-center space-x-10 text-2xl font-bold">
        <button
          className="border-b-2 border-white hover:border-b-2 hover:border-grey"
          onClick={() => {
            setCurrentContract('KIP7')
          }}
        >
          KIP7
        </button>
        <button
          className="border-b-2 border-white hover:border-b-2 hover:border-grey"
          onClick={() => {
            setCurrentContract('KIP17')
          }}
        >
          KIP17
        </button>
      </div>
      <div className="flex justify-center mt-20">
        {currentContract === 'KIP7' ? <KIP7 /> : <KIP17 />}
      </div>
    </div>
  )
}

export default Contracts
