import type { NextPage } from 'next'
import { ToastContainer, toast } from 'react-toastify'

const Home: NextPage = () => {
  return (
    <div className="flex justify-center mt-20">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Instructions </h1>
        <div>To deploy contracts: </div>
      </div>
    </div>
  )
}

export default Home
