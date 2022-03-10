import Link from 'next/link'

const Subheader = () => {
  return (
    <div className="flex place-content-center items-center text-gray-900 bg-gray-100 shadow">
      <div className="flex text-xl">
        <Link href="/dashboard">
          <button className="mx-10 transition ease-in-out duration-400 delay-100 hover:-translate-y-1 hover:scale-110 hover:text-blue-600 hover:border-b-2 hover:border-blue-500 focus:border-blue-500 focus:text-blue-600 focus:border-b-2 pb-2 border-b-2 border-gray-100">
            Dashboard
          </button>
        </Link>
        <Link href="/contracts">
          <button className="mx-10 transition ease-in-out duration-400 delay-100 hover:-translate-y-1 hover:scale-110  hover:text-blue-600 hover:border-b-2 hover:border-blue-500 focus:border-blue-500 focus:text-blue-600 focus:border-b-2 pb-2 border-b-2 border-gray-100">
            Contracts
          </button>
        </Link>
        <Link href="/transfers">
          <button className="mx-10 transition ease-in-out duration-400 delay-100 hover:-translate-y-1 hover:scale-110  hover:text-blue-600 hover:border-b-2 hover:border-blue-500 focus:border-blue-500 focus:text-blue-600 focus:border-b-2 pb-2 border-b-2 border-gray-100">
            Transfers
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Subheader
