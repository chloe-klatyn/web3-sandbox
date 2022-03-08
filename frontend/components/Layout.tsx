import Header from './Header'
import Footer from './Footer'
import 'tailwindcss/tailwind.css'
import { useEffect, useContext } from 'react'
import providerContext from '../context/context'

const Layout = ({ children }: { children: any }) => {
  const { ethProvider, klaytnProvider, setKlaytnProvider, setEthProvider } =
    useContext(providerContext)

  const checkKaikasStatus = async () => {
    const enabled = klaytnProvider._kaikas.isEnabled()
    console.log('enabled: ', enabled)
    const approved = await klaytnProvider._kaikas.isApproved()
    console.log('approved: ', approved)
    const unlocked = await klaytnProvider._kaikas.isUnlocked()
    console.log('unlocked: ', unlocked)
  }

  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      const provider = window['klaytn']
      setKlaytnProvider(provider)
    }
    if (typeof window.ethereum !== 'undefined') {
      const provider = window.ethereum
      setEthProvider(provider)
    }
  }, [])

  useEffect(() => {
    if (ethProvider && klaytnProvider) {
      checkKaikasStatus()
    }
  }, [ethProvider, klaytnProvider])

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
