import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle
} from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'
import { formatDate } from '../../utils/helpers'

const PortfolioDetail = () => {
  const { slug } = useParams()
  const { projects } = useData()

  const project = projects.find(
    (p) => p.slug === slug && p.active
  )

  if (!project) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Project Not Found"
          description="The project you're looking for doesn't exist or has been removed."
          action={() => window.history.back()}
          actionLabel="Go Back"
        />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back */}
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />

            <span>Back to Portfolio</span>
          </Link>

          {/* Hero */}
          <div className="relative rounded-2xl overflow-hidden mb-10">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-80 lg:h-96 object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-brand-600 text-white text-sm font-medium rounded-full">
                  {project.category}
                </span>

                <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                  {project.industry}
                </span>
              </div>

              <h1 className="brand-gradient-text-strong text-3xl lg:text-4xl font-bold">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">

              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Project
                </h2>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Case Study */}
              {project.fullCaseStudy && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Case Study
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {project.fullCaseStudy}
                  </p>
                </div>
              )}

              {/* Technologies */}
              {project.technologies &&
                project.technologies.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Technologies Used
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Project Details */}
              <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>

                <div className="space-y-4">

                  {/* Category */}
                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-gray-400" />

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Category
                      </p>

                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gray-400" />

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Status
                      </p>

                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.status}
                      </p>
                    </div>
                  </div>

                  {/* Completion Date */}
                  {project.completionDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Completed
                        </p>

                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(
                            project.completionDate
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Demo */}
              {project.liveUrl &&
                project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    <span>View Live Demo</span>

                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}

              {/* Contact */}
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-xl transition-colors"
              >
                <span>Start a Similar Project</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioDetail