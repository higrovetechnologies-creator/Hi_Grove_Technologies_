import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const Process = () => {
  const { processSteps } = useData()
  const activeSteps = processSteps.filter(s => s.active).sort((a, b) => a.order - b.order)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="brand-gradient-text-strong text-4xl lg:text-5xl font-bold mb-4">Our Process</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A proven methodology that ensures every project is delivered on time, on budget, and exceeds expectations.
          </p>
        </motion.div>

        {activeSteps.length === 0 ? (
          <EmptyState
            title="Process Information Coming Soon"
            description="Our process details will be added shortly."
          />
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-700 dark:from-brand-700 dark:via-brand-500 dark:to-brand-300" />

            <div className="space-y-12">
              {activeSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-600 dark:bg-brand-500 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-bg z-10 shadow-lg">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div className={`ml-24 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Process
