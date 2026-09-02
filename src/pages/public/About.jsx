import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Target,
  Eye,
  Lightbulb,
  Heart,
  Users,
  Zap,
  Shield,
} from 'lucide-react'
import { useData } from '../../context/DataContext'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const About = () => {
  const { settings, technologies } = useData()
  const { company } = settings

  const activeTechnologies = technologies.filter((t) => t.active)

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      text: 'To empower businesses with innovative digital solutions that drive growth and create lasting impact.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      text: 'To be the most trusted technology partner for businesses seeking to transform their digital presence.',
    },
    {
      icon: Lightbulb,
      title: 'Our Approach',
      text: 'We combine creativity with technical excellence to deliver solutions that are both beautiful and functional.',
    },
  ]

  const whyChooseUs = [
    {
      icon: Users,
      title: 'Client-Focused',
      desc: 'We prioritize understanding your unique needs and goals.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      desc: 'Efficient processes that deliver quality results on time.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      desc: 'Rigorous testing ensures reliable, bug-free solutions.',
    },
    {
      icon: Heart,
      title: 'Ongoing Support',
      desc: 'We stay with you even after the project is launched.',
    },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================================
            HERO
        ========================================================== */}
        <motion.div {...fadeInUp} className="text-center mb-20">
          <h1 className="brand-gradient-text-strong text-4xl lg:text-5xl font-bold mb-6">
            About Us
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {company.description}
          </p>
        </motion.div>

        {/* =========================================================
            WHO WE ARE
        ========================================================== */}
        <motion.div {...fadeInUp} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Who We Are
              </h2>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Hi Grove Technologies is a modern technology company serving
                Tirunelveli, Melapalayam, Pirancheri and clients across South
                Tamil Nadu. We build customized digital solutions and work
                closely with each client to understand their unique
                requirements and deliver practical, high-quality results.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                From simple landing pages to complex web applications, our
                team has the expertise to bring your vision to life using the
                latest technologies and best practices.
              </p>
            </div>

            {/* =====================================================
                ANIMATED LOGO SECTION
            ====================================================== */}
            <div className="relative">

              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-100 via-white to-brand-200 dark:from-brand-950 dark:via-dark-card dark:to-brand-900/40 rounded-2xl flex items-center justify-center border border-brand-200/60 dark:border-brand-700/30">

                {/* =================================================
                    BACKGROUND GLOW - 1
                ================================================== */}
                <motion.div
                  className="absolute w-56 h-56 rounded-full bg-brand-500/20 blur-3xl"
                  animate={{
                    x: [-50, 50, -50],
                    y: [-30, 30, -30],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* =================================================
                    BACKGROUND GLOW - 2
                ================================================== */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full bg-brand-700/20 blur-3xl"
                  animate={{
                    x: [60, -60, 60],
                    y: [30, -30, 30],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* =================================================
                    OUTER ROTATING RING
                ================================================== */}
                <motion.div
                  className="absolute w-64 h-64 rounded-full border border-brand-400/30 dark:border-brand-400/20"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >

                  {/* Orbit Dot 1 */}
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-500 rounded-full shadow-lg shadow-brand-500/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Orbit Dot 2 */}
                  <motion.div
                    className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 bg-brand-400 rounded-full shadow-lg shadow-brand-400/50"
                    animate={{
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* =================================================
                    SECOND REVERSE ROTATING RING
                ================================================== */}
                <motion.div
                  className="absolute w-48 h-48 rounded-full border border-dashed border-brand-500/30 dark:border-brand-400/20"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* =================================================
                    THIRD SUBTLE RING
                ================================================== */}
                <motion.div
                  className="absolute w-36 h-36 rounded-full border border-brand-300/20 dark:border-brand-300/10"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 12,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                />

                {/* =================================================
                    FLOATING PARTICLES
                ================================================== */}
                {[...Array(14)].map((_, index) => (
                  <motion.span
                    key={`logo-particle-${index}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-brand-500/70"
                    style={{
                      left: `${10 + ((index * 19) % 80)}%`,
                      top: `${8 + ((index * 27) % 84)}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, index % 2 === 0 ? 8 : -8, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [0.7, 1.5, 0.7],
                    }}
                    transition={{
                      duration: 2.5 + (index % 3),
                      repeat: Infinity,
                      delay: index * 0.18,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

                {/* =================================================
                    SMALL FLOATING LIGHTS
                ================================================== */}
                <motion.div
                  className="absolute top-10 left-12 w-2 h-2 rounded-full bg-brand-400 shadow-lg shadow-brand-400/70"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className="absolute bottom-12 right-16 w-2 h-2 rounded-full bg-brand-600 shadow-lg shadow-brand-600/70"
                  animate={{
                    y: [0, 15, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* =================================================
                    CENTER LOGO
                ================================================== */}
                <div className="relative z-10 text-center">

                  {/* Logo Glow */}
                  <motion.div
                    className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-brand-500/20 blur-2xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* =================================================
                      LOGO FLOAT ANIMATION
                  ================================================== */}
                  <motion.div
                    className="relative w-28 h-28 mx-auto flex items-center justify-center mb-5"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 1.5, 0, -1.5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >

                    {/* Transparent Logo */}
                    <img
                      src="og.jpeg"
                      alt="Hi Grove Technologies Logo"
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>

                  {/* Company Name */}
                  <motion.p
                    className="text-brand-800 dark:text-brand-300 font-semibold text-lg"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {company.name}
                  </motion.p>

                  {/* Tagline */}
                  <p className="text-brand-600 dark:text-brand-400 text-sm">
                    {company.tagline}
                  </p>
                </div>

                {/* =================================================
                    CORNER GLOW - BOTTOM RIGHT
                ================================================== */}
                <motion.div
                  className="absolute -bottom-16 -right-16 w-40 h-40 bg-brand-600/20 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* =================================================
                    CORNER GLOW - TOP LEFT
                ================================================== */}
                <motion.div
                  className="absolute -top-16 -left-16 w-40 h-40 bg-brand-400/20 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            MISSION / VISION / APPROACH
        ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

          {values.map((item, index) => (
            <motion.div
              key={`value-${item.title}-${index}`}
              {...fadeInUp}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 mx-auto bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-brand-600 dark:text-brand-400" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {item.text}
              </p>
            </motion.div>
          ))}

        </div>

        {/* =========================================================
            WHY CHOOSE US
        ========================================================== */}
        <motion.div {...fadeInUp} className="mb-20">

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {whyChooseUs.map((item, index) => (
              <motion.div
                key={`why-${item.title}-${index}`}
                {...fadeInUp}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                }}
                className="p-6 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </motion.div>

        {/* =========================================================
            TECHNOLOGIES
        ========================================================== */}
        {activeTechnologies.length > 0 && (
          <motion.div {...fadeInUp} className="mb-20">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Technologies We Work With
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

              {activeTechnologies.map((tech, index) => (
                <motion.div
                  key={`technology-${tech.id}-${index}`}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="p-4 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border text-center hover:shadow-lg transition-shadow"
                >

                  <div className="w-10 h-10 mx-auto bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-brand-600 dark:text-brand-400 font-bold text-sm">
                      {tech.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {tech.category}
                  </p>

                </motion.div>
              ))}

            </div>
          </motion.div>
        )}

        {/* =========================================================
            CTA
        ========================================================== */}
        <motion.div
          {...fadeInUp}
          className="text-center p-10 bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-900 dark:to-brand-950 rounded-2xl"
        >

          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>

          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Let's discuss how we can help transform your digital presence and
            achieve your business goals.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

        </motion.div>

      </div>
    </div>
  )
}

export default About