import type { NextPage } from 'next'
import KIP7 from '../components/KIP7'
import KIP17 from '../components/KIP17'
import { useState, useEffect, useContext } from 'react'

const Contracts: NextPage = () => {
  const [currentContract, setCurrentContract] = useState('KIP7')

  return (
    <div className="mt-20">
      <div className="flex justify-center space-x-10 text-2xl font-bold">
        <button
          onClick={() => {
            setCurrentContract('KIP17')
          }}
        >
          KIP7
        </button>
        <button
          onClick={() => {
            setCurrentContract('KIP7')
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
