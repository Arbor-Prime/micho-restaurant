import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function BookingPrompt() {
  return (
    <section
      className="py-32 px-6 text-center"
      style={{ background: '#1A1816' }}
    >
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="section-label">Reservations</p>
        <h2 className="section-headline text-4xl md:text-5xl mb-6">Reserve your table</h2>
        <p className="text-text-muted font-sans text-base mb-10">
          Experience authentic Turkish dining in the heart of Crookes, Sheffield.
        </p>
        <Link
          to="/reservations"
          className="btn-copper inline-block"
        >
          Book Now
        </Link>
      </motion.div>
    </section>
  )
}
