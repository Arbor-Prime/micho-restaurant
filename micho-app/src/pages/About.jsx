import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import BookingPrompt from '../components/BookingPrompt'

const IMG_HERO     = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80'
const IMG_STORY1   = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80'
const IMG_STORY2   = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80'
const IMG_INTERIOR = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'

const values = [
  { label: 'Authenticity', text: 'Every recipe is rooted in Turkish culinary tradition. We source ingredients that honour the flavours of Anatolia — from hand-selected spices to the wood that fuels our charcoal grill.' },
  { label: 'Family',       text: "Micho was born from a family's love of cooking and sharing. That spirit lives in every dish — generous portions, warm service, and a table that always has room for one more." },
  { label: 'Craft',        text: 'Over 25 years of honing techniques passed down through generations. Our köfte is hand-shaped, our börek is hand-rolled, and our grill is tended with the care it deserves.' },
  { label: 'Community',    text: "Rooted in Sheffield's Crookes neighbourhood, we are proud to be part of the fabric of this city. Our guests are our community — and community is why we cook." },
]

const timeline = [
  { year: '1999', event: "Micho opens on Crookes, Sheffield. A small kitchen, a charcoal grill, and a family's dream." },
  { year: '2005', event: "Word of mouth grows. The dining room expands to welcome Sheffield's growing appetite for authentic Turkish cuisine." },
  { year: '2012', event: 'Second-generation family members join the kitchen, bringing new energy while preserving every beloved recipe.' },
  { year: '2018', event: 'Full bar added, and the menu evolves — new desserts, fresh cocktails, and a refined dining experience.' },
  { year: '2024', event: 'Micho enters its 25th year. The charcoal still glows. The family still cooks. The welcome never changes.' },
]

function ParallaxHero({ src }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex items-end justify-start overflow-hidden" style={{ height: '72vh', minHeight: '480px' }}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.2 }}>
        <img src={src} alt="Micho restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,14,12,0.75) 0%, rgba(15,14,12,0.3) 55%, rgba(15,14,12,0.8) 100%)' }} />
      </motion.div>

      <motion.div className="relative z-10 px-8 md:px-16 pb-20 max-w-3xl" style={{ opacity }}>
        <motion.p className="section-label" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.22,1,0.36,1] }}>
          Our Story
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-text-primary leading-none"
            style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            A family table
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-accent-copper leading-tight"
            style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.45, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            open to everyone
          </motion.h1>
        </div>
        <motion.div className="w-20 h-px bg-accent-copper mt-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.8 }} />
      </motion.div>
    </section>
  )
}

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      <Helmet>
        <title>Our Story | Micho Turkish Bar &amp; Grill Sheffield</title>
        <meta name="description" content="25 years of authentic Turkish cuisine in Sheffield. Discover the story behind Micho — a family restaurant rooted in Anatolian tradition, craft, and community." />
      </Helmet>

      <ParallaxHero src={IMG_HERO} />

      {/* Opening quote */}
      <section className="py-36 px-6">
        <div className="max-w-[700px] mx-auto">
          <ScrollReveal direction="up" distance={80} duration={1.2}>
            <p className="font-serif font-light text-text-primary text-2xl md:text-4xl leading-relaxed mb-12" style={{ borderLeft: '2px solid #C47A3B', paddingLeft: '1.5rem' }}>
              "We didn't open a restaurant. We opened our home — and invited the whole of Sheffield in."
            </p>
          </ScrollReveal>
          {['Micho Turkish Bar & Grill has been part of Sheffield\'s Crookes neighbourhood since 1999. What began as a small family venture — a charcoal grill, a handful of recipes passed down through generations, and an unwavering belief in the power of a shared meal — has grown into one of the city\'s most beloved dining destinations.',
            'Every dish that leaves our kitchen carries the weight of that original promise: to cook honestly, to serve generously, and to make every guest feel like they\'ve come home.'
          ].map((text, i) => (
            <ScrollReveal key={i} direction="up" distance={50} delay={0.1 + i * 0.15} duration={1.1}>
              <p className="font-sans text-text-muted text-base md:text-lg leading-relaxed mb-6">{text}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Two-column: image left, text right */}
      <section className="grid md:grid-cols-2 gap-0 mb-0">
        <ScrollReveal direction="left" distance={80} duration={1.3} className="overflow-hidden" style={{ minHeight: '480px' }}>
          <motion.img
            src={IMG_STORY1}
            alt="Turkish cooking"
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8 }}
            style={{ minHeight: '480px', objectFit: 'cover', display: 'block' }}
          />
        </ScrollReveal>
        <div className="flex flex-col justify-center px-12 py-20" style={{ background: '#1A1816' }}>
          <ScrollReveal direction="right" distance={60} duration={1.2}>
            <p className="section-label">The Craft</p>
            <h2 className="font-serif font-light text-text-primary text-4xl md:text-5xl mb-8 leading-tight">
              Fire, patience,<br />and tradition
            </h2>
            <p className="font-sans text-text-muted text-base leading-relaxed mb-6">
              Our charcoal grill is the heart of Micho. It burns through every service, tended by hands that have spent decades perfecting the art of live-fire cooking. The smoke, the sear, the char — these are not techniques you can replicate. They are the result of time, care, and an uncompromising respect for the ingredient.
            </p>
            <p className="font-sans text-text-muted text-base leading-relaxed">
              Beyond the grill, our kitchen is a place of daily ritual: börek pastry rolled at dawn, meze prepared fresh before each service, bread baked to order. Nothing at Micho comes from a packet. Everything comes from our hands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Two-column: text left, image right */}
      <section className="grid md:grid-cols-2 gap-0">
        <div className="flex flex-col justify-center px-12 py-20 order-2 md:order-1" style={{ background: '#221F1B' }}>
          <ScrollReveal direction="left" distance={60} duration={1.2}>
            <p className="section-label">The Heritage</p>
            <h2 className="font-serif font-light text-text-primary text-4xl md:text-5xl mb-8 leading-tight">
              Anatolia on<br />your plate
            </h2>
            <p className="font-sans text-text-muted text-base leading-relaxed mb-6">
              Turkish cuisine is one of the world's great culinary traditions — rich, diverse, and deeply regional. Our menu draws from across Anatolia: the kebabs of Gaziantep, the meze culture of the Aegean coast, the börek traditions of Istanbul, and the slow-cooked güveç of the Black Sea highlands.
            </p>
            <p className="font-sans text-text-muted text-base leading-relaxed">
              We honour these traditions not by freezing them in time, but by bringing them alive — freshly, daily, for every guest who sits at our table.
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal direction="right" distance={80} duration={1.3} className="overflow-hidden order-1 md:order-2" style={{ minHeight: '480px' }}>
          <motion.img
            src={IMG_STORY2}
            alt="Restaurant kitchen"
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8 }}
            style={{ minHeight: '480px', objectFit: 'cover', display: 'block' }}
          />
        </ScrollReveal>
      </section>

      {/* Full-bleed interior with parallax */}
      <section className="relative overflow-hidden w-full" style={{ height: 'clamp(300px, 48vw, 620px)' }}>
        <InteriorParallax src={IMG_INTERIOR} />
      </section>

      {/* Values */}
      <section className="py-36 px-6">
        <div className="max-w-screen-lg mx-auto">
          <ScrollReveal direction="up" distance={70} duration={1.1}>
            <div className="text-center mb-24">
              <p className="section-label">What We Stand For</p>
              <h2 className="font-serif font-light text-text-primary text-5xl md:text-6xl">Our values</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-14 md:gap-20">
            {values.map((v, i) => (
              <ScrollReveal key={v.label} direction={i % 2 === 0 ? 'left' : 'right'} distance={60} delay={i * 0.12} duration={1.1}>
                <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                  <motion.div
                    className="h-px bg-accent-copper mb-6"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12 }}
                    style={{ width: '48px' }}
                  />
                  <h3 className="font-serif font-light text-text-primary text-2xl md:text-3xl mb-4">{v.label}</h3>
                  <p className="font-sans text-text-muted text-base leading-relaxed">{v.text}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6" style={{ background: '#1A1816' }}>
        <div className="max-w-screen-md mx-auto">
          <ScrollReveal direction="up" distance={60} duration={1.1}>
            <div className="text-center mb-20">
              <p className="section-label">25 Years</p>
              <h2 className="font-serif font-light text-text-primary text-5xl md:text-6xl">Our journey</h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <motion.div
              className="absolute left-8 top-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,122,59,0.4), transparent)', originY: 0 }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="flex flex-col gap-14">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} direction="right" distance={70} delay={i * 0.13} duration={1.1}>
                  <div className="flex gap-8 items-start pl-0">
                    <div className="flex-shrink-0 w-16 flex flex-col items-center">
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full mt-1.5"
                        style={{ background: '#C47A3B', marginLeft: '26px' }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.13, duration: 0.5, type: 'spring', stiffness: 300 }}
                      />
                    </div>
                    <div className="flex-1" style={{ marginLeft: '-8px' }}>
                      <p className="font-serif text-accent-copper text-2xl mb-2">{item.year}</p>
                      <p className="font-sans text-text-muted text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find Us */}
      <section className="py-36 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <ScrollReveal direction="scale" duration={1.2}>
            <p className="section-label">Find Us</p>
            <h2 className="font-serif font-light text-text-primary text-5xl md:text-6xl mb-10">Come and eat with us</h2>
            <div className="flex flex-col gap-3 text-text-muted font-sans text-base mb-12">
              <p>200 Crookes, Sheffield, S10 1TG</p>
              <p><a href="tel:+441143492043" className="hover:text-accent-copper transition-colors duration-300">+44 114 349 2043</a></p>
              <p><a href="mailto:info@michoturkishbarandgrill.co.uk" className="hover:text-accent-copper transition-colors duration-300">info@michoturkishbarandgrill.co.uk</a></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservations" className="btn-copper inline-block">Book a Table</Link>
              <Link to="/menu" className="btn-outline inline-block">View Menu</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <BookingPrompt />
    </motion.main>
  )
}

// Separate component to avoid hook-in-conditional error
function InteriorParallax({ src }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div ref={ref} className="relative overflow-hidden w-full h-full">
      <motion.div className="absolute inset-0" style={{ y, scale: 1.25 }}>
        <img src={src} alt="Micho interior" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'rgba(15,14,12,0.45)' }} />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <ScrollReveal direction="scale" duration={1.3}>
          <p className="font-serif font-light text-text-primary text-3xl md:text-5xl lg:text-6xl text-center px-6 leading-tight">
            200 Crookes, Sheffield S10 1TG
          </p>
        </ScrollReveal>
      </div>
    </div>
  )
}
