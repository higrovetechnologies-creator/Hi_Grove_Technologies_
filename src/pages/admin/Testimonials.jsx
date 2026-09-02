import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Edit2, Trash2, X, Star, MessageSquare } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'
import ConfirmModal from '../../components/ConfirmModal'

const AdminTestimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({
    name: '', role: '', company: '', text: '', rating: 5, active: true
  })

  const filteredTestimonials = testimonials.filter(t =>
    t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.text?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      setFormData({
        name: testimonial.name,
        role: testimonial.role || '',
        company: testimonial.company || '',
        text: testimonial.text,
        rating: testimonial.rating || 5,
        active: testimonial.active
      })
    } else {
      setEditingTestimonial(null)
      setFormData({ name: '', role: '', company: '', text: '', rating: 5, active: true })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...formData, active: true }
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, data)
    } else {
      addTestimonial(data)
    }
    setIsModalOpen(false)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="brand-gradient-text-strong text-3xl font-bold">Testimonials</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage client testimonials</p>
          </div>
          <button onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Testimonial</span>
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search testimonials..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
        </div>

        {filteredTestimonials.length === 0 ? (
          <EmptyState title="No Testimonials Yet" description="Add client testimonials to build trust with visitors."
            action={() => handleOpenModal()} actionLabel="Add Testimonial" />
        ) : (
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {filteredTestimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-0.5">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-4 h-4 ${star <= t.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={star <= t.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => updateTestimonial(t.id, { active: !t.active })}
                          className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                            t.active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                          {t.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button onClick={() => handleOpenModal(t)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button onClick={() => setDeleteId(t.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-gray-100 dark:divide-dark-border">
              {filteredTestimonials.map((t) => (
                <div key={t.id} className="p-4">
                  <div className="mb-2">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-0.5">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className={`w-3 h-3 ${star <= t.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={star <= t.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => handleOpenModal(t)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button onClick={() => setDeleteId(t.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-border">
            <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <select value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {[5,4,3,2,1].map(r => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <input type="text" value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                  <input type="text" value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Testimonial Text *</label>
                  <textarea rows={4} required value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors">Cancel</button>
                <button type="submit"
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors">
                  {editingTestimonial ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => { deleteTestimonial(deleteId); setDeleteId(null); }}
        title="Delete Testimonial" message="Are you sure you want to delete this testimonial?" confirmText="Delete" />
    </div>
  )
}

export default AdminTestimonials
