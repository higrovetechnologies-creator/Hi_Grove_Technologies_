import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Save, LogOut, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminProfile = () => {
  const { admin, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    const updates = {}
    if (formData.name !== admin.name) updates.name = formData.name
    if (formData.email !== admin.email) updates.email = formData.email

    if (Object.keys(updates).length > 0) {
      updateProfile(updates)
      setMessage('Profile updated successfully')
    }
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setMessage('Password changed successfully (demo mode - no actual change)')
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }))
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="brand-gradient-text-strong text-3xl font-bold">Admin Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-600 dark:text-brand-400 font-bold text-2xl">
                  {admin?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{admin?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{admin?.email}</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-8">
            {message && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-sm">
                {message}
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Profile Info */}
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Profile Information</span>
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div className="flex justify-end">
                  <button type="submit"
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Change Password</span>
              </h2>
              <form onSubmit={handleChangePassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2.5 pr-12 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input type="password" value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                  <input type="password" value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div className="flex justify-end">
                  <button type="submit"
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
                    <Lock className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminProfile
