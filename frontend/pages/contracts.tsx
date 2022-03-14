import type { NextPage } from 'next'
import KIP7 from '../components/KIP7'
import KIP17 from '../components/KIP17'
import { useState, useEffect, useContext } from 'react'

const Contracts: NextPage = () => {
  const [currentContract, setCurrentContract] = useState('KIP7')

  return (
    <div className="mt-20">
      <div className="flex justify-center space-x-10 font-2xl font-bold">
        <span>KIP7</span>
        <span>KIP17</span>
      </div>
      <div>
        <KIP7 />
        <KIP17 />
      </div>
    </div>
  )
}

export default Contracts
