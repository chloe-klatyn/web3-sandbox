import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      const provider = window['klaytn']
    } else {
      console.log('please install kaikas')
    }
  }, [])

  return <div className="flex justify-center">hello world</div>
}

export default Home
