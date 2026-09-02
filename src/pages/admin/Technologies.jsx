import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Edit2, Trash2, X, Atom, FileCode, Code, Paintbrush, Wind, Server, Database, Leaf, Plug, Cloud } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'
import ConfirmModal from '../../components/ConfirmModal'

const iconMap = {
  Atom, FileCode, Code, Paintbrush, Wind, Server, Database, Leaf, Plug, Cloud
}

const AdminTechnologies = () => {
  const { technologies, addTechnology, updateTechnology, deleteTechnology } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTech, setEditingTech] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({
    name: '', icon: 'Code', category: 'Frontend', description: '', active: true
  })

  const filteredTechs = technologies.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (tech = null) => {
    if (tech) {
      setEditingTech(tech)
      setFormData({
        name: tech.name,
        icon: tech.icon || 'Code',
        category: tech.category || 'Frontend',
        description: tech.description || '',
        active: tech.active
      })
    } else {
      setEditingTech(null)
      setFormData({ name: '', icon: 'Code', category: 'Frontend', description: '', active: true })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...formData, active: true }
    if (editingTech) {
      updateTechnology(editingTech.id, data)
    } else {
      addTechnology(data)
    }
    setIsModalOpen(false)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="brand-gradient-text-strong text-3xl font-bold">Technologies</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage MERN, PERN and other technologies displayed on the website</p>
          </div>
          <button onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Technology</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search technologies..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
        </div>

        {filteredTechs.length === 0 ? (
          <EmptyState title="No Technologies Yet" description="Add technologies to showcase your tech stack."
            action={() => handleOpenModal()} actionLabel="Add Technology" />
        ) : (
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Technology</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {filteredTechs.map((tech) => {
                    const IconComponent = iconMap[tech.icon] || Code
                    return (
                      <tr key={tech.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">{tech.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{tech.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{tech.category}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => updateTechnology(tech.id, { active: !tech.active })}
                            className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                              tech.active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                            {tech.active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <button onClick={() => handleOpenModal(tech)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button onClick={() => setDeleteId(tech.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
              {filteredTechs.map((tech) => {
                const IconComponent = iconMap[tech.icon] || Code
                return (
                  <div key={tech.id} className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{tech.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button onClick={() => updateTechnology(tech.id, { active: !tech.active })}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          tech.active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                        {tech.active ? 'Active' : 'Inactive'}
                      </button>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => handleOpenModal(tech)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                          <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button onClick={() => setDeleteId(tech.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-lg w-full border border-gray-200 dark:border-dark-border">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingTech ? 'Edit Technology' : 'Add Technology'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon</label>
                  <select value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {Object.keys(iconMap).map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Language">Language</option>
                    <option value="Integration">Integration</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="PERN Stack">PERN Stack</option>
                    <option value="Deployment">Deployment</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <input type="text" value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors">Cancel</button>
                <button type="submit"
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors">
                  {editingTech ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => { deleteTechnology(deleteId); setDeleteId(null); }}
        title="Delete Technology" message="Are you sure you want to delete this technology?" confirmText="Delete" />
    </div>
  )
}

export default AdminTechnologies
