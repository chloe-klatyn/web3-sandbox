import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex place-content-between p-6 text-gray-700 bg-gray-200 shadow shadow-md">
      <Link href="/">
        <a className="mx-10">Home</a>
      </Link>
      <ul className="flex items-right ">
        <li className="mx-10">
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <div className="flex justify-center">
          <li className="mx-10">
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
