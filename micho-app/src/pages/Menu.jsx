import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { menuData, categories } from '../data/menuData'
import BookingPrompt from '../components/BookingPrompt'
import ScrollReveal from '../components/ScrollReveal'

const HERO_IMG = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'

function DietaryBadge({ tag }) {
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 text-xs font-sans font-semibold border border-accent-copper/40 text-accent-copper ml-2 leading-none"
      title={tag === 'VG' ? 'Vegan' : 'Vegetarian'}
    >
      {tag}
    </span>
  )
}

function MenuItem({ item, index }) {
  return (
    <motion.div
      className="menu-item-row"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline flex-wrap gap-1">
          <span className="font-sans font-medium text-text-primary text-base">{item.name}</span>
          {item.tags?.map((tag) => <DietaryBadge key={tag} tag={tag} />)}
        </div>
        {item.description && (
          <p className="font-sans text-text-muted text-sm mt-1 leading-relaxed">{item.description}</p>
        )}
      </div>
      <motion.span
        className="font-sans font-medium text-text-primary text-base flex-shrink-0 ml-6"
        whileHover={{ color: '#C47A3B' }}
        transition={{ duration: 0.2 }}
      >
        £{item.price.toFixed(2)}
      </motion.span>
    </motion.div>
  )
}

function MenuSectionImage({ src, alt }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="w-full mb-14 overflow-hidden" style={{ height: 'clamp(200px, 32vw, 400px)' }}>
      <motion.div className="w-full h-full" style={{ y, scale: 1.18 }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 70%, rgba(15,14,12,0.6) 100%)' }} />
      </motion.div>
    </div>
  )
}

function MenuSection({ category, data }) {
  return (
    <section id={`cat-${category.replace(/\s+/g, '-').toLowerCase()}`} className="mb-28">
      {data.image && <MenuSectionImage src={data.image} alt={category} />}
      <div className="max-w-screen-md mx-auto px-6">
        <ScrollReveal direction="left" distance={50} duration={1.0}>
          <div className="flex items-center gap-6 mb-3">
            <motion.div
              className="h-px bg-accent-copper flex-shrink-0"
              style={{ width: '32px', originX: 0 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
            <h2 className="font-serif font-light text-4xl md:text-5xl text-text-primary">{category}</h2>
          </div>
          {data.note && <p className="font-sans text-text-muted text-sm italic mb-8 pl-14">{data.note}</p>}
          {!data.note && <div className="mb-8" />}
        </ScrollReveal>
        <div>
          {data.items.map((item, i) => (
            <MenuItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex items-end justify-start overflow-hidden" style={{ height: '55vh', minHeight: '340px' }}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.2 }}>
        <img src={HERO_IMG} alt="Micho menu" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,14,12,0.15), rgba(15,14,12,0.88))' }} />
      </motion.div>
      <motion.div className="relative z-10 px-8 md:px-14 pb-14 max-w-2xl" style={{ opacity }}>
        <motion.p className="section-label" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22,1,0.36,1] }}>
          Our Menu
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-text-primary leading-none"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Premium Ingredients
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-accent-copper leading-tight"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            &amp; Traditional Recipes
          </motion.h1>
        </div>
      </motion.div>
    </section>
  )
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const tabsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      for (let i = categories.length - 1; i >= 0; i--) {
        const id = `cat-${categories[i].replace(/\s+/g, '-').toLowerCase()}`
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 160) {
            setActiveCategory(categories[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToCategory(cat) {
    setActiveCategory(cat)
    const id = `cat-${cat.replace(/\s+/g, '-').toLowerCase()}`
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      <Helmet>
        <title>Menu | Micho Turkish Bar &amp; Grill Sheffield</title>
        <meta name="description" content="Explore Micho's full menu: charcoal-grilled kebabs, fresh meze, pide, pizza, desserts and drinks. Premium ingredients, traditional Turkish recipes." />
      </Helmet>

      <ParallaxHero />

      {/* Sticky category tabs */}
      <div
        ref={tabsRef}
        className="sticky z-30 py-3 px-4"
        style={{ top: '64px', background: 'rgba(15,14,12,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(196,122,59,0.15)' }}
      >
        <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className="relative px-3 py-2 font-sans text-xs font-semibold uppercase tracking-label transition-all duration-300 whitespace-nowrap flex-shrink-0"
              style={{ color: activeCategory === cat ? '#C47A3B' : '#A89F94' }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-accent-copper"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary key */}
      <motion.div
        className="max-w-screen-md mx-auto px-6 py-6 flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className="font-sans text-xs text-text-muted flex items-center gap-2">
          <span className="border border-accent-copper/40 text-accent-copper px-1.5 py-0.5 text-xs font-semibold">V</span>
          Vegetarian
        </span>
        <span className="font-sans text-xs text-text-muted flex items-center gap-2">
          <span className="border border-accent-copper/40 text-accent-copper px-1.5 py-0.5 text-xs font-semibold">VG</span>
          Vegan
        </span>
      </motion.div>

      {/* Menu sections */}
      <div className="pt-4">
        {categories.map((cat) => (
          <MenuSection key={cat} category={cat} data={menuData[cat]} />
        ))}
      </div>

      {/* Allergen note */}
      <ScrollReveal direction="up" distance={30} className="max-w-screen-md mx-auto px-6 pb-16">
        <p className="font-sans text-xs text-text-muted leading-relaxed border-t border-text-primary/5 pt-8">
          If you have any allergies or dietary requirements, please inform your server before ordering. Some dishes may contain nuts, gluten, dairy, or other allergens. Full allergen information available on request.
        </p>
      </ScrollReveal>

      <BookingPrompt />
    </motion.main>
  )
}
