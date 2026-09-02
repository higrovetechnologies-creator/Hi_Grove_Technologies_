import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, ArrowRight, Globe, ShoppingCart, Code2, Palette, Wrench, Search } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'

const iconMap = {
  Globe, ShoppingCart, Code2, Palette, Wrench, Search
}

const ServiceDetail = () => {
  const { slug } = useParams()
  const { services } = useData()
  const service = services.find(s => s.slug === slug && s.active)

  if (!service) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Service Not Found"
          description="The service you're looking for doesn't exist or has been removed."
          action={() => window.history.back()}
          actionLabel="Go Back"
        />
      </div>
    )
  }

  const IconComponent = iconMap[service.icon] || Code2

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/services" className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h1 className="brand-gradient-text-strong text-3xl lg:text-4xl font-bold">{service.name}</h1>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{service.fullDescription}</p>

          {service.features && service.features.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                    <Check className="w-5 h-5 text-brand-600 dark:text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.technologies && service.technologies.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1.5 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {service.subServices && service.subServices.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What We Offer</h2>
              <div className="space-y-3">
                {service.subServices.map((sub, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-7 bg-gradient-to-r from-brand-50 to-cyan-50 dark:from-dark-card dark:to-dark-elevated rounded-2xl border border-brand-200 dark:border-dark-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p className="text-sm font-medium text-brand-700 dark:text-cyan-400 mb-1">Let’s build it together</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Tell us what you need and get a tailored response.</p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl brand-glow-hover"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceDetail
