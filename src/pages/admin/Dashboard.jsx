import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FolderKanban, Briefcase, Mail, MessageSquare, Star,
  TrendingUp, Clock, ArrowRight, AlertCircle
} from 'lucide-react'
import { useData } from '../../context/DataContext'
import { formatDate } from '../../utils/helpers'

const StatCard = ({ icon: Icon, label, value, color, link }) => (
  <Link to={link} className="block">
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </motion.div>
  </Link>
)

const AdminDashboard = () => {
  const { projects, services, enquiries, testimonials, settings } = useData()

  const stats = [
    { icon: FolderKanban, label: 'Total Projects', value: projects.filter(p => p.active).length, color: 'bg-brand-600', link: '/admin/projects' },
    { icon: Briefcase, label: 'Active Services', value: services.filter(s => s.active).length, color: 'bg-green-500', link: '/admin/services' },
    { icon: Mail, label: 'Total Enquiries', value: enquiries.length, color: 'bg-orange-500', link: '/admin/enquiries' },
    { icon: MessageSquare, label: 'Testimonials', value: testimonials.filter(t => t.active).length, color: 'bg-brand-800', link: '/admin/testimonials' },
    { icon: Star, label: 'Featured Projects', value: projects.filter(p => p.featured && p.active).length, color: 'bg-yellow-500', link: '/admin/projects' },
  ]

  const recentEnquiries = enquiries.slice(0, 5)
  const recentProjects = projects.filter(p => p.active).slice(0, 5)

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="brand-gradient-text-strong text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {settings.company.name} Admin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Enquiries */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Enquiries</h2>
              </div>
              <Link to="/admin/enquiries" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                View All
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">No enquiries yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-dark-border">
                {recentEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{enquiry.name}</p>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{enquiry.websiteType || 'General Inquiry'}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(enquiry.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Projects */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FolderKanban className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
              </div>
              <Link to="/admin/projects" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                View All
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-dark-border">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{project.title}</p>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{project.category}</p>
                      {project.featured && (
                        <span className="text-xs text-brand-600 dark:text-brand-400">Featured</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
