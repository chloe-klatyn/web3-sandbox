import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return (
    <header className="flex place-content-between p-6 text-gray-700 bg-gray-200 shadow shadow-md">
      <Link href="/">
        <a className="mx-10">Home</a>
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
            <Link href="/signup">
              <a>Connect Wallet</a>
            </Link>
          </li>
        </div>
      </ul>
    </header>
  )
}

export default Header
