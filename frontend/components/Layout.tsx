import Header from './Header'
import Footer from './Footer'
import 'tailwindcss/tailwind.css'

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-sand font-Montserrat">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
