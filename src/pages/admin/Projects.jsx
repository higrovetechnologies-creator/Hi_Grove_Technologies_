import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  Image as ImageIcon,
  ExternalLink,
  Upload,
  Link as LinkIcon,
  Loader2,
  Calendar
} from 'lucide-react'
import { useData } from '../../context/DataContext'
import EmptyState from '../../components/EmptyState'
import ConfirmModal from '../../components/ConfirmModal'

const MAX_IMAGE_SIZE = 8 * 1024 * 1024
const MAX_IMAGE_WIDTH = 1200
const IMAGE_QUALITY = 0.78

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const image = new Image()

      image.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_WIDTH / image.width)
        const width = Math.max(1, Math.round(image.width * scale))
        const height = Math.max(1, Math.round(image.height * scale))

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if (!context) {
          reject(new Error('Could not create image canvas'))
          return
        }

        context.drawImage(image, 0, 0, width, height)

        let dataUrl = canvas.toDataURL('image/webp', IMAGE_QUALITY)

        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', IMAGE_QUALITY)
        }

        resolve(dataUrl)
      }

      image.onerror = () => reject(new Error('Invalid image'))
      image.src = reader.result
    }

    reader.onerror = () => reject(new Error('Could not read image'))
    reader.readAsDataURL(file)
  })
}

const emptyForm = {
  title: '',
  description: '',
  fullCaseStudy: '',
  category: '',
  industry: '',
  technologies: '',
  thumbnail: '',
  liveUrl: '',
  completionDate: '',
  featured: false,
  status: 'In Progress',
  active: true
}

const AdminProjects = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    addToast
  } = useData()

  const fileInputRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project)

      setFormData({
        title: project.title || '',
        description: project.description || '',
        fullCaseStudy: project.fullCaseStudy || '',
        category: project.category || '',
        industry: project.industry || '',
        technologies: project.technologies?.join(', ') || '',
        thumbnail: project.thumbnail || '',
        liveUrl: project.liveUrl || '',

        // Completion Date
        completionDate: project.completionDate
          ? project.completionDate.substring(0, 10)
          : '',

        featured: !!project.featured,
        status: project.status || 'In Progress',
        active: project.active !== false
      })
    } else {
      setEditingProject(null)
      setFormData({ ...emptyForm })
    }

    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    if (isImageUploading) return

    setIsModalOpen(false)
    setEditingProject(null)
    setFormData({ ...emptyForm })
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]

    event.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      addToast?.('Please select a valid image file', 'error')
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      addToast?.('Image must be smaller than 8MB', 'error')
      return
    }

    try {
      setIsImageUploading(true)

      const compressedImage = await compressImage(file)

      setFormData((prev) => ({
        ...prev,
        thumbnail: compressedImage
      }))

      addToast?.('Project image added successfully', 'success')
    } catch (error) {
      console.error('Image upload error:', error)

      addToast?.(
        'Could not process the image. Please try another image.',
        'error'
      )
    } finally {
      setIsImageUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.thumbnail.trim()) {
      addToast?.(
        'Please upload a project image or enter an image URL',
        'error'
      )
      return
    }

    const data = {
      ...formData,

      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),

      // Keep empty date as null
      completionDate: formData.completionDate || null,

      active: formData.active !== false
    }

    if (editingProject) {
      updateProject(editingProject.id, data)
      addToast?.('Project updated successfully', 'success')
    } else {
      addProject(data)
      addToast?.('Project created successfully', 'success')
    }

    setIsModalOpen(false)
    setEditingProject(null)
    setFormData({ ...emptyForm })
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="brand-gradient-text-strong text-3xl font-bold">
              Projects
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your portfolio projects
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Projects */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No Projects Yet"
            description="Your portfolio is empty. Add your first project to showcase your work."
            action={() => handleOpenModal()}
            actionLabel="Add Project"
          />
        ) : (
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden">

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Project
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Completed
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Featured
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                    >
                      {/* Project */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-bg flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}

                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {project.title}
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {project.industry}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {project.category}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.status === 'Completed'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      {/* Completion Date */}
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {project.completionDate
                          ? new Date(
                              `${project.completionDate.substring(0, 10)}T00:00:00`
                            ).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })
                          : '—'}
                      </td>

                      {/* Featured */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            updateProject(project.id, {
                              featured: !project.featured
                            })
                          }
                          className={`p-1.5 rounded-lg transition-colors ${
                            project.featured
                              ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                          title="Toggle featured"
                        >
                          <Star
                            className="w-5 h-5"
                            fill={
                              project.featured
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <a
                            href={`/portfolio/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                            title="View project"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </a>

                          <button
                            onClick={() => handleOpenModal(project)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                            title="Edit project"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>

                          <button
                            onClick={() => setDeleteId(project.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete project"
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

            {/* Mobile */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-dark-border">
              {filteredProjects.map((project) => (
                <div key={project.id} className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-dark-bg flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {project.title}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.category} · {project.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          project.status === 'Completed'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}
                      >
                        {project.status}
                      </span>

                      {project.featured && (
                        <Star
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                        title="Edit project"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>

                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {project.completionDate && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />

                      <span>
                        Completed:{' '}
                        {new Date(
                          `${project.completionDate.substring(0, 10)}T00:00:00`
                        ).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-border"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProject
                  ? 'Edit Project'
                  : 'Add New Project'}
              </h2>

              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Title *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        industry: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Project Image */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Image *
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {formData.thumbnail ? (
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg">
                      <img
                        src={formData.thumbnail}
                        alt="Project preview"
                        className="w-full h-56 object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          disabled={isImageUploading}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white/95 hover:bg-white text-gray-900 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          {isImageUploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}

                          Change Image
                        </button>

                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/90 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      disabled={isImageUploading}
                      className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-dark-border hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl bg-gray-50 dark:bg-dark-bg flex flex-col items-center justify-center gap-3 transition-colors disabled:opacity-50"
                    >
                      {isImageUploading ? (
                        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {isImageUploading
                            ? 'Processing image...'
                            : 'Click to upload project image'}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG, WEBP or GIF · Max 8MB
                        </p>
                      </div>
                    </button>
                  )}

                  <div className="flex items-center gap-3 my-3">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-dark-border" />

                    <span className="text-xs text-gray-400 uppercase">
                      or use URL
                    </span>

                    <div className="h-px flex-1 bg-gray-200 dark:bg-dark-border" />
                  </div>

                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <input
                      type="text"
                      value={
                        formData.thumbnail.startsWith('data:image/')
                          ? ''
                          : formData.thumbnail
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          thumbnail: e.target.value
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="https://example.com/project-image.jpg"
                    />
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Uploaded images are automatically compressed before saving.
                  </p>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Short Description *
                  </label>

                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                {/* Case Study */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Case Study
                  </label>

                  <textarea
                    rows={4}
                    value={formData.fullCaseStudy}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullCaseStudy: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                {/* Technologies */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies (comma separated)
                  </label>

                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        technologies: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                {/* Live URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Live URL
                  </label>

                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        liveUrl: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="https://..."
                  />
                </div>

                {/* Completion Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Completion Date
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

                    <input
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          completionDate: e.target.value
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Select the date when this project was completed.
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="On Hold">
                      On Hold
                    </option>
                  </select>
                </div>

                {/* Active */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Visibility
                  </label>

                  <select
                    value={formData.active ? 'true' : 'false'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        active: e.target.value === 'true'
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="sm:col-span-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured: e.target.checked
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />

                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured Project
                    </span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isImageUploading}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingProject
                    ? 'Update Project'
                    : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          deleteProject(deleteId)
          setDeleteId(null)
        }}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  )
}

export default AdminProjects