import type { NextPage } from 'next'
import KIP7 from '../components/KIP7'
import KIP17 from '../components/KIP17'
import { useState, useEffect, useContext } from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import providerContext from '../context/context'

const Contracts: NextPage = (kip7: any) => {
  const [currentContract, setCurrentContract] = useState('KIP7')
  const { web3, caver } = useContext(providerContext)

  const instantiateKlayContract = async () => {
    const kip7contract = await caver.contract.create(kip7.abi, kip7.address)
    console.log('contract: ', kip7contract)
  }

  const instantiateEthContract = async () => {
    const ethContract = new web3.eth.Contract(kip7.abi, kip7.address)
    console.log('eth: ', ethContract)
  }

  useEffect(() => {
    if (web3) {
      instantiateEthContract()
    }
  }, [web3])

  useEffect(() => {
    if (caver) {
      instantiateKlayContract()
    }
  }, [caver])

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
      <div className="mt-20">{currentContract === 'KIP7' ? <KIP7 /> : <KIP17 />}</div>
    </div>
  )
}

export default Contracts

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'deployed')

  const addressPath = path.join(postsDirectory, 'deployedAddress')
  const addressContents = await fs.readFile(addressPath, 'utf8')

  const abiPath = path.join(postsDirectory, 'deployedABI')
  const abiContents = await fs.readFile(abiPath)
  let abi = JSON.parse(abiContents.toString())

  return {
    props: {
      address: addressContents,
      abi: abi,
    },
  }
}
