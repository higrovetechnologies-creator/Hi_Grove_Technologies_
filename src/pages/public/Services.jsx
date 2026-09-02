import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, ShoppingCart, Code2, Palette, Wrench, Search } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'

const iconMap = {
  Globe, ShoppingCart, Code2, Palette, Wrench, Search
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const Services = () => {
  const { services } = useData()
  const activeServices = services.filter(s => s.active).sort((a, b) => a.order - b.order)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="brand-gradient-text-strong text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to help your business succeed online.
          </p>
        </motion.div>

        {activeServices.length === 0 ? (
          <EmptyState
            title="No Services Available"
            description="Services will be added soon. Please check back later."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code2
              return (
                <motion.div
                  key={service.id}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="block h-full p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{service.shortDescription}</p>

                    {service.subServices && service.subServices.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">Includes:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.subServices.map((sub, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 text-xs rounded-full">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-brand-600 dark:text-brand-400 font-medium">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
