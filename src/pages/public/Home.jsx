import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Code2,
  Palette,
  Zap,
  Shield,
  Sparkles,
  Globe2,
  Layers3,
} from 'lucide-react'

import { useData } from '../../context/DataContext'
import AnimatedCounter from '../../components/AnimatedCounter'

// ============================================================
// ANIMATIONS
// ============================================================

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  },
}

const staggerItem = {
  initial: {
    opacity: 0,
    y: 25,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.1,
  },
}

// ============================================================
// HERO LETTER ANIMATION
// ============================================================

const letterContainer = {
  hidden: {},
  visible: {},
}

const letterItem = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ============================================================
// LETTER COMPONENT
// ============================================================

const AnimatedText = ({
  text,
  className = '',
  gradient = false,
  delay = 0,
}) => {
  const containerClasses = `block ${className} ${
    gradient
      ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 text-transparent bg-clip-text'
      : ''
  }`

  return (
    <motion.span
      variants={letterContainer}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay, staggerChildren: 0.045 }}
      className={containerClasses}
      style={{
        overflow: 'visible',
        lineHeight: '1.15',
        paddingBottom: gradient ? '5px' : '0',
        paddingRight: '4px',
      }}
    >
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span
              key={index}
              className="inline-block"
              style={{ width: '0.28em' }}
            >
              {' '}
            </span>
          )
        }

        return (
          <motion.span
            key={`${char}-${index}`}
            variants={letterItem}
            className="inline-block"
            style={{
              display: 'inline-block',
              overflow: 'visible',
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </motion.span>
  )
}

// ============================================================
// HOME
// ============================================================

const Home = () => {
  const {
    services = [],
    industries = [],
    projects = [],
    settings,
    testimonials = [],
    technologies = [],
  } = useData()

  const company = settings?.company || {}
  const stats = settings?.stats || {}

  const activeServices = services
    .filter((service) => service.active)
    .slice(0, 4)

  const activeIndustries = industries
    .filter((industry) => industry.active)
    .slice(0, 4)

  const featuredProjects = projects
    .filter((project) => project.featured && project.active)
    .slice(0, 3)

  const activeTestimonials = testimonials
    .filter((testimonial) => testimonial.active)
    .slice(0, 3)

  const activeTechnologies = technologies
    .filter((technology) => technology.active)

  const highlights = [
    {
      icon: Code2,
      title: 'Custom Development',
      desc: 'Tailored digital solutions built around your business goals.',
    },
    {
      icon: Palette,
      title: 'Premium Design',
      desc: 'Modern interfaces designed to look exceptional on every device.',
    },
    {
      icon: Zap,
      title: 'Modern Technology',
      desc: 'Reliable tools and frameworks built for speed and scalability.',
    },
    {
      icon: Shield,
      title: 'Performance & Security',
      desc: 'Fast, secure and dependable applications for your business.',
    },
  ]

  const visibleStats = Object.entries(stats).filter(
    ([, stat]) => stat?.visible
  )

  return (
    <div className="overflow-hidden bg-white dark:bg-dark-bg">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          overflow-hidden
          bg-gradient-to-br
          from-slate-50
          via-white
          to-blue-50
          dark:from-[#05070c]
          dark:via-[#070b14]
          dark:to-[#08111f]
        "
      >

        {/* Background atmosphere */}

        <div className="absolute inset-0 pointer-events-none">

          <div
            className="
              absolute
              -top-48
              -right-40
              w-[38rem]
              h-[38rem]
              rounded-full
              bg-blue-500/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              -bottom-52
              -left-48
              w-[34rem]
              h-[34rem]
              rounded-full
              bg-cyan-400/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              top-1/3
              left-1/2
              w-[22rem]
              h-[22rem]
              -translate-x-1/2
              rounded-full
              bg-blue-600/5
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              dark:opacity-[0.055]
              bg-[linear-gradient(rgba(22,119,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(22,119,255,.8)_1px,transparent_1px)]
              bg-[size:54px_54px]
            "
          />

          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-1/2
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-400/60
              to-transparent
            "
          />

        </div>

        {/* Hero content */}

        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            pt-28
            pb-20
            lg:pt-32
            lg:pb-24
            w-full
          "
        >

          <div
            className="
              grid
              lg:grid-cols-[1.05fr_.95fr]
              gap-14
              lg:gap-20
              items-center
            "
          >

            {/* ==================================================
                HERO LEFT
            ================================================== */}

            <div className="text-center lg:text-left">

              {/* Badge */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  px-4
                  py-2
                  rounded-full
                  bg-blue-50
                  dark:bg-blue-500/[0.08]
                  border
                  border-blue-200
                  dark:border-blue-500/20
                  text-blue-700
                  dark:text-cyan-300
                  text-sm
                  font-medium
                  mb-7
                  shadow-sm
                  dark:shadow-[0_0_25px_rgba(22,119,255,.06)]
                "
              >

                <span
                  className="
                    relative
                    flex
                    w-2
                    h-2
                  "
                >
                  <span
                    className="
                      absolute
                      inline-flex
                      w-full
                      h-full
                      rounded-full
                      bg-blue-500
                      opacity-75
                      animate-ping
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      w-2
                      h-2
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_12px_rgba(34,211,238,.8)]
                    "
                  />
                </span>

                <span>
                  Future-ready digital solutions
                </span>

              </motion.div>

              {/* ==================================================
                  HERO HEADING
              ================================================== */}

              <motion.h1
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: 1,
                }}
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                  font-bold
                  tracking-tight
                  text-gray-950
                  dark:text-white
                  mb-7
                  leading-[1.1]
                  overflow-visible
                "
              >

                <AnimatedText
                  text="Building Tomorrow’s"
                  className="whitespace-nowrap"
                  delay={0}
                />

                <AnimatedText
                  text="Digital Solutions"
                  className="whitespace-nowrap"
                  gradient={true}
                  delay={0.9}
                />

                <AnimatedText
                  text="Today."
                  className="whitespace-nowrap"
                  delay={1.8}
                />

              </motion.h1>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.9,
                  ease: 'easeOut',
                }}
                className="
                  text-base
                  sm:text-lg
                  lg:text-xl
                  text-gray-600
                  dark:text-gray-400
                  max-w-2xl
                  mx-auto
                  lg:mx-0
                  mb-9
                  leading-relaxed
                "
              >
                {company.description ||
                  'We build modern digital experiences that help businesses grow, innovate and stay ahead.'}
              </motion.p>

              {/* CTA */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.65,
                  delay: 1.0,
                  ease: 'easeOut',
                }}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-4
                "
              >

                <Link
                  to="/contact"
                  className="
                    group
                    relative
                    overflow-hidden
                    px-7
                    py-3.5
                    bg-gradient-to-r
                    from-brand-600
                    to-cyan-500
                    hover:from-brand-500
                    hover:to-cyan-400
                    text-white
                    font-semibold
                    rounded-xl
                    flex
                    items-center
                    gap-2
                    shadow-[0_10px_35px_rgba(22,119,255,.22)]
                    hover:shadow-[0_12px_45px_rgba(22,119,255,.35)]
                    transition-all
                    duration-300
                  "
                >
                  <span>
                    Contact Us
                  </span>

                  <ArrowRight
                    className="
                      w-5
                      h-5
                      group-hover:translate-x-1
                      transition-transform
                    "
                  />
                </Link>

                <Link
                  to="/portfolio"
                  className="
                    group
                    px-7
                    py-3.5
                    bg-white/80
                    dark:bg-white/[0.035]
                    backdrop-blur-md
                    text-gray-900
                    dark:text-white
                    font-semibold
                    rounded-xl
                    border
                    border-gray-200
                    dark:border-white/10
                    hover:border-blue-300
                    dark:hover:border-cyan-400/30
                    hover:bg-blue-50/60
                    dark:hover:bg-white/[0.06]
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span>
                    View Our Work
                  </span>

                  <ArrowRight
                    className="
                      w-4
                      h-4
                      opacity-0
                      -translate-x-2
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      transition-all
                    "
                  />
                </Link>

              </motion.div>

              {/* Trust line */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: 1.15,
                }}
                className="
                  mt-8
                  flex
                  items-center
                  justify-center
                  lg:justify-start
                  gap-3
                  text-xs
                  text-gray-500
                  dark:text-gray-500
                "
              >
                <Globe2 className="w-4 h-4 text-cyan-400" />

                <span>
                  Digital • Scalable • Future-ready
                </span>

              </motion.div>

            </div>

            {/* ==================================================
                HERO RIGHT — now fully theme‑aware
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                x: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                mx-auto
                w-full
                max-w-[560px]
              "
            >

              {/* Main container — light/dark background & border */}

              <div
                className="
                  relative
                  aspect-square
                  rounded-[2rem]
                  overflow-hidden
                  bg-white
                  dark:bg-[#07101d]
                  border
                  border-gray-200
                  dark:border-white/10
                  shadow-[0_25px_90px_rgba(0,0,0,.08)]
                  dark:shadow-[0_25px_90px_rgba(0,0,0,.28)]
                "
              >

                {/* Glow — light & dark variants */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_55%_45%,rgba(0,200,255,.08),transparent_32%),radial-gradient(circle_at_45%_55%,rgba(22,119,255,.10),transparent_52%)]
                    dark:bg-[radial-gradient(circle_at_55%_45%,rgba(0,200,255,.18),transparent_32%),radial-gradient(circle_at_45%_55%,rgba(22,119,255,.22),transparent_52%)]
                  "
                />

                {/* Grid — lighter in light mode */}

                <div
                  className="
                    absolute
                    inset-0
                    opacity-[0.04]
                    dark:opacity-[0.08]
                    bg-[linear-gradient(rgba(34,211,238,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.3)_1px,transparent_1px)]
                    dark:bg-[linear-gradient(rgba(34,211,238,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.4)_1px,transparent_1px)]
                    bg-[size:42px_42px]
                  "
                />

                {/* Outer ring — light/dark borders */}

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    absolute
                    inset-10
                    rounded-full
                    border
                    border-blue-200/50
                    dark:border-blue-400/25
                  "
                />

                {/* Second ring — light/dark dashed border */}

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    absolute
                    inset-20
                    rounded-full
                    border
                    border-cyan-300/30
                    dark:border-cyan-400/25
                    border-dashed
                  "
                />

                {/* Core glow — adjusted for light mode */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-48
                    h-48
                    sm:w-60
                    sm:h-60
                    rounded-full
                    bg-gradient-to-br
                    from-brand-500/60
                    via-blue-600/20
                    to-cyan-400/15
                    dark:from-brand-500/80
                    dark:via-blue-600/40
                    dark:to-cyan-400/30
                    blur-[2px]
                    shadow-[0_0_60px_rgba(0,200,255,.15)]
                    dark:shadow-[0_0_90px_rgba(0,200,255,.35)]
                  "
                />

                {/* ==================================================
                    LOGO — light/dark theme fully fixed
                ================================================== */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-36
                    h-36
                    sm:w-48
                    sm:h-48
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-white
                    dark:bg-[#050b14]/90
                    border
                    border-blue-300/50
                    dark:border-cyan-300/50
                    backdrop-blur-xl
                    shadow-[0_8px_32px_rgba(0,0,0,.08)]
                    dark:shadow-[0_8px_32px_rgba(0,0,0,.4)]
                  "
                >

                  <div className="text-center">

                    <div
                      className="
                        text-4xl
                        sm:text-5xl
                        font-black
                        text-blue-700
                        dark:text-white
                        tracking-tight
                      "
                    >
                      <img src={"og.jpeg"} alt="HI GROVE TECHNOLOGIES Logo" className="w-full h-full object-contain" style={{ alignContent: 'center', width: '100%', padding: '10%' ,paddingBottom: '25%' }} />
                    </div>

                    

                  </div>

                </div>

                {/* ==================================================
                    FLOATING BADGES — light/dark theme support
                ================================================== */}

                {/* Cloud */}

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    absolute
                    top-14
                    left-7
                    sm:left-10
                    px-3
                    py-2
                    rounded-lg
                    bg-white/80
                    dark:bg-[#0b1422]/85
                    border
                    border-gray-200
                    dark:border-cyan-400/15
                    text-xs
                    text-gray-700
                    dark:text-cyan-200
                    backdrop-blur-md
                    shadow-lg
                  "
                >
                  Cloud
                </motion.div>

                {/* AI / ML */}

                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    absolute
                    top-24
                    right-7
                    sm:right-8
                    px-3
                    py-2
                    rounded-lg
                    bg-white/80
                    dark:bg-[#0b1422]/85
                    border
                    border-gray-200
                    dark:border-blue-400/15
                    text-xs
                    text-gray-700
                    dark:text-blue-200
                    backdrop-blur-md
                    shadow-lg
                  "
                >
                  AI / ML
                </motion.div>

                {/* Secure */}

                <motion.div
                  animate={{
                    y: [0, 7, 0],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    absolute
                    bottom-24
                    left-7
                    sm:left-8
                    px-3
                    py-2
                    rounded-lg
                    bg-white/80
                    dark:bg-[#0b1422]/85
                    border
                    border-gray-200
                    dark:border-cyan-400/15
                    text-xs
                    text-gray-700
                    dark:text-cyan-200
                    backdrop-blur-md
                    shadow-lg
                  "
                >
                  Secure
                </motion.div>

                {/* Scale */}

                <motion.div
                  animate={{
                    y: [0, -7, 0],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    absolute
                    bottom-12
                    right-10
                    sm:right-14
                    px-3
                    py-2
                    rounded-lg
                    bg-white/80
                    dark:bg-[#0b1422]/85
                    border
                    border-gray-200
                    dark:border-blue-400/15
                    text-xs
                    text-gray-700
                    dark:text-blue-200
                    backdrop-blur-md
                    shadow-lg
                  "
                >
                  Scale
                </motion.div>

                {/* Indicators */}

                <div
                  className="
                    absolute
                    bottom-7
                    left-1/2
                    -translate-x-1/2
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ======================================================
          STATS
      ====================================================== */}

      {visibleStats.length > 0 && (
        <section className="relative py-20 bg-white dark:bg-dark-bg">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              {...fadeInUp}
              className="text-center mb-14"
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[.2em]
                  text-brand-600
                  dark:text-cyan-400
                  mb-4
                "
              >
                <Sparkles className="w-4 h-4" />
                Our Impact
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  mb-4
                "
              >
                Trusted by Businesses Worldwide
              </h2>

              <p
                className="
                  text-gray-600
                  dark:text-gray-400
                  max-w-2xl
                  mx-auto
                "
              >
                We build customized digital solutions based on each
                client's unique requirements.
              </p>

            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

              {visibleStats.map(([key, stat], index) => (

                <motion.div
                  key={key}
                  {...staggerItem}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    group
                    relative
                    text-center
                    p-6
                    lg:p-8
                    rounded-2xl
                    bg-gray-50
                    dark:bg-white/[0.025]
                    border
                    border-gray-100
                    dark:border-white/[0.07]
                    hover:border-blue-300
                    dark:hover:border-cyan-400/20
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      text-3xl
                      lg:text-4xl
                      font-bold
                      text-brand-600
                      dark:text-cyan-400
                      mb-2
                    "
                  >
                    {typeof stat.value === 'number' ? (
                      <AnimatedCounter end={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>

                </motion.div>

              ))}

            </div>

            <motion.div
              {...fadeInUp}
              className="
                mt-16
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
              "
            >

              {highlights.map((item, index) => {

                const Icon = item.icon

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -4,
                    }}
                    className="
                      group
                      p-5
                      rounded-2xl
                      border
                      border-gray-100
                      dark:border-white/[0.06]
                      hover:border-blue-300
                      dark:hover:border-cyan-400/20
                      transition-all
                    "
                  >

                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-blue-50
                        dark:bg-blue-500/10
                        flex
                        items-center
                        justify-center
                        mb-4
                        group-hover:scale-105
                        transition-transform
                      "
                    >
                      <Icon
                        className="
                          w-6
                          h-6
                          text-brand-600
                          dark:text-cyan-400
                        "
                      />
                    </div>

                    <h3
                      className="
                        font-semibold
                        text-gray-900
                        dark:text-white
                        mb-1
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-600
                        dark:text-gray-400
                        leading-relaxed
                      "
                    >
                      {item.desc}
                    </p>

                  </motion.div>
                )
              })}

            </motion.div>

          </div>

        </section>
      )}

      {/* ======================================================
          SERVICES
      ====================================================== */}

      <section className="py-20 bg-gray-50 dark:bg-[#080d16]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            {...fadeInUp}
            className="text-center mb-14"
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                uppercase
                tracking-[.2em]
                text-brand-600
                dark:text-cyan-400
                mb-4
              "
            >
              <Layers3 className="w-4 h-4" />
              What We Build
            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-gray-900
                dark:text-white
                mb-4
              "
            >
              Our Services
            </h2>

            <p
              className="
                text-gray-600
                dark:text-gray-400
                max-w-2xl
                mx-auto
              "
            >
              Comprehensive digital solutions to help your business
              thrive in a connected world.
            </p>

          </motion.div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-5
            "
          >

            {activeServices.map((service, index) => (

              <motion.div
                key={`service-${service.id}-${index}`}
                {...staggerItem}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
              >

                <Link
                  to={`/services/${service.slug}`}
                  className="
                    group
                    relative
                    block
                    h-full
                    p-6
                    rounded-2xl
                    bg-white
                    dark:bg-[#0c1420]
                    border
                    border-gray-200
                    dark:border-white/[0.07]
                    hover:border-blue-300
                    dark:hover:border-cyan-400/25
                    hover:shadow-[0_15px_45px_rgba(22,119,255,.12)]
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      w-full
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-400
                      to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                    "
                  />

                  <div
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-blue-50
                      dark:bg-blue-500/10
                      flex
                      items-center
                      justify-center
                      mb-5
                      group-hover:scale-110
                      transition-transform
                    "
                  >
                    <span
                      className="
                        text-brand-600
                        dark:text-cyan-400
                        font-bold
                        text-lg
                      "
                    >
                      {service.name?.charAt(0)}
                    </span>
                  </div>

                  <h3
                    className="
                      font-semibold
                      text-gray-900
                      dark:text-white
                      mb-2
                    "
                  >
                    {service.name}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-600
                      dark:text-gray-400
                      mb-5
                      leading-relaxed
                    "
                  >
                    {service.shortDescription}
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      text-brand-600
                      dark:text-cyan-400
                      text-sm
                      font-semibold
                    "
                  >
                    <span>Learn more</span>

                    <ArrowRight
                      className="
                        w-4
                        h-4
                        ml-1
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </div>

                </Link>

              </motion.div>

            ))}

          </div>

          <motion.div
            {...fadeInUp}
            className="text-center mt-10"
          >
            <Link
              to="/services"
              className="
                inline-flex
                items-center
                gap-2
                text-brand-600
                dark:text-cyan-400
                font-semibold
                hover:gap-3
                transition-all
              "
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>

      </section>

      {/* ======================================================
          INDUSTRIES
      ====================================================== */}

      <section className="py-20 bg-white dark:bg-dark-bg">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            {...fadeInUp}
            className="text-center mb-14"
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                uppercase
                tracking-[.2em]
                text-brand-600
                dark:text-cyan-400
                mb-4
              "
            >
              <Globe2 className="w-4 h-4" />
              Industries
            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-gray-900
                dark:text-white
                mb-4
              "
            >
              Industries We Serve
            </h2>

            <p
              className="
                text-gray-600
                dark:text-gray-400
                max-w-2xl
                mx-auto
              "
            >
              Specialized digital solutions tailored to the unique
              requirements of modern businesses.
            </p>

          </motion.div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
            "
          >

            {activeIndustries.map((industry, index) => (

              <motion.div
                key={`industry-${industry.id}-${index}`}
                {...staggerItem}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
              >

                <Link
                  to={`/industries/${industry.slug}`}
                  className="
                    group
                    relative
                    block
                    h-full
                    p-6
                    rounded-2xl
                    bg-gray-50
                    dark:bg-white/[0.025]
                    border
                    border-gray-100
                    dark:border-white/[0.07]
                    hover:border-blue-300
                    dark:hover:border-cyan-400/20
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-50
                      dark:bg-blue-500/10
                      flex
                      items-center
                      justify-center
                      mb-5
                    "
                  >
                    <Globe2
                      className="
                        w-5
                        h-5
                        text-brand-600
                        dark:text-cyan-400
                      "
                    />
                  </div>

                  <h3
                    className="
                      font-semibold
                      text-gray-900
                      dark:text-white
                      mb-2
                      group-hover:text-brand-600
                      dark:group-hover:text-cyan-400
                      transition-colors
                    "
                  >
                    {industry.name}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-600
                      dark:text-gray-400
                      leading-relaxed
                    "
                  >
                    {industry.description}
                  </p>

                </Link>

              </motion.div>

            ))}

          </div>

          <motion.div
            {...fadeInUp}
            className="text-center mt-10"
          >
            <Link
              to="/industries"
              className="
                inline-flex
                items-center
                gap-2
                text-brand-600
                dark:text-cyan-400
                font-semibold
                hover:gap-3
                transition-all
              "
            >
              View All Industries
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ======================================================
          FEATURED PROJECTS
      ====================================================== */}

      {featuredProjects.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-[#080d16]">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              {...fadeInUp}
              className="text-center mb-14"
            >

              <div
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[.2em]
                  text-brand-600
                  dark:text-cyan-400
                  mb-4
                "
              >
                Selected Work
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  mb-4
                "
              >
                Featured Work
              </h2>

              <p
                className="
                  text-gray-600
                  dark:text-gray-400
                  max-w-2xl
                  mx-auto
                "
              >
                Explore some of our recent projects and see what
                we can build for you.
              </p>

            </motion.div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-7
              "
            >

              {featuredProjects.map((project, index) => (

                <motion.div
                  key={`project-${project.id}-${index}`}
                  {...staggerItem}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                >

                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="block group"
                  >

                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-2xl
                        mb-5
                        border
                        border-gray-200
                        dark:border-white/[0.07]
                        bg-gray-900
                      "
                    >

                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="
                          w-full
                          h-64
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-700
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/70
                          via-black/10
                          to-transparent
                          opacity-60
                          group-hover:opacity-90
                          transition-opacity
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-4
                          left-4
                          right-4
                          flex
                          items-end
                          justify-between
                        "
                      >

                        <span
                          className="
                            px-3
                            py-1.5
                            rounded-full
                            bg-black/50
                            backdrop-blur-md
                            border
                            border-white/10
                            text-cyan-200
                            text-xs
                            font-medium
                          "
                        >
                          {project.category}
                        </span>

                        <ArrowRight
                          className="
                            w-5
                            h-5
                            text-white
                            opacity-0
                            translate-y-2
                            group-hover:opacity-100
                            group-hover:translate-y-0
                            transition-all
                          "
                        />

                      </div>

                    </div>

                    <div className="flex items-center gap-2 mb-2">

                      <span
                        className="
                          text-xs
                          text-brand-600
                          dark:text-cyan-400
                          font-medium
                        "
                      >
                        {project.category}
                      </span>

                      <span className="text-gray-300 dark:text-gray-700">
                        /
                      </span>

                      <span
                        className="
                          text-xs
                          text-gray-500
                          dark:text-gray-500
                        "
                      >
                        {project.industry}
                      </span>

                    </div>

                    <h3
                      className="
                        font-semibold
                        text-lg
                        text-gray-900
                        dark:text-white
                        group-hover:text-brand-600
                        dark:group-hover:text-cyan-400
                        transition-colors
                      "
                    >
                      {project.title}
                    </h3>

                  </Link>

                </motion.div>

              ))}

            </div>

            <motion.div
              {...fadeInUp}
              className="text-center mt-10"
            >
              <Link
                to="/portfolio"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-brand-600
                  dark:text-cyan-400
                  font-semibold
                  hover:gap-3
                  transition-all
                "
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </section>
      )}

      {/* ======================================================
          TECHNOLOGIES
      ====================================================== */}

      {activeTechnologies.length > 0 && (
        <section className="py-20 bg-white dark:bg-dark-bg">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              {...fadeInUp}
              className="text-center mb-14"
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[.2em]
                  text-brand-600
                  dark:text-cyan-400
                  mb-4
                "
              >
                <Code2 className="w-4 h-4" />
                Technology Stack
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  mb-4
                "
              >
                Technologies We Use
              </h2>

              <p
                className="
                  text-gray-600
                  dark:text-gray-400
                  max-w-2xl
                  mx-auto
                "
              >
                Modern, proven technologies for MERN Stack and PERN Stack
                development, API integrations, scalable backends and high-performance web applications.
              </p>

            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-semibold">MERN Stack Development</span>
              <span className="px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-semibold">PERN Stack Development</span>
              <span className="px-4 py-2 rounded-full bg-gray-50 dark:bg-white/[0.025] border border-gray-200 dark:border-white/[0.07] text-gray-700 dark:text-gray-300 text-sm font-semibold">Full-Stack Web Development</span>
            </div>

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-4
              "
            >

              {activeTechnologies.map((tech, index) => (

                <motion.div
                  key={`technology-${tech.id}-${index}`}
                  {...staggerItem}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  className="
                    group
                    p-5
                    rounded-xl
                    bg-gray-50
                    dark:bg-white/[0.025]
                    border
                    border-gray-100
                    dark:border-white/[0.07]
                    hover:border-blue-300
                    dark:hover:border-cyan-400/20
                    text-center
                    transition-all
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      mx-auto
                      bg-blue-50
                      dark:bg-blue-500/10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mb-3
                      group-hover:scale-110
                      transition-transform
                    "
                  >
                    <span
                      className="
                        text-brand-600
                        dark:text-cyan-400
                        font-bold
                      "
                    >
                      {tech.name?.charAt(0)}
                    </span>
                  </div>

                  <h3
                    className="
                      font-medium
                      text-gray-900
                      dark:text-white
                      text-sm
                    "
                  >
                    {tech.name}
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-500
                      mt-1
                    "
                  >
                    {tech.category}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>
        </section>
      )}

      {/* ======================================================
          TESTIMONIALS
      ====================================================== */}

      {activeTestimonials.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-[#080d16]">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              {...fadeInUp}
              className="text-center mb-14"
            >

              <div
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[.2em]
                  text-brand-600
                  dark:text-cyan-400
                  mb-4
                "
              >
                Client Experience
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                What Our Clients Say
              </h2>

            </motion.div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {activeTestimonials.map((testimonial, index) => (

                <motion.div
                  key={`testimonial-${testimonial.id}-${index}`}
                  {...staggerItem}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    p-6
                    rounded-2xl
                    bg-white
                    dark:bg-[#0c1420]
                    border
                    border-gray-200
                    dark:border-white/[0.07]
                  "
                >

                  <div
                    className="
                      text-4xl
                      text-brand-500
                      dark:text-cyan-400
                      mb-4
                    "
                  >
                    “
                  </div>

                  <p
                    className="
                      text-gray-600
                      dark:text-gray-400
                      leading-relaxed
                      mb-6
                    "
                  >
                    {testimonial.message ||
                      testimonial.content ||
                      testimonial.text}
                  </p>

                  <div>

                    <div
                      className="
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {testimonial.name}
                    </div>

                    {testimonial.role && (
                      <div
                        className="
                          text-xs
                          text-gray-500
                          mt-1
                        "
                      >
                        {testimonial.role}
                      </div>
                    )}

                  </div>

                </motion.div>

              ))}

            </div>

          </div>
        </section>
      )}

      {/* ======================================================
          CTA
      ====================================================== */}

      <section
        className="
          relative
          py-24
          overflow-hidden
          bg-[#050914]
        "
      >

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            bg-[radial-gradient(circle_at_50%_50%,rgba(22,119,255,.18),transparent_55%)]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-400/50
            to-transparent
          "
        />

        <div
          className="
            relative
            max-w-4xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            text-center
          "
        >

          <motion.div {...fadeInUp}>

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/[0.04]
                border
                border-white/10
                text-cyan-300
                text-xs
                font-semibold
                uppercase
                tracking-[.18em]
                mb-6
              "
            >
              <Sparkles className="w-4 h-4" />
              Let's Build
            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                text-white
                mb-5
                leading-tight
              "
            >
              Ready to Build Something Amazing?
            </h2>

            <p
              className="
                text-gray-400
                text-base
                sm:text-lg
                mb-9
                max-w-2xl
                mx-auto
                leading-relaxed
              "
            >
              Let's discuss your project and create a digital
              solution that drives meaningful results for your business.
            </p>

            <Link
              to="/contact"
              className="
                group
                inline-flex
                items-center
                gap-2
                px-8
                py-4
                bg-white
                text-gray-950
                font-semibold
                rounded-xl
                hover:bg-cyan-50
                hover:shadow-[0_10px_40px_rgba(34,211,238,.2)]
                transition-all
              "
            >

              <span>
                Start a Conversation
              </span>

              <ArrowRight
                className="
                  w-5
                  h-5
                  group-hover:translate-x-1
                  transition-transform
                "
              />

            </Link>

          </motion.div>

        </div>

      </section>

    </div>
  )
}

export default Home