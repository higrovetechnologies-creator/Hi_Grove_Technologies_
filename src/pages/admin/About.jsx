import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X, Edit2 } from 'lucide-react'
import { useData } from '../../context/DataContext'

const AdminAbout = () => {
  const { settings, updateSettings } = useData()
  const { company } = settings
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: company.name,
    tagline: company.tagline,
    description: company.description,
  })

  const handleSave = () => {
    updateSettings({
      company: { ...company, ...formData }
    })
    setIsEditing(false)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="brand-gradient-text-strong text-3xl font-bold">About Page</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your company information</p>
          </div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}
              className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button onClick={() => setIsEditing(false)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors">
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button onClick={handleSave}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{company.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tagline</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{company.tagline}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            {isEditing ? (
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">{company.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminAbout
