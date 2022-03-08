import Header from './Header'
import Footer from './Footer'
import 'tailwindcss/tailwind.css'
import { useEffect, useContext } from 'react'
import providerContext from '../context/context'

const Layout = ({ children }: { children: any }) => {
  const context = useContext(providerContext)
  console.log('context: ', context)

  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      const provider = window['klaytn']
      console.log('klay provider: ', provider)
    }
    if (typeof window.ethereum !== 'undefined') {
      const provider = window.ethereum
      console.log('eth provider: ', provider)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
