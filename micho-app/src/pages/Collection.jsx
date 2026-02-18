import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const IMG_HERO = 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=80'
const IMG_PACK1 = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
const IMG_PACK2 = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
const IMG_PACK3 = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'

const collectionMenu = [
  {
    category: 'Kebab Boxes',
    items: [
      { name: 'Adana Kebab Box', description: 'Minced lamb, salad, bulgur, pitta', price: 12.95 },
      { name: 'Chicken Şiş Box', description: 'Marinated chicken cubes, salad, bulgur, pitta', price: 12.95 },
      { name: 'Lamb Şiş Box', description: 'Marinated lamb cubes, salad, bulgur, pitta', price: 13.95 },
      { name: 'Mixed Grill Box', description: 'Adana, chicken şiş, lamb şiş, salad, bulgur, pitta', price: 17.95 },
      { name: 'Köfte Box', description: 'House meatballs, tomato sauce, salad, bulgur, pitta', price: 12.95 },
    ],
  },
  {
    category: 'Pide & Pizza',
    items: [
      { name: 'Kuşbaşılı Pide', description: 'Diced lamb, tomato, peppers, mozzarella', price: 13.95 },
      { name: 'Sucuklu Pide', description: 'Turkish sausage, mozzarella', price: 11.00 },
      { name: 'Mixed Meat Pizza', description: 'Pastrami, sucuk, chicken, double mozzarella', price: 14.50 },
      { name: 'Four Cheese Pizza', description: 'Mozzarella, gorgonzola, parmesan, cheddar', price: 11.50 },
    ],
  },
  {
    category: 'Family Sharing',
    items: [
      { name: 'Family Grill for 2', description: 'Mixed grill + 2 meze + salad + bulgur + 2 pitta', price: 52.00 },
      { name: 'Family Grill for 4', description: 'Large mixed grill + 4 meze + salad + bulgur + 4 pitta', price: 98.00 },
      { name: 'Meze Platter', description: '6 cold & hot meze with bread basket', price: 22.00 },
    ],
  },
  {
    category: 'Sides & Extras',
    items: [
      { name: 'Chips / Fries', description: 'Crispy golden fries', price: 3.50 },
      { name: 'Bulgur Wheat', description: 'Buttered bulgur wheat', price: 3.50 },
      { name: 'House Salad', description: 'Fresh seasonal salad', price: 4.50 },
      { name: 'Extra Pitta', description: 'Two freshly baked pitta', price: 2.00 },
      { name: 'Baklava (2pc)', description: 'Pistachio honey baklava', price: 4.50 },
    ],
  },
]

const faqs = [
  {
    q: 'How do I place a collection order?',
    a: 'Call us on +44 114 349 2043 or email info@michoturkishbarandgrill.co.uk. We ask for at least 30 minutes notice for most orders, and 2 hours notice for family sharing platters.',
  },
  {
    q: 'What are your collection hours?',
    a: 'Collection is available during all our opening hours: Monday–Thursday 12pm–10pm, Friday–Saturday 12pm–11pm, Sunday 1pm–9pm.',
  },
  {
    q: 'Do you offer delivery?',
    a: 'We currently offer collection only, ensuring every dish reaches you at its very best. We are exploring delivery options for the future.',
  },
  {
    q: 'Can I pre-order for a specific time?',
    a: 'Yes — we encourage it. When you call, simply tell us when you\'d like to collect and we\'ll have everything freshly prepared and ready.',
  },
  {
    q: 'Are allergen details available?',
    a: 'Absolutely. Please inform us of any allergies or dietary requirements when ordering. Full allergen information is available on request.',
  },
]

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-text-primary/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left gap-4"
      >
        <span className="font-sans font-medium text-text-primary text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-accent-copper"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="font-sans text-text-muted text-sm leading-relaxed pb-5">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CollectionHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex items-end justify-start overflow-hidden" style={{ height: '58vh', minHeight: '380px' }}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.2 }}>
        <img src={IMG_HERO} alt="Micho collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,14,12,0.15), rgba(15,14,12,0.9))' }} />
      </motion.div>
      <motion.div className="relative z-10 px-8 md:px-14 pb-16 max-w-3xl" style={{ opacity }}>
        <motion.p className="section-label" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22,1,0.36,1] }}>
          Click &amp; Collect
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-text-primary leading-none"
            style={{ fontSize: 'clamp(40px, 7vw, 84px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Freshly grilled,
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-serif font-light text-accent-copper"
            style={{ fontSize: 'clamp(40px, 7vw, 84px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            ready to collect
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}>
          <a href="tel:+441143492043" className="btn-copper inline-block">Call to Order</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function Collection() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      <Helmet>
        <title>Collection | Micho Turkish Bar &amp; Grill Sheffield</title>
        <meta name="description" content="Order Micho's authentic Turkish food for collection. Kebab boxes, family platters, pide and more — freshly prepared for takeaway from Crookes, Sheffield." />
      </Helmet>

      {/* Hero */}
        <CollectionHero />

      {/* How it works */}
      <section className="py-24 px-6" style={{ background: '#1A1816' }}>
        <div className="max-w-screen-lg mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">How It Works</p>
              <h2 className="font-serif font-light text-text-primary text-4xl md:text-5xl">Simple as can be</h2>
            </div>
          </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-10">
              {[
                { step: '01', title: 'Browse & Choose', desc: 'Pick from our collection menu below — kebab boxes, pide, pizza, family platters, or sides.' },
                { step: '02', title: 'Call or Email', desc: 'Contact us on +44 114 349 2043 or email us. Let us know what you\'d like and your collection time.' },
                { step: '03', title: 'Collect Fresh', desc: 'Come to 200 Crookes, Sheffield. Your food will be freshly prepared and waiting for you.' },
              ].map((item, i) => (
                <ScrollReveal key={item.step} direction="up" distance={70} delay={i * 0.15} duration={1.1}>
                  <motion.div className="flex flex-col" whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
                    <motion.span
                      className="font-serif text-accent-copper/30 text-7xl leading-none mb-4"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
                    >
                      {item.step}
                    </motion.span>
                    <h3 className="font-sans font-semibold text-text-primary text-lg mb-3">{item.title}</h3>
                    <p className="font-sans text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      {/* Feature images strip */}
      <motion.section
        className="grid grid-cols-3 gap-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {[IMG_PACK1, IMG_PACK2, IMG_PACK3].map((src, i) => (
          <motion.div
            key={i}
            className="overflow-hidden relative group"
            style={{ aspectRatio: '4/3' }}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22,1,0.36,1] } } }}
          >
            <img src={src} alt="Micho food" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.section>

      {/* Collection menu */}
      <section className="py-24 px-6">
        <div className="max-w-screen-md mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <p className="section-label">Collection Menu</p>
              <h2 className="font-serif font-light text-text-primary text-4xl md:text-5xl">What's on offer</h2>
            </div>
          </ScrollReveal>
          {collectionMenu.map((section, si) => (
            <div key={section.category} className="mb-14">
              <ScrollReveal delay={0.05}>
                <h3 className="font-serif font-light text-text-primary text-2xl mb-6 pb-3 border-b border-text-primary/10">
                  {section.category}
                </h3>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div>
                  {section.items.map((item, i) => (
                    <div key={i} className="menu-item-row">
                      <div className="flex-1 min-w-0">
                        <span className="font-sans font-medium text-text-primary text-base">{item.name}</span>
                        {item.description && (
                          <p className="font-sans text-text-muted text-sm mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <span className="font-sans font-medium text-text-primary text-base flex-shrink-0 ml-6">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          ))}
          <ScrollReveal delay={0.1}>
            <p className="font-sans text-xs text-text-muted mt-4">
              Prices include all packaging. All dishes freshly prepared to order. Allergen information available on request.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-20 px-6 text-center" style={{ background: '#1A1816' }}>
        <ScrollReveal>
          <p className="section-label">Ready to Order?</p>
          <h2 className="font-serif font-light text-text-primary text-4xl md:text-5xl mb-8">
            Give us a call
          </h2>
          <p className="font-sans text-text-muted text-base mb-10">
            Monday–Thursday 12pm–10pm &nbsp;·&nbsp; Friday–Saturday 12pm–11pm &nbsp;·&nbsp; Sunday 1pm–9pm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+441143492043" className="btn-copper inline-block">
              +44 114 349 2043
            </a>
            <a href="mailto:info@michoturkishbarandgrill.co.uk" className="btn-outline inline-block">
              Email Us
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-screen-md mx-auto">
          <ScrollReveal>
            <div className="mb-12">
              <p className="section-label">FAQ</p>
              <h2 className="font-serif font-light text-text-primary text-4xl md:text-5xl">Common questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>
              {faqs.map((item, i) => (
                <FaqItem key={i} item={item} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.main>
  )
}
