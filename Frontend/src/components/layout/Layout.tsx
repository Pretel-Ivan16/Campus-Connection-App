import { Outlet } from 'react-router-dom'
import Header from "./header/Header"
import Footer from "./footer/Footer"

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
