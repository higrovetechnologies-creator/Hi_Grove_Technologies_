import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useData } from '../context/DataContext'
import companyLogo from '/logo.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const location = useLocation()
  const { settings } = useData()

  // ============================================================
  // SCROLL DETECTION
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // ============================================================
  // CLOSE MOBILE MENU WHEN ROUTE CHANGES
  // ============================================================

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // ============================================================
  // NAVIGATION LINKS
  // ============================================================

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  // ============================================================
  // COMPANY NAME
  // ============================================================

  const companyName =
    settings?.company?.name || 'HI GROVE TECHNOLOGIES'

  return (
    <motion.nav
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ================================================== */}
          {/* COMPANY BRAND */}
          {/* ================================================== */}

          <Link
            to="/"
            className="flex items-center gap-3 min-w-0"
          >

            {/* ================================================= */}
            {/* COMPANY LOGO */}
            {/* ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
              whileHover={{
                scale: 1.05,
              }}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={companyLogo}
                alt="HI GROVE TECHNOLOGIES Logo"
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
            </motion.div>

            {/* ================================================= */}
            {/* LETTER-BY-LETTER COMPANY NAME */}
            {/* ================================================= */}

            <motion.div
              key={location.pathname}
              initial="hidden"
              animate="visible"
              className="hidden sm:flex items-center min-w-0"
            >
              {companyName.split('').map((letter, index) => (
                <motion.span
                  key={`${location.pathname}-${index}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 8,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.28,
                        delay: 0.06 + index * 0.045,
                        ease: 'easeOut',
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="inline-block whitespace-pre font-bold text-lg lg:text-xl brand-gradient-text-strong origin-center"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

          </Link>

          {/* ================================================== */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================================== */}

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE */}
          {/* ================================================== */}

          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <Link
              to="/contact"
              className="hidden lg:inline-flex px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white brand-glow-hover text-sm font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>

            {/* ================================================= */}
            {/* MOBILE MENU BUTTON */}
            {/* ================================================= */}

            <button
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                  >
                    <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* ===================================================== */}
      {/* MOBILE NAVIGATION */}
      {/* ===================================================== */}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="lg:hidden bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/contact"
                className="block w-full text-center px-4 py-3 mt-4 bg-brand-600 hover:bg-brand-700 text-white brand-glow-hover text-sm font-medium rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  )
}

export default Navbar