import type { NextPage } from 'next'
import InfoCard from '../components/InfoCard'

const Dashboard: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center mt-20">
      <div className="grid grid-cols-3 w-2/3">
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  )
}

export default Dashboard
