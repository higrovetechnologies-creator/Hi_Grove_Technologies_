import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  GraduationCap,
  BookOpen,
  Shirt,
  Building2,
  HeartPulse,
  Store,
  Rocket,
  Briefcase,
  ShoppingBag
} from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'
import ConfirmModal from '../../components/ConfirmModal'

const iconMap = {
  GraduationCap,
  BookOpen,
  Shirt,
  Building2,
  HeartPulse,
  Store,
  Rocket,
  Briefcase,
  ShoppingBag
}

const AdminIndustries = () => {
  const {
    industries,
    addIndustry,
    updateIndustry,
    deleteIndustry
  } = useData()

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndustry, setEditingIndustry] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    icon: 'Store',
    description: '',
    recommendedServices: '',
    features: '',
    useCases: '',
    active: true
  })

  const filteredIndustries = industries.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (industry = null) => {
    if (industry) {
      setEditingIndustry(industry)

      setFormData({
        name: industry.name,
        icon: industry.icon || 'Store',
        description: industry.description || '',
        recommendedServices:
          industry.recommendedServices?.join('\n') || '',
        features:
          industry.features?.join('\n') || '',
        useCases:
          industry.useCases?.join('\n') || '',
        active: industry.active ?? true
      })
    } else {
      setEditingIndustry(null)

      setFormData({
        name: '',
        icon: 'Store',
        description: '',
        recommendedServices: '',
        features: '',
        useCases: '',
        active: true
      })
    }

    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      ...formData,

      recommendedServices: formData.recommendedServices
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),

      features: formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),

      useCases: formData.useCases
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean),

      active: true
    }

    if (editingIndustry) {
      updateIndustry(editingIndustry.id, data)
    } else {
      addIndustry(data)
    }

    setIsModalOpen(false)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="brand-gradient-text-strong text-3xl font-bold">
              Industries
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage industry-specific solutions
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Industry</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {filteredIndustries.length === 0 ? (
          <EmptyState
            title="No Industries Yet"
            description="Add your first industry to display on the website."
            action={() => handleOpenModal()}
            actionLabel="Add Industry"
          />
        ) : (
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Industry
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {filteredIndustries.map((industry) => {
                    const IconComponent =
                      iconMap[industry.icon] || Store

                    return (
                      <tr
                        key={industry.id}
                        className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                            </div>

                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {industry.name}
                              </p>

                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {industry.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              updateIndustry(industry.id, {
                                active: !industry.active
                              })
                            }
                            className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                              industry.active
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {industry.active ? 'Active' : 'Inactive'}
                          </button>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => handleOpenModal(industry)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>

                            <button
                              onClick={() => setDeleteId(industry.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-100 dark:divide-dark-border">
              {filteredIndustries.map((industry) => {
                const IconComponent =
                  iconMap[industry.icon] || Store

                return (
                  <div key={industry.id} className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {industry.name}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {industry.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          updateIndustry(industry.id, {
                            active: !industry.active
                          })
                        }
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          industry.active
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {industry.active ? 'Active' : 'Inactive'}
                      </button>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenModal(industry)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>

                        <button
                          onClick={() => setDeleteId(industry.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-border"
          >
            <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingIndustry
                  ? 'Edit Industry'
                  : 'Add New Industry'}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>

                  <select
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        icon: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {Object.keys(iconMap).map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>

                  <textarea
                    rows={2}
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recommended Services (one per line)
                  </label>

                  <textarea
                    rows={3}
                    value={formData.recommendedServices}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recommendedServices: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features (one per line)
                  </label>

                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        features: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Use Cases (one per line)
                  </label>

                  <textarea
                    rows={3}
                    value={formData.useCases}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        useCases: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {editingIndustry
                    ? 'Update Industry'
                    : 'Create Industry'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          deleteIndustry(deleteId)
          setDeleteId(null)
        }}
        title="Delete Industry"
        message="Are you sure you want to delete this industry? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  )
}

export default AdminIndustries