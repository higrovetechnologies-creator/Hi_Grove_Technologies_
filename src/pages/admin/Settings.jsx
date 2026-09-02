import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Globe, Mail, Phone, MapPin, Instagram, Linkedin, Search, Tag, MousePointer } from 'lucide-react'
import { useData } from '../../context/DataContext'

const AdminSettings = () => {
  const { settings, updateSettings } = useData()
  const { company, contact, social, seo, cta, stats } = settings
  const [activeTab, setActiveTab] = useState('company')
  const [formData, setFormData] = useState({ company, contact, social, seo, cta, stats })

  const tabs = [
    { id: 'company', label: 'Company', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'social', label: 'Social', icon: Instagram },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'cta', label: 'CTA', icon: MousePointer },
    { id: 'stats', label: 'Statistics', icon: Tag },
  ]

  const handleSave = () => {
    updateSettings(formData)
  }

  const updateSection = (section, updates) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }))
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="brand-gradient-text-strong text-3xl font-bold">Site Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your website configuration</p>
          </div>
          <button onClick={handleSave}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors">
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 border-l-4 border-brand-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg border-l-4 border-transparent'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6">
              {activeTab === 'company' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Information</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
                    <input type="text" value={formData.company.name}
                      onChange={(e) => updateSection('company', { name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tagline</label>
                    <input type="text" value={formData.company.tagline}
                      onChange={(e) => updateSection('company', { tagline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea rows={3} value={formData.company.description}
                      onChange={(e) => updateSection('company', { description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" value={formData.contact.email}
                        onChange={(e) => updateSection('contact', { email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                      <input type="text" value={formData.contact.phone}
                        onChange={(e) => updateSection('contact', { phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WhatsApp</label>
                      <input type="text" value={formData.contact.whatsapp}
                        onChange={(e) => updateSection('contact', { whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Hours</label>
                      <input type="text" value={formData.contact.businessHours}
                        onChange={(e) => updateSection('contact', { businessHours: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                      <input type="text" value={formData.contact.address}
                        onChange={(e) => updateSection('contact', { address: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Media & Email</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Only Instagram, LinkedIn and your business email are shown publicly.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"><Instagram className="w-4 h-4" /> Instagram</label>
                      <input type="url" value={formData.social.instagram || ''}
                        onChange={(e) => updateSection('social', { instagram: e.target.value })}
                        placeholder="https://instagram.com/yourhandle"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"><Linkedin className="w-4 h-4" /> LinkedIn</label>
                      <input type="url" value={formData.social.linkedin || ''}
                        onChange={(e) => updateSection('social', { linkedin: e.target.value })}
                        placeholder="https://linkedin.com/company/yourcompany"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"><Mail className="w-4 h-4" /> Business Email</label>
                      <input type="email" value={formData.social.email || formData.contact.email || ''}
                        onChange={(e) => updateSection('social', { email: e.target.value })}
                        placeholder="higrovetechnologies@gmail.com"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">SEO Settings</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Title</label>
                    <input type="text" value={formData.seo.siteTitle}
                      onChange={(e) => updateSection('seo', { siteTitle: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
                    <textarea rows={2} value={formData.seo.metaDescription}
                      onChange={(e) => updateSection('seo', { metaDescription: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords</label>
                    <input type="text" value={formData.seo.keywords}
                      onChange={(e) => updateSection('seo', { keywords: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Robots</label>
                    <input type="text" value={formData.seo.robots}
                      onChange={(e) => updateSection('seo', { robots: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                </div>
              )}

              {activeTab === 'cta' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Call to Action</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary CTA Text</label>
                      <input type="text" value={formData.cta.primaryText}
                        onChange={(e) => updateSection('cta', { primaryText: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary CTA URL</label>
                      <input type="text" value={formData.cta.primaryUrl}
                        onChange={(e) => updateSection('cta', { primaryUrl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary CTA Text</label>
                      <input type="text" value={formData.cta.secondaryText}
                        onChange={(e) => updateSection('cta', { secondaryText: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary CTA URL</label>
                      <input type="text" value={formData.cta.secondaryUrl}
                        onChange={(e) => updateSection('cta', { secondaryUrl: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Homepage Statistics</h2>
                  {Object.entries(formData.stats).map(([key, stat]) => (
                    <div key={key} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" checked={stat.visible}
                            onChange={(e) => updateSection('stats', { [key]: { ...stat, visible: e.target.checked } })}
                            className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">Visible</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" value={stat.value}
                          onChange={(e) => updateSection('stats', { [key]: { ...stat, value: isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value) } })}
                          className="px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                          placeholder="Value" />
                        <input type="text" value={stat.label}
                          onChange={(e) => updateSection('stats', { [key]: { ...stat, label: e.target.value } })}
                          className="px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                          placeholder="Label" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminSettings
