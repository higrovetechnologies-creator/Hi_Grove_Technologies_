import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const siteUrl = (process.env.SITE_URL || 'https://www.higrovetechnologies.in').replace(/\/+$/, '')
const urls = [
  '/',
  '/services',
  '/services/website-development',
  '/services/e-commerce-development',
  '/services/custom-solutions',
  '/services/ui-ux-design',
  '/services/website-maintenance',
  '/services/seo-optimization',
  '/industries',
  '/industries/students',
  '/industries/professors-academics',
  '/industries/clothing-fashion',
  '/industries/construction',
  '/industries/hospitals-healthcare',
  '/industries/small-businesses',
  '/industries/startups',
  '/industries/professional-services',
  '/industries/e-commerce-businesses',
  '/portfolio',
  '/process',
  '/about',
  '/contact',
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${siteUrl}${url}</loc></url>`).join('\n')}
</urlset>
`

const publicDir = path.join(root, 'public')
fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml)
console.log(`SEO sitemap generated for ${siteUrl}`)
