import Link from 'next/link'
import { useState, useEffect } from 'react'
import WalletModal from './WalletModal'

const Header = () => {
  const [walletModal, setWalletModal] = useState<boolean>(false)
  const connectKaikas = async () => {
    try {
      const accounts = await klaytn.enable()
      console.log('network: ', klatyn.networkVersion)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <header className="flex place-content-between p-6 text-gray-900 bg-gray-100 shadow shadow-md">
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
        <div className="flex justify-center">
          <li className="mx-10">
            <button onClick={() => setWalletModal(true)}>Connect Wallet</button>
          </li>
        </div>
      </ul>
    </header>
  )
}

export default Header
