import { createContext, useContext, useEffect, useState } from 'react'
import { generateSlug } from '../utils/helpers'
import {
  getAllContent,
  saveContent,
  getEnquiries,
  insertEnquiry,
  updateEnquiryRemote,
  deleteEnquiryRemote,
  isCloudConfigured,
  getAccessToken,
} from '../utils/cloud'

const DataContext = createContext()

const getStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch {
    return defaultValue
  }
}

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const initialServices = [
  {
    id: '1',
    name: 'Website Development',
    slug: 'website-development',
    icon: 'Globe',
    shortDescription: 'Custom websites tailored to your business needs',
    fullDescription: 'We build responsive, high-performance websites that drive results. From simple landing pages to complex corporate websites.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'JavaScript', 'TypeScript'],
    startingPrice: 999,
    active: true,
    order: 1,
    subServices: ['Landing Pages', 'Portfolio Websites', 'Business Websites', 'Corporate Websites']
  },
  {
    id: '2',
    name: 'E-Commerce Development',
    slug: 'e-commerce-development',
    icon: 'ShoppingCart',
    shortDescription: 'Online stores that convert visitors into customers',
    fullDescription: 'Full-featured e-commerce solutions with secure payment gateways, inventory management, and user-friendly interfaces.',
    features: ['Payment Integration', 'Inventory Management', 'User Accounts', 'Order Tracking'],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Stripe'],
    startingPrice: 2499,
    active: true,
    order: 2,
    subServices: ['Basic E-Commerce', 'Standard E-Commerce', 'Advanced Custom E-Commerce']
  },
  {
    id: '3',
    name: 'Custom Solutions',
    slug: 'custom-solutions',
    icon: 'Code2',
    shortDescription: 'Bespoke web applications for unique requirements',
    fullDescription: 'Tailored web applications built to solve your specific business challenges with modern technologies.',
    features: ['Custom Workflows', 'API Integration', 'Real-time Updates', 'Scalable Architecture'],
    technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis'],
    startingPrice: 4999,
    active: true,
    order: 3,
    subServices: ['Custom Web Applications', 'Dashboard Development', 'Booking Systems', 'Management Systems', 'API Integrations']
  },
  {
    id: '4',
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: 'Palette',
    shortDescription: 'Beautiful, intuitive interfaces that users love',
    fullDescription: 'User-centered design that combines aesthetics with functionality to create memorable digital experiences.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    startingPrice: 1499,
    active: true,
    order: 4,
    subServices: []
  },
  {
    id: '5',
    name: 'Website Maintenance',
    slug: 'website-maintenance',
    icon: 'Wrench',
    shortDescription: 'Keep your website secure, fast, and up-to-date',
    fullDescription: 'Comprehensive maintenance services to ensure your website remains secure, performant, and current.',
    features: ['Security Updates', 'Performance Monitoring', 'Content Updates', 'Backup Management'],
    technologies: ['Various'],
    startingPrice: 199,
    active: true,
    order: 5,
    subServices: []
  },
  {
    id: '6',
    name: 'SEO Optimization',
    slug: 'seo-optimization',
    icon: 'Search',
    shortDescription: 'Improve visibility and drive organic traffic',
    fullDescription: 'Data-driven SEO strategies to improve your search rankings and attract qualified traffic.',
    features: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Analytics'],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs'],
    startingPrice: 799,
    active: true,
    order: 6,
    subServices: []
  }
]

const initialIndustries = [
  {
    id: '1',
    name: 'Students',
    slug: 'students',
    icon: 'GraduationCap',
    description: 'Portfolio websites and academic project showcases for students.',
    recommendedServices: ['Website Development', 'UI/UX Design'],
    features: ['Personal Branding', 'Project Showcases', 'Resume Integration', 'Blog'],
    useCases: ['Portfolio Sites', 'Research Project Sites', 'Personal Blogs'],
    active: true,
    order: 1
  },
  {
    id: '2',
    name: 'Professors / Academics',
    slug: 'professors-academics',
    icon: 'BookOpen',
    description: 'Professional academic websites for researchers and educators.',
    recommendedServices: ['Website Development', 'Custom Solutions'],
    features: ['Publication Lists', 'Research Portals', 'Course Pages', 'CV Integration'],
    useCases: ['Personal Academic Sites', 'Lab Websites', 'Conference Sites'],
    active: true,
    order: 2
  },
  {
    id: '3',
    name: 'Clothing & Fashion',
    slug: 'clothing-fashion',
    icon: 'Shirt',
    description: 'Stunning e-commerce and brand websites for fashion businesses.',
    recommendedServices: ['E-Commerce Development', 'UI/UX Design'],
    features: ['Product Galleries', 'Size Guides', 'Lookbooks', 'Inventory Management'],
    useCases: ['Online Boutiques', 'Brand Websites', 'Lookbook Sites'],
    active: true,
    order: 3
  },
  {
    id: '4',
    name: 'Construction',
    slug: 'construction',
    icon: 'Building2',
    description: 'Professional websites for construction and real estate companies.',
    recommendedServices: ['Website Development', 'Custom Solutions'],
    features: ['Project Galleries', 'Service Listings', 'Quote Requests', 'Team Profiles'],
    useCases: ['Company Websites', 'Project Showcases', 'Service Portals'],
    active: true,
    order: 4
  },
  {
    id: '5',
    name: 'Hospitals & Healthcare',
    slug: 'hospitals-healthcare',
    icon: 'HeartPulse',
    description: 'HIPAA-compliant websites for healthcare providers.',
    recommendedServices: ['Website Development', 'Custom Solutions'],
    features: ['Appointment Booking', 'Doctor Profiles', 'Patient Portals', 'Health Resources'],
    useCases: ['Hospital Websites', 'Clinic Sites', 'Health Portals'],
    active: true,
    order: 5
  },
  {
    id: '6',
    name: 'Small Businesses',
    slug: 'small-businesses',
    icon: 'Store',
    description: 'Affordable, professional websites for small businesses.',
    recommendedServices: ['Website Development', 'SEO Optimization'],
    features: ['Contact Forms', 'Service Pages', 'Testimonials', 'Maps Integration'],
    useCases: ['Business Websites', 'Service Sites', 'Local Business Sites'],
    active: true,
    order: 6
  },
  {
    id: '7',
    name: 'Startups',
    slug: 'startups',
    icon: 'Rocket',
    description: 'Scalable digital solutions for growing startups.',
    recommendedServices: ['Custom Solutions', 'UI/UX Design', 'Website Development'],
    features: ['MVP Development', 'Landing Pages', 'Dashboards', 'API Integration'],
    useCases: ['SaaS Platforms', 'Landing Pages', 'Admin Dashboards'],
    active: true,
    order: 7
  },
  {
    id: '8',
    name: 'Professional Services',
    slug: 'professional-services',
    icon: 'Briefcase',
    description: 'Elegant websites for law firms, consultancies, and agencies.',
    recommendedServices: ['Website Development', 'SEO Optimization'],
    features: ['Service Pages', 'Team Profiles', 'Case Studies', 'Appointment Booking'],
    useCases: ['Law Firm Sites', 'Consultancy Sites', 'Agency Websites'],
    active: true,
    order: 8
  },
  {
    id: '9',
    name: 'E-Commerce Businesses',
    slug: 'e-commerce-businesses',
    icon: 'ShoppingBag',
    description: 'High-converting online stores for retail businesses.',
    recommendedServices: ['E-Commerce Development', 'UI/UX Design'],
    features: ['Product Management', 'Payment Processing', 'Order Management', 'Analytics'],
    useCases: ['Online Stores', 'Marketplaces', 'Subscription Services'],
    active: true,
    order: 9
  }
]

const initialProjects = [
  {
    id: '1',
    title: 'Demo: E-Commerce Platform',
    slug: 'demo-ecommerce-platform',
    description: 'A modern e-commerce platform with real-time inventory and seamless checkout.',
    fullCaseStudy: 'This project demonstrates our capability to build full-featured e-commerce solutions.',
    category: 'E-Commerce',
    industry: 'Retail',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    gallery: [],
    liveUrl: '#',
    featured: true,
    status: 'Completed',
    completionDate: '2024-01-15',
    active: true
  },
  {
    id: '2',
    title: 'Demo: Corporate Website',
    slug: 'demo-corporate-website',
    description: 'A premium corporate website with dynamic content management.',
    fullCaseStudy: 'This demo showcases our corporate website development capabilities.',
    category: 'Website',
    industry: 'Corporate',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    gallery: [],
    liveUrl: '#',
    featured: true,
    status: 'Completed',
    completionDate: '2024-02-20',
    active: true
  },
  {
    id: '3',
    title: 'Demo: Dashboard Application',
    slug: 'demo-dashboard-application',
    description: 'Analytics dashboard with real-time data visualization.',
    fullCaseStudy: 'This demo project shows our ability to build complex data-driven applications.',
    category: 'Custom Solution',
    industry: 'Technology',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    gallery: [],
    liveUrl: '#',
    featured: false,
    status: 'Completed',
    completionDate: '2024-03-10',
    active: true
  }
]

const initialPricing = [
  {
    id: '1',
    name: 'Starter Website',
    slug: 'starter-website',
    price: 999,
    currency: 'USD',
    billingType: 'one-time',
    description: 'For individuals and simple requirements',
    features: ['Up to 5 Pages', 'Mobile Responsive', 'Contact Form', 'Basic SEO', '1 Month Support'],
    popular: false,
    ctaText: 'Get Started',
    order: 1,
    active: true
  },
  {
    id: '2',
    name: 'Business Website',
    slug: 'business-website',
    price: 2499,
    currency: 'USD',
    billingType: 'one-time',
    description: 'For small and growing businesses',
    features: ['Up to 15 Pages', 'CMS Integration', 'Blog Setup', 'Advanced SEO', '3 Months Support', 'Social Media Integration'],
    popular: true,
    ctaText: 'Get Started',
    order: 2,
    active: true
  },
  {
    id: '3',
    name: 'Professional Website',
    slug: 'professional-website',
    price: 4999,
    currency: 'USD',
    billingType: 'one-time',
    description: 'For organizations requiring advanced features',
    features: ['Unlimited Pages', 'Custom Features', 'API Integration', 'Performance Optimization', '6 Months Support', 'Priority Support'],
    popular: false,
    ctaText: 'Contact Us',
    order: 3,
    active: true
  },
  {
    id: '4',
    name: 'Basic E-Commerce',
    slug: 'basic-ecommerce',
    price: 2499,
    currency: 'USD',
    billingType: 'one-time',
    description: 'For businesses starting online selling',
    features: ['Up to 50 Products', 'Payment Gateway', 'Basic Inventory', 'User Accounts', 'Order Management'],
    popular: false,
    ctaText: 'Get Started',
    order: 4,
    active: true
  },
  {
    id: '5',
    name: 'Standard E-Commerce',
    slug: 'standard-ecommerce',
    price: 4999,
    currency: 'USD',
    billingType: 'one-time',
    description: 'For growing online stores',
    features: ['Up to 500 Products', 'Multiple Payment Methods', 'Advanced Inventory', 'Discount Codes', 'Analytics Dashboard'],
    popular: true,
    ctaText: 'Get Started',
    order: 5,
    active: true
  },
  {
    id: '6',
    name: 'Advanced Custom E-Commerce',
    slug: 'advanced-custom-ecommerce',
    price: null,
    currency: 'USD',
    billingType: 'one-time',
    description: 'For businesses requiring customized workflows',
    features: ['Unlimited Products', 'Custom Workflows', 'Multi-vendor Support', 'Advanced Analytics', 'Dedicated Support', 'Custom Integrations'],
    popular: false,
    ctaText: 'Contact for Pricing',
    order: 6,
    active: true
  }
]

const initialProcessSteps = [
  { id: '1', step: '01', title: 'Discover', description: 'Understand client requirements, goals, and target audience through detailed consultations.', order: 1, active: true },
  { id: '2', step: '02', title: 'Plan', description: 'Define features, architecture, and project scope with detailed documentation.', order: 2, active: true },
  { id: '3', step: '03', title: 'Design', description: 'Create UI/UX designs and visual direction with interactive prototypes.', order: 3, active: true },
  { id: '4', step: '04', title: 'Develop', description: 'Build the website or application using modern technologies and best practices.', order: 4, active: true },
  { id: '5', step: '05', title: 'Test', description: 'Test functionality, responsiveness, performance, and security thoroughly.', order: 5, active: true },
  { id: '6', step: '06', title: 'Launch', description: 'Deploy the project to production with monitoring and optimization.', order: 6, active: true },
  { id: '7', step: '07', title: 'Support', description: 'Provide maintenance, updates, and future improvements as needed.', order: 7, active: true }
]

const initialTechnologies = [
  { id: '1', name: 'React', icon: 'Atom', category: 'Frontend', description: 'Modern UI library for MERN and PERN application interfaces', active: true, order: 1 },
  { id: '2', name: 'Node.js', icon: 'Server', category: 'Backend', description: 'JavaScript runtime powering scalable MERN and PERN backends', active: true, order: 2 },
  { id: '3', name: 'Express.js', icon: 'Server', category: 'Backend', description: 'Fast REST API framework used in both MERN and PERN stacks', active: true, order: 3 },
  { id: '4', name: 'MongoDB', icon: 'Leaf', category: 'Database', description: 'Flexible NoSQL database for MERN stack applications', active: true, order: 4 },
  { id: '5', name: 'PostgreSQL', icon: 'Database', category: 'Database', description: 'Powerful relational database for PERN stack applications', active: true, order: 5 },
  { id: '6', name: 'JavaScript', icon: 'FileCode', category: 'Language', description: 'Core language across modern full-stack JavaScript solutions', active: true, order: 6 },
  { id: '7', name: 'TypeScript', icon: 'FileCode', category: 'Language', description: 'Type-safe development for robust MERN and PERN projects', active: true, order: 7 },
  { id: '8', name: 'HTML5', icon: 'Code', category: 'Frontend', description: 'Semantic markup for modern web applications', active: true, order: 8 },
  { id: '9', name: 'CSS3', icon: 'Paintbrush', category: 'Frontend', description: 'Styling and responsive interfaces for web applications', active: true, order: 9 },
  { id: '10', name: 'Tailwind CSS', icon: 'Wind', category: 'Frontend', description: 'Utility-first CSS framework for rapid product development', active: true, order: 10 },
  { id: '11', name: 'REST APIs', icon: 'Plug', category: 'Integration', description: 'Scalable API architecture and third-party integrations', active: true, order: 11 },
  { id: '12', name: 'GraphQL', icon: 'Plug', category: 'Integration', description: 'Flexible API querying for modern full-stack applications', active: true, order: 12 },
  { id: '13', name: 'Mongoose', icon: 'Leaf', category: 'Integration', description: 'MongoDB object modeling for MERN applications', active: true, order: 13 },
  { id: '14', name: 'Prisma', icon: 'Database', category: 'Integration', description: 'Type-safe ORM for PostgreSQL and PERN applications', active: true, order: 14 },
  { id: '15', name: 'Redis', icon: 'Database', category: 'Database', description: 'High-performance caching and data layer', active: true, order: 15 },
  { id: '16', name: 'JWT Authentication', icon: 'Server', category: 'Integration', description: 'Secure token-based authentication for full-stack apps', active: true, order: 16 },
  { id: '17', name: 'Docker', icon: 'Cloud', category: 'Deployment', description: 'Containerized development and deployment workflows', active: true, order: 17 },
  { id: '18', name: 'AWS', icon: 'Cloud', category: 'Deployment', description: 'Cloud hosting, storage, deployment and infrastructure', active: true, order: 18 },
  { id: '19', name: 'Vercel', icon: 'Cloud', category: 'Deployment', description: 'Modern deployment platform for React and full-stack apps', active: true, order: 19 },
  { id: '20', name: 'Git & GitHub', icon: 'Code', category: 'Deployment', description: 'Version control and collaborative software development', active: true, order: 20 }
]

const mergeTechnologies = (saved) => {
  if (!Array.isArray(saved)) return initialTechnologies
  const savedByName = new Map(saved.map((tech) => [tech.name.toLowerCase(), tech]))
  const merged = initialTechnologies.map((tech) => savedByName.get(tech.name.toLowerCase()) || tech)
  const defaults = new Set(initialTechnologies.map((tech) => tech.name.toLowerCase()))
  const custom = saved.filter((tech) => tech?.name && !defaults.has(tech.name.toLowerCase()))
  return [...merged, ...custom]
}

const initialTestimonials = []

const initialEnquiries = []

const initialSettings = {
  company: {
    name: 'Hi Grove Technologies',
    tagline: "Building Tomorrow's Digital Solutions Today",
    description: 'We build modern, scalable and impactful digital experiences for businesses, organizations and individuals.',
    logo: null,
    favicon: null
  },
  contact: {
    email: import.meta.env.VITE_BUSINESS_EMAIL || 'higrovetechnologies@gmail.com',
    phone: '+1 (555) 123-4567',
    whatsapp: '+1 (555) 123-4567',
    address: '123 Tech Street, Innovation City, IC 12345',
    businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM'
  },
  social: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/higrovetech',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/company/higrovetech',
    email: import.meta.env.VITE_BUSINESS_EMAIL || 'higrovetechnologies@gmail.com'
  },
  seo: {
    siteTitle: 'Hi Grove Technologies | Web & Digital Solutions in Tirunelveli',
    metaDescription: 'Hi Grove Technologies delivers custom websites, e-commerce development, web applications, UI/UX design and SEO solutions in Tirunelveli and across South Tamil Nadu.',
    keywords: 'Hi Grove Technologies, Hi Grove, Hi Grove Tech, HiGrove Technologies, higrovetechnologies, higrove, technology company, tech company, digital solutions, web development company, website development, e-commerce development, custom web development, UI UX design, SEO optimization, Tirunelveli, Nellai, South Tamil Nadu, best tech company in Tirunelveli, tech company in Tirunelveli, web development company in Tirunelveli, MERN Stack development, MERN Stack developer, PERN Stack development, PERN Stack developer, MERN Stack company in Tirunelveli, PERN Stack company in Tirunelveli, full stack web development',
    ogImage: '/og-image.png',
    robots: 'index, follow'
  },
  theme: {
    primaryColor: '#0ea5e9',
    secondaryColor: '#6366f1'
  },
  cta: {
    primaryText: 'Contact Us',
    primaryUrl: '/contact',
    secondaryText: 'View Our Work',
    secondaryUrl: '/portfolio'
  },
  stats: {
    projectsCompleted: { value: 0, label: 'Projects Completed', visible: true },
    happyClients: { value: 0, label: 'Happy Clients', visible: true },
    technologies: { value: 0, label: 'Technologies', visible: true },
    support: { value: '24/7', label: 'Support', visible: true }
  }
}

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState(() => getStorage('higrove_services', initialServices))
  const [industries, setIndustries] = useState(() => getStorage('higrove_industries', initialIndustries))
  const [projects, setProjects] = useState(() => getStorage('higrove_projects', initialProjects))
  const [pricing, setPricing] = useState(() => getStorage('higrove_pricing', initialPricing))
  const [processSteps, setProcessSteps] = useState(() => getStorage('higrove_process', initialProcessSteps))
  const [technologies, setTechnologies] = useState(() => mergeTechnologies(getStorage('higrove_technologies', initialTechnologies)))
  const [testimonials, setTestimonials] = useState(() => getStorage('higrove_testimonials', initialTestimonials))
  const [enquiries, setEnquiries] = useState(() => getStorage('higrove_enquiries', initialEnquiries))
  const [settings, setSettings] = useState(() => {
    const saved = getStorage('higrove_settings', initialSettings)
    return {
      ...initialSettings,
      ...saved,
      company: { ...initialSettings.company, ...saved?.company },
      contact: { ...initialSettings.contact, ...saved?.contact },
      social: {
        ...initialSettings.social,
        ...saved?.social,
        email: saved?.social?.email || saved?.contact?.email || initialSettings.social.email,
      },
      seo: { ...initialSettings.seo, ...saved?.seo },
      theme: { ...initialSettings.theme, ...saved?.theme },
      cta: { ...initialSettings.cta, ...saved?.cta },
      stats: { ...initialSettings.stats, ...saved?.stats },
    }
  })
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const persist = async (key, data) => {
    setStorage(`higrove_${key}`, data)
    if (!isCloudConfigured || !getAccessToken()) return
    try {
      await saveContent(key, data)
    } catch (error) {
      console.error(`[Hi Grove] Failed to sync ${key}:`, error)
    }
  }

  const refreshFromCloud = async () => {
    if (!isCloudConfigured) return

    const contentKeys = [
      'services',
      'industries',
      'projects',
      'pricing',
      'process',
      'technologies',
      'testimonials',
      'settings',
    ]
    const content = await getAllContent(contentKeys)

    // On the first authenticated admin visit, migrate the existing local
    // content into Supabase only for records that do not exist remotely.
    if (getAccessToken()) {
      const localContent = {
        services,
        industries,
        projects,
        pricing,
        process: processSteps,
        technologies,
        testimonials,
        settings,
      }
      await Promise.all(
        contentKeys
          .filter((key) => content[key] == null)
          .map((key) => saveContent(key, localContent[key]).catch((error) => {
            console.error(`[Hi Grove] Initial ${key} migration failed:`, error)
          }))
      )
    }

    if (content.services) {
      setServices(content.services)
      setStorage('higrove_services', content.services)
    }
    if (content.industries) {
      setIndustries(content.industries)
      setStorage('higrove_industries', content.industries)
    }
    if (content.projects) {
      setProjects(content.projects)
      setStorage('higrove_projects', content.projects)
    }
    if (content.pricing) {
      setPricing(content.pricing)
      setStorage('higrove_pricing', content.pricing)
    }
    if (content.process) {
      setProcessSteps(content.process)
      setStorage('higrove_process', content.process)
    }
    if (content.technologies) {
      const merged = mergeTechnologies(content.technologies)
      setTechnologies(merged)
      setStorage('higrove_technologies', merged)
    }
    if (content.testimonials) {
      setTestimonials(content.testimonials)
      setStorage('higrove_testimonials', content.testimonials)
    }
    if (content.settings) {
      setSettings((prev) => ({
        ...prev,
        ...content.settings,
        company: { ...prev.company, ...content.settings.company },
        contact: { ...prev.contact, ...content.settings.contact },
        social: { ...prev.social, ...content.settings.social },
        seo: { ...prev.seo, ...content.settings.seo },
        theme: { ...prev.theme, ...content.settings.theme },
        cta: { ...prev.cta, ...content.settings.cta },
        stats: { ...prev.stats, ...content.settings.stats },
      }))
      setStorage('higrove_settings', content.settings)
    }

    if (getAccessToken()) {
      try {
        const remoteEnquiries = await getEnquiries()
        setEnquiries(remoteEnquiries || [])
        setStorage('higrove_enquiries', remoteEnquiries || [])
      } catch (error) {
        console.error('[Hi Grove] Failed to refresh enquiries:', error)
      }
    }
  }

  // Cloud is the source of truth. Polling keeps already-open public/admin tabs
  // synchronized without changing the existing UI or component structure.
  useEffect(() => {
    refreshFromCloud()
    const interval = isCloudConfigured ? window.setInterval(refreshFromCloud, 5000) : null
    const onFocus = () => refreshFromCloud()
    const onAuth = () => refreshFromCloud()

    window.addEventListener('focus', onFocus)
    window.addEventListener('higrove:auth', onAuth)

    return () => {
      if (interval) window.clearInterval(interval)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('higrove:auth', onAuth)
    }
  }, [])

  // Services CRUD
  const addService = (service) => {
    const newService = { ...service, id: Date.now().toString(), slug: generateSlug(service.name) }
    setServices((prev) => {
      const next = [...prev, newService]
      persist('services', next)
      return next
    })
    addToast('Service created successfully')
    return newService
  }

  const updateService = (id, updates) => {
    setServices((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updates, slug: updates.name ? generateSlug(updates.name) : s.slug } : s))
      persist('services', next)
      return next
    })
    addToast('Service updated successfully')
  }

  const deleteService = (id) => {
    setServices((prev) => {
      const next = prev.filter((s) => s.id !== id)
      persist('services', next)
      return next
    })
    addToast('Service deleted successfully')
  }

  // Industries CRUD
  const addIndustry = (industry) => {
    const newIndustry = { ...industry, id: Date.now().toString(), slug: generateSlug(industry.name) }
    setIndustries((prev) => {
      const next = [...prev, newIndustry]
      persist('industries', next)
      return next
    })
    addToast('Industry created successfully')
    return newIndustry
  }

  const updateIndustry = (id, updates) => {
    setIndustries((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, ...updates, slug: updates.name ? generateSlug(updates.name) : i.slug } : i))
      persist('industries', next)
      return next
    })
    addToast('Industry updated successfully')
  }

  const deleteIndustry = (id) => {
    setIndustries((prev) => {
      const next = prev.filter((i) => i.id !== id)
      persist('industries', next)
      return next
    })
    addToast('Industry deleted successfully')
  }

  // Projects CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now().toString(), slug: generateSlug(project.title) }
    setProjects((prev) => {
      const next = [...prev, newProject]
      persist('projects', next)
      return next
    })
    addToast('Project created successfully')
    return newProject
  }

  const updateProject = (id, updates) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates, slug: updates.title ? generateSlug(updates.title) : p.slug } : p))
      persist('projects', next)
      return next
    })
    addToast('Project updated successfully')
  }

  const deleteProject = (id) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id)
      persist('projects', next)
      return next
    })
    addToast('Project deleted successfully')
  }

  // Pricing CRUD
  const addPricing = (plan) => {
    const newPlan = { ...plan, id: Date.now().toString(), slug: generateSlug(plan.name) }
    setPricing((prev) => {
      const next = [...prev, newPlan]
      persist('pricing', next)
      return next
    })
    addToast('Pricing plan created successfully')
    return newPlan
  }

  const updatePricing = (id, updates) => {
    setPricing((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates, slug: updates.name ? generateSlug(updates.name) : p.slug } : p))
      persist('pricing', next)
      return next
    })
    addToast('Pricing plan updated successfully')
  }

  const deletePricing = (id) => {
    setPricing((prev) => {
      const next = prev.filter((p) => p.id !== id)
      persist('pricing', next)
      return next
    })
    addToast('Pricing plan deleted successfully')
  }

  // Process CRUD
  const updateProcessStep = (id, updates) => {
    setProcessSteps((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      persist('process', next)
      return next
    })
    addToast('Process step updated successfully')
  }

  // Technologies CRUD
  const addTechnology = (tech) => {
    const newTech = { ...tech, id: Date.now().toString() }
    setTechnologies((prev) => {
      const next = [...prev, newTech]
      persist('technologies', next)
      return next
    })
    addToast('Technology added successfully')
    return newTech
  }

  const updateTechnology = (id, updates) => {
    setTechnologies((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      persist('technologies', next)
      return next
    })
    addToast('Technology updated successfully')
  }

  const deleteTechnology = (id) => {
    setTechnologies((prev) => {
      const next = prev.filter((t) => t.id !== id)
      persist('technologies', next)
      return next
    })
    addToast('Technology deleted successfully')
  }

  // Testimonials CRUD
  const addTestimonial = (testimonial) => {
    const newTestimonial = { ...testimonial, id: Date.now().toString() }
    setTestimonials((prev) => {
      const next = [...prev, newTestimonial]
      persist('testimonials', next)
      return next
    })
    addToast('Testimonial added successfully')
    return newTestimonial
  }

  const updateTestimonial = (id, updates) => {
    setTestimonials((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      persist('testimonials', next)
      return next
    })
    addToast('Testimonial updated successfully')
  }

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => {
      const next = prev.filter((t) => t.id !== id)
      persist('testimonials', next)
      return next
    })
    addToast('Testimonial deleted successfully')
  }

  // Enquiries: public users create them in the shared cloud table.
  const addEnquiry = (enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: Date.now().toString(),
      status: 'New',
      notes: '',
      createdAt: new Date().toISOString(),
    }

    setEnquiries((prev) => [newEnquiry, ...prev])

    if (isCloudConfigured) {
      insertEnquiry({
        id: newEnquiry.id,
        name: newEnquiry.name,
        email: newEnquiry.email,
        phone: newEnquiry.phone || null,
        company: newEnquiry.company || null,
        website_type: newEnquiry.websiteType || null,
        industry: newEnquiry.industry || null,
        features: newEnquiry.features || null,
        message: newEnquiry.message || null,
        status: newEnquiry.status,
        notes: newEnquiry.notes,
        created_at: newEnquiry.createdAt,
      })
        .then(() => addToast('Enquiry submitted successfully'))
        .catch((error) => {
          console.error('[Hi Grove] Enquiry sync failed:', error)
          addToast('Enquiry saved locally; cloud sync failed', 'error')
        })
    } else {
      setStorage('higrove_enquiries', [newEnquiry, ...enquiries])
      addToast('Enquiry submitted successfully')
    }

    return newEnquiry
  }

  const updateEnquiry = (id, updates) => {
    setEnquiries((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
      setStorage('higrove_enquiries', next)
      return next
    })
    if (isCloudConfigured && getAccessToken()) {
      updateEnquiryRemote(id, {
        ...(updates.status !== undefined ? { status: updates.status } : {}),
        ...(updates.notes !== undefined ? { notes: updates.notes } : {}),
      }).catch((error) => console.error('[Hi Grove] Enquiry update failed:', error))
    }
    addToast('Enquiry updated successfully')
  }

  const deleteEnquiry = (id) => {
    setEnquiries((prev) => {
      const next = prev.filter((e) => e.id !== id)
      setStorage('higrove_enquiries', next)
      return next
    })
    if (isCloudConfigured && getAccessToken()) {
      deleteEnquiryRemote(id).catch((error) => console.error('[Hi Grove] Enquiry delete failed:', error))
    }
    addToast('Enquiry deleted successfully')
  }

  // Settings
  const updateSettings = (updates) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        ...updates,
        ...(updates.company ? { company: { ...prev.company, ...updates.company } } : {}),
        ...(updates.contact ? { contact: { ...prev.contact, ...updates.contact } } : {}),
        ...(updates.social ? { social: { ...prev.social, ...updates.social } } : {}),
        ...(updates.seo ? { seo: { ...prev.seo, ...updates.seo } } : {}),
        ...(updates.theme ? { theme: { ...prev.theme, ...updates.theme } } : {}),
        ...(updates.cta ? { cta: { ...prev.cta, ...updates.cta } } : {}),
        ...(updates.stats ? { stats: { ...prev.stats, ...updates.stats } } : {}),
      }
      persist('settings', next)
      return next
    })
    addToast('Settings saved successfully')
  }

  const updateStats = (stats) => {
    setSettings((prev) => {
      const next = { ...prev, stats: { ...prev.stats, ...stats } }
      persist('settings', next)
      return next
    })
    addToast('Statistics updated successfully')
  }

  const value = {
    services,
    industries,
    projects,
    pricing,
    processSteps,
    technologies,
    testimonials,
    enquiries,
    settings,
    toasts,
    addToast,
    removeToast,
    addService,
    updateService,
    deleteService,
    addIndustry,
    updateIndustry,
    deleteIndustry,
    addProject,
    updateProject,
    deleteProject,
    addPricing,
    updatePricing,
    deletePricing,
    updateProcessStep,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addEnquiry,
    updateEnquiry,
    deleteEnquiry,
    updateSettings,
    updateStats,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
