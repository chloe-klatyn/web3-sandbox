import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import WalletModal from './WalletModal'
import providerContext from '../context/context'
import { ChevronDownIcon } from '@heroicons/react/outline'

const networks = ['Baobab', 'Cypress']

const Header = () => {
  const { klaytnProvider, ethProvider } = useContext(providerContext)
  const [walletModal, setWalletModal] = useState<boolean>(false)
  const [network, setNetwork] = useState()

  const detectNetwork = () => {
    if (klaytnProvider) {
      const networkId = klaytnProvider.networkVersion
      if (networkId === 1001) {
        setNetwork('Baobab')
      } else if (networkId === 8217) {
        setNetwork('Cypress')
      }
    }
  }

  useEffect(() => {
    if (ethProvider && klaytnProvider) {
      if (!network) {
        detectNetwork()
      }
      klaytnProvider.on('networkChanged', function () {
        detectNetwork()
      })
    }
  }, [ethProvider, klaytnProvider])

  return (
    <header className="flex place-content-between p-6 items-center text-gray-900 bg-gray-100 shadow shadow-md">
      <WalletModal walletModal={walletModal} setWalletModal={setWalletModal} />
      <Link href="/">
        <a className="mx-10">Klaytn Kit</a>
      </Link>
      <ul>
        <li className="mx-10">
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
      </ul>
      <ul className="flex items-right">
        <div className="flex justify-center items-center">
          <div className="xl:w-84">
            <select
              className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              aria-label="Default select example"
              value={network}
              onChange={(e: any) => setNetwork(e.target.value)}
            >
              {networks.map((env) => (
                <option key={env}>{env}</option>
              ))}
              <ChevronDownIcon className="w-6 h-6 ml-2 cursor-pointer" stroke="grey" />
            </select>
          </div>
          <li className="mx-8">
            <button
              className="rounded-full bg-blue-600 p-3 text-white"
              onClick={() => setWalletModal(true)}
            >
              Connect Wallet
            </button>
          </li>
        </div>
      </ul>
    </header>
  )
}

export default Header
