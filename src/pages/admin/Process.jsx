import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, X, Save, ListOrdered } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'

const AdminProcess = () => {
  const { processSteps, updateProcessStep } = useData()
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const activeSteps = processSteps.filter(s => s.active).sort((a, b) => a.order - b.order)

  const handleEdit = (step) => {
    setEditingId(step.id)
    setEditForm({ title: step.title, description: step.description })
  }

  const handleSave = (id) => {
    updateProcessStep(id, editForm)
    setEditingId(null)
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="brand-gradient-text-strong text-3xl font-bold">Process Steps</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Edit your development process steps</p>
        </div>

        {activeSteps.length === 0 ? (
          <EmptyState title="No Process Steps" description="Process steps will appear here." />
        ) : (
          <div className="space-y-4">
            {activeSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6"
              >
                {editingId === step.id ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{step.step}</span>
                      </div>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors">Cancel</button>
                      <button onClick={() => handleSave(step.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors flex items-center space-x-1">
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-600 dark:text-brand-400 font-bold text-sm">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                      </div>
                    </div>
                    <button onClick={() => handleEdit(step)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors flex-shrink-0">
                      <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminProcess
