import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, ArrowRight, GraduationCap, BookOpen, Shirt, Building2, HeartPulse, Store, Rocket, Briefcase, ShoppingBag } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'

const iconMap = {
  GraduationCap, BookOpen, Shirt, Building2, HeartPulse, Store, Rocket, Briefcase, ShoppingBag
}

const IndustryDetail = () => {
  const { slug } = useParams()
  const { industries, services } = useData()
  const industry = industries.find(i => i.slug === slug && i.active)

  if (!industry) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="Industry Not Found"
          description="The industry you're looking for doesn't exist or has been removed."
          action={() => window.history.back()}
          actionLabel="Go Back"
        />
      </div>
    )
  }

  const IconComponent = iconMap[industry.icon] || Store
  const recommendedServices = services.filter(s => industry.recommendedServices?.includes(s.name) && s.active)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/industries" className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Industries</span>
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h1 className="brand-gradient-text-strong text-3xl lg:text-4xl font-bold">{industry.name}</h1>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">{industry.description}</p>

          {industry.features && industry.features.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industry.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {industry.useCases && industry.useCases.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h2>
              <div className="space-y-3">
                {industry.useCases.map((useCase, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendedServices.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedServices.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/10 rounded-2xl border border-brand-200 dark:border-brand-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to get started?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Let's discuss how we can help your {industry.name.toLowerCase()} business succeed online.</p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default IndustryDetail
