import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Toast from './Toast'
import Seo from './Seo'

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Seo />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

export default Layout
