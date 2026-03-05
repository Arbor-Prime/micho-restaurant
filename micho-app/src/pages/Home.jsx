import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import BookingPrompt from '../components/BookingPrompt'

// Reliable Unsplash images with auto format
const IMG_GRILL = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'
const IMG_FOOD1 = 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80'
const IMG_FOOD2 = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
const IMG_FOOD3 = 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80'
const IMG_FOOD4 = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80'
const IMG_IG1 = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=75'
const IMG_IG2 = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=75'
const IMG_IG3 = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=75'
const IMG_IG4 = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=75'
const IMG_IG5 = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=75'
const IMG_IG6 = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=75'

// Animated counter
function Counter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const tick = () => {
            const elapsed = (Date.now() - start) / 1000
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// Parallax section
function ParallaxSection({ src, alt, height = '60vw', maxHeight = '700px' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div ref={ref} className="relative overflow-hidden w-full" style={{ height: `clamp(320px, ${height}, ${maxHeight})` }}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.25 }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(15,14,12,0.5) 100%)' }} />
    </div>
  )
}

// Split text animation - each word animates in
function AnimatedHeadline({ text, className, delay = 0 }) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.25em', overflow: 'hidden' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

// Horizontal marquee strip
function MarqueeStrip() {
  const items = ['Charcoal Grilled', '•', 'Fresh Daily', '•', 'Sheffield Since 1999', '•', 'Authentic Turkish', '•', 'Family Kitchen', '•', 'Open Flame', '•']
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden py-5 border-y" style={{ borderColor: 'rgba(196,122,59,0.15)', background: 'rgba(196,122,59,0.04)' }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-serif italic text-accent-copper/60 text-sm tracking-widest flex-shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '35%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0])
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-16"
    >
      <SEO
          title="Micho Turkish Bar & Grill | Authentic Turkish Dining in Sheffield"
          description="Authentic Turkish Bar & Grill in Sheffield's Crookes. Charcoal-grilled meats, fresh meze, and 25+ years of culinary heritage. Book your table today."
          canonical="/"
        />

        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,14,12,0.3) 0%, rgba(15,14,12,0.5) 40%, rgba(15,14,12,0.88) 100%)' }} />
          </div>

        {/* Animated ambient rings */}
        {[1, 2, 3].map((n) => (
          <motion.div
            key={n}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: `${n * 280}px`,
              height: `${n * 280}px`,
              borderColor: 'rgba(196,122,59,0.08)',
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 4 + n * 1.5, repeat: Infinity, ease: 'easeInOut', delay: n * 0.8 }}
          />
        ))}

        <motion.div className="relative z-10 text-center px-6" style={{ opacity: heroOpacity }}>
          <motion.p
            className="section-label mb-6"
            initial={{ opacity: 0, y: 30, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          >
            Authentic Turkish Bar &amp; Grill
          </motion.p>

          {/* Massive animated title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-serif font-light text-text-primary leading-none"
              style={{ fontSize: 'clamp(80px, 18vw, 200px)', letterSpacing: '0.06em' }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              MICHO
            </motion.h1>
          </div>

          <motion.div
            className="w-24 h-px bg-accent-copper mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          />

          <motion.p
            className="font-serif italic text-text-muted text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            A family table open to everyone
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <a href="https://web.dojo.app/create_booking/vendor/IMRbX5h6TDitS4ia5XT3HxTvOdSiYmbC-xwiQb1-icM_restaurant" target="_blank" rel="noopener noreferrer" className="btn-copper">Book a Table</a>
            <Link to="/menu" className="btn-outline">Explore Menu</Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.span className="font-sans text-xs tracking-widest text-text-muted uppercase">Scroll</motion.span>
          <motion.div
            className="w-px bg-accent-copper"
            style={{ height: '48px', originY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <MarqueeStrip />

      {/* ─── WELCOME ─── */}
      <section className="py-28 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* LEFT — text */}
          <div>
            <motion.p
              className="section-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Welcome
            </motion.p>

            <div className="mb-10">
              <AnimatedHeadline
                text="Where fire meets tradition"
                className="font-serif font-light text-text-primary leading-tight"
                delay={0.1}
              />
              <style>{`.animated-headline { font-size: clamp(38px, 6vw, 68px); }`}</style>
            </div>

            {['Nestled in Sheffield\'s Crookes neighbourhood, Micho has been serving authentic Turkish cuisine for over 25 years. Born from a deep love of Turkish culinary heritage, every dish we prepare carries the warmth of a family kitchen and the precision of a lifetime\'s craft.',
              'We believe food is the greatest connector of people. Our charcoal grill never rests, our meze comes fresh from the kitchen daily, and every guest is welcomed as family. This is not just dinner — this is an experience passed down through generations.'
            ].map((text, i) => (
              <motion.p
                key={i}
                className="font-sans text-text-muted text-base md:text-lg leading-relaxed mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* RIGHT — chefs photo */}
          <motion.div
            className="relative overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/chefs.png"
              alt="Micho chefs with their dishes"
              className="w-full h-full object-cover object-top"
              style={{ maxHeight: '620px' }}
              loading="lazy"
            />
            {/* subtle bottom fade to blend with background */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 70%, rgba(15,14,12,0.4) 100%)' }} />
          </motion.div>

        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 px-6" style={{ background: '#1A1816' }}>
        <div className="max-w-screen-lg mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {[
            { value: 25, suffix: '+', label: 'Years of Heritage' },
            { value: 70, suffix: '+', label: 'Menu Items' },
            { value: 1000, suffix: 's', label: 'Families Served' },
            { value: 1, suffix: ' Grill', label: 'Always Burning' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif font-light text-accent-copper" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-sans text-text-muted text-xs uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PARALLAX IMAGE BREAK ─── */}
      <ParallaxSection src={IMG_GRILL} alt="Charcoal grill at Micho Turkish Bar & Grill" height="55vw" maxHeight="680px" />

      {/* ─── THE EXPERIENCE ─── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">

            {/* LEFT — video */}
            <motion.div
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: '4/5' }}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              {/* subtle vignette overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(15,14,12,0.5) 100%)' }} />
            </motion.div>

            {/* CENTRE — headline + body text */}
            <div className="text-center md:text-left">
              <motion.p
                className="section-label mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                The Experience
              </motion.p>
              <div className="mb-8">
                <AnimatedHeadline
                  text="More than a meal"
                  className="font-serif font-light text-text-primary"
                  delay={0.05}
                />
              </div>
              <motion.p
                className="font-sans text-text-muted text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Every visit to Micho is a journey through Turkey's rich culinary landscape — fire, flavour, and a warmth that lingers long after the last bite.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5 }}
              >
                <Link to="/menu" className="btn-copper">Explore the Menu</Link>
              </motion.div>
            </div>

            {/* RIGHT — numbered statements */}
            <div className="flex flex-col gap-8">
              {[
                { line: 'Charcoal-grilled over open flame.', num: '01' },
                { line: 'Freshly prepared from scratch, daily.', num: '02' },
                { line: '25 years of Turkish culinary heritage.', num: '03' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-5 border-b pb-8"
                  style={{ borderColor: 'rgba(196,122,59,0.12)' }}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.0, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-sans text-xs text-accent-copper/40 tracking-widest mt-1 flex-shrink-0">{item.num}</span>
                  <p className="font-serif italic text-text-primary text-xl md:text-2xl leading-relaxed">
                    {item.line}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      {/* ─── FOOD GALLERY ─── */}
      <section className="px-4 md:px-8 pb-24">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Large landscape */}
          <motion.div
            className="col-span-2 overflow-hidden relative group"
            style={{ aspectRatio: '16/9' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src={IMG_FOOD1} alt="Turkish food" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Portrait */}
          <motion.div
            className="overflow-hidden relative group"
            style={{ aspectRatio: '4/5' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src={IMG_FOOD2} alt="Meze platter" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
          </motion.div>

          {/* Square */}
          <motion.div
            className="overflow-hidden relative group"
            style={{ aspectRatio: '1/1' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src={IMG_FOOD3} alt="Grilled pide" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
          </motion.div>

          {/* Wide cinematic */}
          <motion.div
            className="col-span-2 overflow-hidden relative group"
            style={{ aspectRatio: '21/9' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src={IMG_FOOD4} alt="Turkish cuisine spread" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
          </motion.div>

          {/* ── NEW ADDITIONS ── */}

          {/* Row 3: Pide wide (2 cols) + Kofte square (1 col) + Chicken square (1 col) */}
          <motion.div
            className="col-span-2 overflow-hidden relative group"
            style={{ aspectRatio: '16/9' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src="/food-pide.png" alt="Turkish pide on wooden board" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div
            className="overflow-hidden relative group"
            style={{ aspectRatio: '1/1' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src="/food-kofte.png" alt="Köfte in cast iron skillet" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div
            className="overflow-hidden relative group"
            style={{ aspectRatio: '1/1' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src="/food-chicken.png" alt="Chicken shish with rice and salad" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Row 4: Lamb chops full width */}
          <motion.div
            className="col-span-2 md:col-span-4 overflow-hidden relative group"
            style={{ aspectRatio: '21/9' }}
            variants={{ hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <img src="/food-lamb.png" alt="Lamb chops with bulgur and salad" className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/menu"
            className="font-sans font-semibold uppercase tracking-label text-sm text-accent-copper hover:text-accent-gold transition-colors duration-300 inline-flex items-center gap-3 group"
          >
            <span>View Our Full Menu</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >→</motion.span>
          </Link>
        </motion.div>
      </section>

      {/* ─── BOOKING PROMPT ─── */}
      <BookingPrompt />

      {/* ─── INSTAGRAM ─── */}
      <section className="py-20 overflow-hidden">
        <motion.div
          className="text-center mb-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label">@michoturkishbargrill</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {[IMG_IG1, IMG_IG2, IMG_IG3, IMG_IG4, IMG_IG5, IMG_IG6].map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/michoturkishbargrill"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group block"
              style={{ aspectRatio: '1/1' }}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
              whileHover={{ scale: 1.03, zIndex: 2 }}
            >
              <img
                src={src}
                alt="Instagram post"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 group-hover:brightness-75"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                >
                  <svg className="w-7 h-7 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </motion.main>
  )
}
