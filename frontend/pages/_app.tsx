import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'
import GlobalContext from '../context/context'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [klaytnProvider, setKlaytnProvider] = useState()
  const [ethProvider, setEthProvider] = useState()

  const contextData = {
    klaytnProvider: klaytnProvider,
    ethProvider: ethProvider,
    setKlaytnProvider: setKlaytnProvider,
    setEthProvider: setEthProvider,
  }

  return (
    <div>
      <GlobalContext.Provider value={contextData}>
        <Head>
          <title>klaytn</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </div>
  )
}

export default MyApp
