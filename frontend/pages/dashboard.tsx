import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center">
        <h1>Fungible Tokens</h1>
      </div>
      <div className="flex justify-center">
        <h1>Non-Fungible Tokens</h1>
      </div>
    </div>
  )
}

export default Dashboard
