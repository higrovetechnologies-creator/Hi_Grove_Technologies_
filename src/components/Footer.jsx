import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { useData } from '../context/DataContext'

const Footer = () => {
  const { settings = {} } = useData()

  const {
    company = {},
    contact = {},
    social = {},
  } = settings

  const footerLinks = {
    Services: [
      {
        name: 'Website Development',
        path: '/services/website-development',
      },
      {
        name: 'E-Commerce',
        path: '/services/e-commerce-development',
      },
      {
        name: 'Custom Solutions',
        path: '/services/custom-solutions',
      },
      {
        name: 'UI/UX Design',
        path: '/services/ui-ux-design',
      },
    ],

    Company: [
      {
        name: 'About Us',
        path: '/about',
      },
      {
        name: 'Portfolio',
        path: '/portfolio',
      },
      {
        name: 'Process',
        path: '/process',
      },
      {
        name: 'Contact',
        path: '/contact',
      },
    ],

    Industries: [
      {
        name: 'Small Businesses',
        path: '/industries/small-businesses',
      },
      {
        name: 'Startups',
        path: '/industries/startups',
      },
      {
        name: 'E-Commerce',
        path: '/industries/e-commerce-businesses',
      },
      {
        name: 'Healthcare',
        path: '/industries/hospitals-healthcare',
      },
    ],
  }

  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center space-x-3 mb-5"
            >
              {/* Transparent Logo */}
              <img
                src="/logo.png"
                alt="Hi Grove Technologies Logo"
                className="w-12 h-12 object-contain flex-shrink-0"
              />

              <span className="font-bold text-lg sm:text-xl brand-gradient-text-strong">
                {company.name || 'Hi Grove Technologies'}
              </span>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
              {company.description ||
                'We build modern digital solutions that help businesses grow and succeed.'}
            </p>

            <div className="space-y-3">

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{contact.email}</span>
                </a>
              )}

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              )}

              {contact.address && (
                <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{contact.address}</span>
                </div>
              )}

            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={`footer-${title}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {title}
              </h3>

              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={`${title}-${link.path}-${index}`}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()}{' '}
            {company.name || 'Hi Grove Technologies'}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">

            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hi Grove Technologies on Instagram"
                className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hi Grove Technologies on LinkedIn"
                className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {(social.email || contact.email) && (
              <a
                href={`mailto:${social.email || contact.email}`}
                aria-label="Email Hi Grove Technologies"
                className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer