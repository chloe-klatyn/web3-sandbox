import Header from './Header'
import Footer from './Footer'
import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'

const Layout = ({ children }: { children: any }) => {
  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      const provider = window['klaytn']
    }
    if (typeof window.ethereum !== 'undefined') {
      const provider = window.ethereum
      console.log('provider: ', provider)
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
