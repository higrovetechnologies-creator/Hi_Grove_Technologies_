import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Eye, Trash2, MessageSquare, CheckCircle, X, ChevronDown } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'
import ConfirmModal from '../../components/ConfirmModal'
import { formatDate } from '../../utils/helpers'

const AdminEnquiries = () => {
  const { enquiries, updateEnquiry, deleteEnquiry } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [noteText, setNoteText] = useState('')

  const statuses = ['All', 'New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Converted', 'Closed']

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.message?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (id, status) => {
    updateEnquiry(id, { status })
  }

  const handleAddNote = () => {
    if (selectedEnquiry && noteText.trim()) {
      updateEnquiry(selectedEnquiry.id, { notes: noteText.trim() })
      setNoteText('')
      setSelectedEnquiry(prev => ({ ...prev, notes: noteText.trim() }))
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400',
      'Contacted': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      'In Discussion': 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400',
      'Proposal Sent': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
      'Converted': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      'Closed': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
    }
    return colors[status] || colors['New']
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="brand-gradient-text-strong text-3xl font-bold">Enquiries</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and respond to project inquiries</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-brand-600 text-white'
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries List */}
        {filteredEnquiries.length === 0 ? (
          <EmptyState
            title="No Enquiries Found"
            description={searchQuery || statusFilter !== 'All' ? "Try adjusting your search or filter." : "No enquiries received yet."}
          />
        ) : (
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{enquiry.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{enquiry.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{enquiry.websiteType || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(enquiry.createdAt)}</td>
                      <td className="px-6 py-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${getStatusColor(enquiry.status)}`}
                        >
                          {statuses.filter(s => s !== 'All').map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button
                            onClick={() => setDeleteId(enquiry.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-dark-border">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{enquiry.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{enquiry.email}</p>
                    </div>
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(enquiry.status)}`}
                    >
                      {statuses.filter(s => s !== 'All').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{enquiry.websiteType || 'General'} &middot; {formatDate(enquiry.createdAt)}</p>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => setSelectedEnquiry(enquiry)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button onClick={() => setDeleteId(enquiry.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
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

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedEnquiry(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-border"
          >
            <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Enquiry Details</h2>
              <button onClick={() => setSelectedEnquiry(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Company</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.company || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Website Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.websiteType || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Industry</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.industry || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Budget</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEnquiry.budget || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedEnquiry.createdAt)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Message</p>
                <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              </div>

              {selectedEnquiry.features && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Required Features</p>
                  <p className="text-gray-700 dark:text-gray-300">{selectedEnquiry.features}</p>
                </div>
              )}

              {/* Notes */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Internal Notes</p>
                {selectedEnquiry.notes && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl mb-3 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedEnquiry.notes}</p>
                  </div>
                )}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.filter(s => s !== 'All').map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedEnquiry.id, status)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                        selectedEnquiry.status === status
                          ? getStatusColor(status)
                          : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { deleteEnquiry(deleteId); setDeleteId(null); }}
        title="Delete Enquiry"
        message="Are you sure you want to delete this enquiry? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  )
}

export default AdminEnquiries
