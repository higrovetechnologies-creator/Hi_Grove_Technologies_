import { useData } from '../context/DataContext'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = () => {
  const { toasts, removeToast } = useData()

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-brand-500" />,
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex items-center space-x-3 px-4 py-3 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border min-w-[300px]"
          >
            {icons[toast.type]}
            <span className="text-sm text-gray-800 dark:text-gray-200 flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Toast
