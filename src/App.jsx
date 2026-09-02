import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

import Home from './pages/public/Home'
import Services from './pages/public/Services'
import ServiceDetail from './pages/public/ServiceDetail'
import Industries from './pages/public/Industries'
import IndustryDetail from './pages/public/IndustryDetail'
import Portfolio from './pages/public/Portfolio'
import PortfolioDetail from './pages/public/PortfolioDetail'
import Process from './pages/public/Process'
import About from './pages/public/About'
import Contact from './pages/public/Contact'

import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminEnquiries from './pages/admin/Enquiries'
import AdminProjects from './pages/admin/Projects'
import AdminServices from './pages/admin/Services'
import AdminIndustries from './pages/admin/Industries'
import AdminTestimonials from './pages/admin/Testimonials'
import AdminProcess from './pages/admin/Process'
import AdminTechnologies from './pages/admin/Technologies'
import AdminAbout from './pages/admin/About'
import AdminSettings from './pages/admin/Settings'
import AdminProfile from './pages/admin/Profile'


// ============================================================
// SCROLL TO TOP
// ============================================================

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}


// ============================================================
// APP
// ============================================================

const App = () => {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >

          {/* ================================================== */}
          {/* PUBLIC */}
          {/* ================================================== */}

          <Route element={<Layout />}>

            <Route
              index
              element={<Home />}
            />

            <Route
              path="/services"
              element={<Services />}
            />

            <Route
              path="/services/:slug"
              element={<ServiceDetail />}
            />

            <Route
              path="/industries"
              element={<Industries />}
            />

            <Route
              path="/industries/:slug"
              element={<IndustryDetail />}
            />

            <Route
              path="/portfolio"
              element={<Portfolio />}
            />

            <Route
              path="/portfolio/:slug"
              element={<PortfolioDetail />}
            />

            <Route
              path="/process"
              element={<Process />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Route>


          {/* ================================================== */}
          {/* ADMIN LOGIN */}
          {/* ================================================== */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />


          {/* ================================================== */}
          {/* PROTECTED ADMIN */}
          {/* ================================================== */}

          <Route element={<ProtectedRoute />}>

            <Route element={<AdminLayout />}>

              <Route
                path="/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/enquiries"
                element={<AdminEnquiries />}
              />

              <Route
                path="/admin/projects"
                element={<AdminProjects />}
              />

              <Route
                path="/admin/services"
                element={<AdminServices />}
              />

              <Route
                path="/admin/industries"
                element={<AdminIndustries />}
              />

              <Route
                path="/admin/testimonials"
                element={<AdminTestimonials />}
              />

              <Route
                path="/admin/process"
                element={<AdminProcess />}
              />

              <Route
                path="/admin/technologies"
                element={<AdminTechnologies />}
              />

              <Route
                path="/admin/about"
                element={<AdminAbout />}
              />

              <Route
                path="/admin/settings"
                element={<AdminSettings />}
              />

              <Route
                path="/admin/profile"
                element={<AdminProfile />}
              />

            </Route>

          </Route>

        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App