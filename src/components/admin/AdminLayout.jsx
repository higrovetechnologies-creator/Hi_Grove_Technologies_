import { useState } from 'react'
import {
  Outlet,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

import {
  LayoutDashboard,
  Mail,
  FolderKanban,
  Briefcase,
  Building2,
  MessageSquare,
  ListOrdered,
  Cpu,
  Info,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../../components/ThemeToggle'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const { admin, logout } = useAuth()

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin'
    },
    {
      icon: Mail,
      label: 'Enquiries',
      path: '/admin/enquiries'
    },
    {
      icon: FolderKanban,
      label: 'Projects',
      path: '/admin/projects'
    },
    {
      icon: Briefcase,
      label: 'Services',
      path: '/admin/services'
    },
    {
      icon: Building2,
      label: 'Industries',
      path: '/admin/industries'
    },
    {
      icon: MessageSquare,
      label: 'Testimonials',
      path: '/admin/testimonials'
    },
    {
      icon: ListOrdered,
      label: 'Process',
      path: '/admin/process'
    },
    {
      icon: Cpu,
      label: 'Technologies',
      path: '/admin/technologies'
    },
    {
      icon: Info,
      label: 'About',
      path: '/admin/about'
    },
    {
      icon: Settings,
      label: 'Site Settings',
      path: '/admin/settings'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/admin/profile'
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const SidebarLinks = ({ mobile = false }) => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {menuItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.path)

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => {
              if (mobile) {
                setIsMobileMenuOpen(false)
              }
            }}
            title={!mobile && !isSidebarOpen ? item.label : undefined}
            className={`
              flex items-center space-x-3
              px-3 py-2.5
              rounded-xl
              text-sm font-medium
              transition-colors
              ${
                active
                  ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <Icon
              className={`
                w-5 h-5 flex-shrink-0
                ${
                  active
                    ? 'text-brand-600 dark:text-brand-400'
                    : ''
                }
              `}
            />

            <span
              className={
                mobile
                  ? ''
                  : `overflow-hidden transition-all ${
                      isSidebarOpen
                        ? 'w-auto opacity-100'
                        : 'w-0 opacity-0'
                    }`
              }
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )

  const Logo = ({ mobile = false }) => (
    <div
      className={`
        flex items-center space-x-3
        ${
          mobile
            ? 'px-4 py-4'
            : 'px-4 py-6'
        }
        border-b border-gray-200 dark:border-dark-border
      `}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-sm">
          HG
        </span>
      </div>

      <div
        className={
          mobile
            ? ''
            : `overflow-hidden transition-all ${
                isSidebarOpen
                  ? 'w-auto opacity-100'
                  : 'w-0 opacity-0'
              }`
        }
      >
        <p className="font-bold text-gray-900 dark:text-white text-sm">
          Hi Grove
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Admin Panel
        </p>
      </div>
    </div>
  )

  const LogoutButton = ({ mobile = false }) => (
    <button
      onClick={handleLogout}
      className="
        flex items-center space-x-3
        w-full px-3 py-2.5
        rounded-xl
        text-sm font-medium
        text-red-600 dark:text-red-400
        hover:bg-red-50 dark:hover:bg-red-900/20
        transition-colors
      "
    >
      <LogOut className="w-5 h-5 flex-shrink-0" />

      <span
        className={
          mobile
            ? ''
            : `overflow-hidden transition-all ${
                isSidebarOpen
                  ? 'w-auto opacity-100'
                  : 'w-0 opacity-0'
              }`
        }
      >
        Logout
      </span>
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex
          flex-col
          bg-white dark:bg-dark-card
          border-r border-gray-200 dark:border-dark-border
          transition-all duration-300
          ${
            isSidebarOpen
              ? 'w-64'
              : 'w-20'
          }
        `}
      >
        <Logo />

        <SidebarLinks />

        <div className="px-3 py-4 border-t border-gray-200 dark:border-dark-border">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside
            className="
              fixed
              left-0 top-0 bottom-0
              w-64
              bg-white dark:bg-dark-card
              border-r border-gray-200 dark:border-dark-border
              z-50
              flex flex-col
              lg:hidden
            "
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-dark-border">
              <Logo mobile />

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 mr-3 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <SidebarLinks mobile />

            <div className="px-3 py-4 border-t border-gray-200 dark:border-dark-border">
              <LogoutButton mobile />
            </div>
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header
          className="
            sticky top-0 z-30
            bg-white/80 dark:bg-dark-bg/80
            backdrop-blur-md
            border-b border-gray-200 dark:border-dark-border
            px-4 sm:px-6 py-3
          "
        >
          <div className="flex items-center justify-between">

            <div className="flex items-center space-x-3">

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              <button
                onClick={() =>
                  setIsSidebarOpen((value) => !value)
                }
                className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg"
              >
                {isSidebarOpen ? (
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

            </div>

            <div className="flex items-center space-x-3">

              <ThemeToggle />

              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-dark-border">

                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                  <span className="text-brand-600 dark:text-brand-400 font-bold text-xs">
                    {admin?.name
                      ? admin.name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()
                      : 'A'}
                  </span>
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {admin?.name || 'Administrator'}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>

              </div>
            </div>

          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AdminLayout