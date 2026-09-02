import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'

const SITE_NAME = 'Hi Grove Technologies'
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.higrovetechnologies.in').replace(/\/+$/, '')
const DEFAULT_DESCRIPTION =
  'Hi Grove Technologies delivers custom websites, e-commerce development, web applications, UI/UX design and SEO solutions for businesses in Tirunelveli and across South Tamil Nadu.'

const KEYWORDS = [
  'Hi Grove Technologies',
  'Hi Grove',
  'Hi Grove Tech',
  'HiGrove Technologies',
  'higrovetechnologies',
  'higrove',
  'technology company',
  'tech company',
  'technology solutions',
  'digital solutions',
  'web development company',
  'website development',
  'e-commerce development',
  'custom web development',
  'UI UX design',
  'SEO optimization',
  'software development',
  'Tirunelveli',
  'Nellai',
  'South Tamil Nadu',
  'best tech company in Tirunelveli',
  'tech company in Tirunelveli',
  'web development company in Tirunelveli',
  'technology solutions in Tirunelveli',
  'digital solutions company in Tirunelveli',
]

const PAGE_META = {
  '/': {
    title: 'Hi Grove Technologies | Web & Digital Solutions in Tirunelveli',
    description: DEFAULT_DESCRIPTION,
  },
  '/services': {
    title: 'Web Development & Digital Services | Hi Grove Technologies',
    description: 'Explore website development, e-commerce development, custom web applications, UI/UX design, maintenance and SEO optimization from Hi Grove Technologies.',
  },
  '/industries': {
    title: 'Industries We Serve | Hi Grove Technologies',
    description: 'Custom digital solutions for students, academics, clothing businesses, construction, healthcare, startups, small businesses and e-commerce brands.',
  },
  '/portfolio': {
    title: 'Web Development Portfolio | Hi Grove Technologies',
    description: 'View selected website, e-commerce and custom web application projects by Hi Grove Technologies.',
  },
  '/process': {
    title: 'Our Web Development Process | Hi Grove Technologies',
    description: 'Discover the strategy, design, development, testing and launch process used by Hi Grove Technologies to build digital solutions.',
  },
  '/about': {
    title: 'About Hi Grove Technologies | Digital Solutions Company',
    description: 'Learn about Hi Grove Technologies, our approach to digital products, web development, design and technology solutions.',
  },
  '/contact': {
    title: 'Contact Hi Grove Technologies | Tirunelveli Tech Solutions',
    description: 'Contact Hi Grove Technologies for website development, e-commerce, custom web applications, UI/UX design and SEO solutions.',
  },
}

const upsertMeta = (selector, attributes, content) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

const Seo = () => {
  const { pathname } = useLocation()
  const { services = [], industries = [], projects = [], settings } = useData()

  useEffect(() => {
    const cleanPath = pathname.replace(/\/+$/, '') || '/'
    const service = cleanPath.startsWith('/services/') ? services.find((item) => item.slug === cleanPath.split('/')[2]) : null
    const industry = cleanPath.startsWith('/industries/') ? industries.find((item) => item.slug === cleanPath.split('/')[2]) : null
    const project = cleanPath.startsWith('/portfolio/') ? projects.find((item) => item.slug === cleanPath.split('/')[2]) : null

    let title = PAGE_META[cleanPath]?.title
    let description = PAGE_META[cleanPath]?.description
    let pageKeywords = [...KEYWORDS]

    if (service) {
      title = `${service.name} | Hi Grove Technologies`
      description = `${service.fullDescription || service.shortDescription} Hi Grove Technologies provides ${service.name.toLowerCase()} solutions for businesses.`
      pageKeywords = [...pageKeywords, service.name, ...(service.subServices || []), ...(service.technologies || [])]
    }

    if (industry) {
      title = `${industry.name} Digital Solutions | Hi Grove Technologies`
      description = industry.description || `Digital solutions and website development for ${industry.name.toLowerCase()} businesses and professionals.`
      pageKeywords = [...pageKeywords, industry.name, `${industry.name} website`, `${industry.name} digital solutions`]
    }

    if (project) {
      title = `${project.title} | Hi Grove Technologies Portfolio`
      description = project.description || `A web development project by ${SITE_NAME}.`
      pageKeywords = [...pageKeywords, project.category, project.industry, ...(project.technologies || [])]
    }

    const fallbackTitle = settings?.seo?.siteTitle || `${SITE_NAME} | Digital Solutions`
    title = title || fallbackTitle
    description = description || settings?.seo?.metaDescription || DEFAULT_DESCRIPTION

    const canonicalUrl = `${SITE_URL}${cleanPath}`
    const image = settings?.seo?.ogImage?.startsWith('http') ? settings.seo.ogImage : `${SITE_URL}${settings?.seo?.ogImage || '/og-image.png'}`
    const robots = cleanPath.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow'

    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description' }, description)
    upsertMeta('meta[name="keywords"]', { name: 'keywords' }, [...new Set(pageKeywords)].join(', '))
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robots)
    upsertMeta('meta[name="author"]', { name: 'author' }, SITE_NAME)
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color' }, '#0ea5e9')

    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, cleanPath.startsWith('/portfolio/') ? 'article' : 'website')
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, image)

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image)

    upsertLink('canonical', canonicalUrl)

    const existingSchema = document.getElementById('higrove-seo-schema')
    if (existingSchema) existingSchema.remove()

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${window.location.origin}/favicon.svg`,
          description: DEFAULT_DESCRIPTION,
          sameAs: [
            settings?.social?.instagram,
            settings?.social?.linkedin,
          ].filter(Boolean),
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
      ],
    }

    if (service) {
      schema['@graph'].push({
        '@type': 'Service',
        name: service.name,
        description: service.fullDescription || service.shortDescription,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: ['Tirunelveli', 'Nellai', 'Tamil Nadu', 'India'],
      })
    }

    const script = document.createElement('script')
    script.id = 'higrove-seo-schema'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const current = document.getElementById('higrove-seo-schema')
      if (current) current.remove()
    }
  }, [pathname, services, industries, projects, settings])

  return null
}

export default Seo
