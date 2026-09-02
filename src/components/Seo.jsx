import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'

const SITE_NAME = 'Hi Grove Technologies'
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.higrovetechnologies.in').replace(/\/+$/, '')
const DEFAULT_DESCRIPTION =
  'Hi Grove Technologies is a technology company serving Tirunelveli, Melapalayam, Pirancheri and businesses across South Tamil Nadu with website development, e-commerce, custom web applications, UI/UX design and SEO solutions.'

const CORE_KEYWORDS = [
  'Hi Grove Technologies',
  'Hi Grove',
  'Grove',
  'Technologies',
  'Technology',
  'Technology in Tirunelveli',
  'Top Tech Company in Tirunelveli',
  'technology company in Tirunelveli',
  'web development company in Tirunelveli',
  'Tirunelveli',
  'Melapalayam',
  'Pirancheri',
  'Nellai',
  'South Tamil Nadu',
  'website development',
  'e-commerce development',
  'custom web development',
  'web applications',
  'UI UX design',
  'SEO optimization',
]

const PEOPLE_KEYWORDS = ['Mani', 'Riyas', 'Saleem', 'Irsath']

const PAGE_META = {
  '/': {
    title: 'Hi Grove Technologies | Top Tech Company in Tirunelveli',
    description: DEFAULT_DESCRIPTION,
    keywords: ['Top Tech Company in Tirunelveli', 'Technology in Tirunelveli', 'Melapalayam', 'Pirancheri'],
  },
  '/services': {
    title: 'Web Development Services in Tirunelveli | Hi Grove Technologies',
    description: 'Explore website development, e-commerce, custom web applications, UI/UX design, maintenance and SEO services from Hi Grove Technologies in Tirunelveli.',
    keywords: ['technology services in Tirunelveli', 'web development company in Tirunelveli'],
  },
  '/industries': {
    title: 'Digital Solutions in Tirunelveli | Hi Grove Technologies',
    description: 'Hi Grove Technologies builds digital solutions for businesses, startups, e-commerce brands, healthcare, construction and professionals in Tirunelveli.',
    keywords: ['digital solutions in Tirunelveli', 'technology company in Tirunelveli'],
  },
  '/portfolio': {
    title: 'Web Development Portfolio | Hi Grove Technologies',
    description: 'View selected website, e-commerce and custom web application projects by Hi Grove Technologies, serving Tirunelveli and South Tamil Nadu.',
    keywords: ['web development portfolio Tirunelveli', 'Hi Grove Technologies portfolio'],
  },
  '/process': {
    title: 'Web Development Process | Hi Grove Technologies, Tirunelveli',
    description: 'Discover the strategy, design, development, testing and launch process used by Hi Grove Technologies to build high-performance digital solutions.',
  },
  '/about': {
    title: 'About Hi Grove Technologies | Tirunelveli',
    description: 'Learn about Hi Grove Technologies and our approach to web development, e-commerce, UI/UX, SEO and custom technology solutions for clients in Tirunelveli.',
    keywords: ['Hi Grove', 'Grove Technologies', 'technology company in Tirunelveli'],
  },
  '/contact': {
    title: 'Contact Hi Grove Technologies | Tirunelveli',
    description: 'Contact Hi Grove Technologies for website development, e-commerce, web apps, UI/UX and SEO services in Tirunelveli and Melapalayam.',
    keywords: ['contact technology company Tirunelveli', 'Melapalayam technology services'],
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

const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim()

const Seo = () => {
  const { pathname } = useLocation()
  const { services = [], industries = [], projects = [], settings } = useData()

  useEffect(() => {
    const cleanPath = pathname.replace(/\/+$/, '') || '/'
    const serviceSlug = cleanPath.startsWith('/services/') ? cleanPath.split('/')[2] : ''
    const industrySlug = cleanPath.startsWith('/industries/') ? cleanPath.split('/')[2] : ''
    const projectSlug = cleanPath.startsWith('/portfolio/') ? cleanPath.split('/')[2] : ''

    const service = serviceSlug ? services.find((item) => item.slug === serviceSlug) : null
    const industry = industrySlug ? industries.find((item) => item.slug === industrySlug) : null
    const project = projectSlug ? projects.find((item) => item.slug === projectSlug) : null

    let title = PAGE_META[cleanPath]?.title
    let description = PAGE_META[cleanPath]?.description
    let pageKeywords = [
      ...CORE_KEYWORDS,
      ...(PAGE_META[cleanPath]?.keywords || []),
    ]

    if (service) {
      title = `${service.name} in Tirunelveli | Hi Grove Technologies`
      description = `${cleanText(service.fullDescription || service.shortDescription)} Hi Grove Technologies provides ${service.name.toLowerCase()} solutions for businesses in Tirunelveli and South Tamil Nadu.`
      pageKeywords = [
        ...pageKeywords,
        service.name,
        ...(service.subServices || []),
        ...(service.technologies || []),
      ]
    }

    if (industry) {
      title = `${industry.name} Digital Solutions | Hi Grove Technologies`
      description = `${cleanText(industry.description || `Digital solutions and website development for ${industry.name.toLowerCase()} businesses and professionals.`)} Hi Grove Technologies serves clients across Tirunelveli and South Tamil Nadu.`
      pageKeywords = [
        ...pageKeywords,
        industry.name,
        `${industry.name} website`,
        `${industry.name} digital solutions`,
      ]
    }

    if (project) {
      title = `${project.title} | Hi Grove Technologies Portfolio`
      description = cleanText(project.description || `A web development project by ${SITE_NAME}.`)
      pageKeywords = [
        ...pageKeywords,
        project.category,
        project.industry,
        ...(project.technologies || []),
      ]
    }

    const fallbackTitle = settings?.seo?.siteTitle || `${SITE_NAME} | Technology & Digital Solutions in Tirunelveli`
    title = title || fallbackTitle
    description = description || settings?.seo?.metaDescription || DEFAULT_DESCRIPTION

    const canonicalUrl = `${SITE_URL}${cleanPath}`
    const configuredImage = settings?.seo?.ogImage
    const image = configuredImage?.startsWith('http')
      ? configuredImage
      : `${SITE_URL}${configuredImage || '/og-image.png'}`
    const robots = cleanPath.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow'

    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description' }, description)
    upsertMeta(
      'meta[name="keywords"]',
      { name: 'keywords' },
      [...new Set([...pageKeywords, ...PEOPLE_KEYWORDS, settings?.seo?.keywords || ''])]
        .join(', ')
        .replace(/,\s*,/g, ',')
    )
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robots)
    upsertMeta('meta[name="author"]', { name: 'author' }, SITE_NAME)
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color' }, '#0ea5e9')

    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, project ? 'article' : 'website')
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, image)
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'en_IN')

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image)

    upsertLink('canonical', canonicalUrl)

    const existingSchema = document.getElementById('higrove-seo-schema')
    if (existingSchema) existingSchema.remove()

    const configuredAddress = cleanText(settings?.contact?.address)
    const configuredPhone = cleanText(settings?.contact?.phone)
    const hasRealAddress = configuredAddress && !/123 tech street|innovation city|ic 12345/i.test(configuredAddress)
    const hasRealPhone = configuredPhone && !/555|123-4567/.test(configuredPhone)

    const organization = {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['Hi Grove', 'Grove'],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: DEFAULT_DESCRIPTION,
      areaServed: ['Tirunelveli', 'Melapalayam', 'Pirancheri', 'Nellai', 'Tamil Nadu', 'India'],
      knowsAbout: [
        'Web Development',
        'E-Commerce Development',
        'Custom Web Applications',
        'UI/UX Design',
        'SEO',
        'Technology in Tirunelveli',
      ],
      sameAs: [
        settings?.social?.instagram,
        settings?.social?.linkedin,
      ].filter(Boolean),
    }

    if (hasRealAddress) {
      organization.address = {
        '@type': 'PostalAddress',
        streetAddress: configuredAddress,
        addressLocality: 'Tirunelveli',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      }
    }

    if (hasRealPhone) organization.telephone = configuredPhone

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'ProfessionalService',
          '@id': `${SITE_URL}/#professional-service`,
          name: SITE_NAME,
          url: SITE_URL,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: organization.areaServed,
          serviceType: [
            'Website Development',
            'E-Commerce Development',
            'Custom Web Development',
            'UI/UX Design',
            'SEO Optimization',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en-IN',
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          inLanguage: 'en-IN',
        },
      ],
    }

    if (service) {
      schema['@graph'].push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: service.name,
        description: cleanText(service.fullDescription || service.shortDescription),
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: ['Tirunelveli', 'Melapalayam', 'Pirancheri', 'Tamil Nadu', 'India'],
      })
    }

    if (project) {
      schema['@graph'].push({
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#project`,
        name: project.title,
        description: cleanText(project.description || ''),
        creator: { '@id': `${SITE_URL}/#organization` },
        url: canonicalUrl,
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
