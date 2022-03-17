import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import KIP7 from '../components/KIP7'
import KIP17 from '../components/KIP17'
import KIP37 from '../components/KIP37'
import providerContext from '../context/context'

const Contracts: NextPage = (contractData: any) => {
  const [currentContract, setCurrentContract] = useState('KIP7')
  const { web3, caver } = useContext(providerContext)
  const [kip7, setKip7] = useState()
  const [kip17, setKip17] = useState()
  const [kip37, setKip37] = useState()

  const instantiateKlayContract = async () => {
    const kip7Contract = new caver.klay.Contract(contractData.kip7abi, contractData.kip7address)
    setKip7(kip7Contract)
    // console.log('klay contract: ', kip7Contract)
  }

  const instantiateEthContract = async () => {
    const kip7Contract = new web3.eth.Contract(contractData.kip7abi, contractData.kip7address)
    setKip7(kip7Contract)
    // console.log('eth contract: ', kip7Contract)
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
          className="border-b-2 border-white hover:border-b-2 hover:border-grey focus:border-grey"
          onClick={() => {
            setCurrentContract('KIP7')
          }}
        >
          KIP7
        </button>
        <button
          className="border-b-2 border-white hover:border-b-2 hover:border-grey focus:border-grey"
          onClick={() => {
            setCurrentContract('KIP17')
          }}
        >
          KIP17
        </button>
        <button
          className="border-b-2 border-white hover:border-b-2 hover:border-grey focus:border-grey"
          onClick={() => {
            setCurrentContract('KIP37')
          }}
        >
          KIP37
        </button>
      </div>
      <div className="mt-20">{currentContract === 'KIP7' && <KIP7 kip7={kip7} />}</div>
      <div className="mt-20">{currentContract === 'KIP17' && <KIP17 kip17={kip17} />}</div>
      <div className="mt-20">{currentContract === 'KIP37' && <KIP37 kip37={kip37} />}</div>
    </div>
  )
}

export default Contracts

export async function getStaticProps() {
  const contractsDirectory = path.join(process.cwd(), 'deployed')

  const kip7addressPath = path.join(contractsDirectory, 'kip7TokenAddress')
  const kip7addressContents = await fs.readFile(kip7addressPath, 'utf8')
  const kip7abiPath = path.join(contractsDirectory, 'kip7TokenABI')
  const kip7abiContents = await fs.readFile(kip7abiPath)
  let kip7abi = JSON.parse(kip7abiContents.toString())

  const kip17addressPath = path.join(contractsDirectory, 'kip17TokenAddress')
  const kip17addressContents = await fs.readFile(kip17addressPath, 'utf8')
  const kip17abiPath = path.join(contractsDirectory, 'kip17TokenABI')
  const kip17abiContents = await fs.readFile(kip17abiPath)
  let kip17abi = JSON.parse(kip17abiContents.toString())

  return {
    props: {
      kip7address: kip7addressContents,
      kip7abi: kip7abi,
      kip17address: kip17addressContents,
      kip17abi: kip17abi,
    },
  }
}
