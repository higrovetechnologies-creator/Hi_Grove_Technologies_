import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, BookOpen, Shirt, Building2, HeartPulse, Store, Rocket, Briefcase, ShoppingBag } from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'

const iconMap = {
  GraduationCap, BookOpen, Shirt, Building2, HeartPulse, Store, Rocket, Briefcase, ShoppingBag
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const Industries = () => {
  const { industries } = useData()
  const activeIndustries = industries.filter(i => i.active).sort((a, b) => a.order - b.order)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="brand-gradient-text-strong text-4xl lg:text-5xl font-bold mb-4">Industries We Serve</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specialized digital solutions tailored to the unique challenges of different industries.
          </p>
        </motion.div>

        {activeIndustries.length === 0 ? (
          <EmptyState
            title="No Industries Available"
            description="Industry information will be added soon."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeIndustries.map((industry, index) => {
              const IconComponent = iconMap[industry.icon] || Store
              return (
                <motion.div
                  key={industry.id}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="block h-full p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{industry.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{industry.description}</p>

                    {industry.recommendedServices && industry.recommendedServices.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">Recommended:</p>
                        <div className="flex flex-wrap gap-2">
                          {industry.recommendedServices.map((service, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 text-xs rounded-full">
                              {service}
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

export default Industries
