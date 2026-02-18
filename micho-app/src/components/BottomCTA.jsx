import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function BottomCTA() {
  const location = useLocation()

  return (
    <motion.div
      className="booking-bar fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background: 'rgba(26, 24, 22, 0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(196, 122, 59, 0.3)',
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/menu"
        className="flex-1 flex items-center justify-center py-4 text-text-primary font-sans font-semibold uppercase tracking-label text-sm transition-all duration-300 hover:text-accent-copper"
        style={{ borderRight: '1px solid rgba(196, 122, 59, 0.2)' }}
      >
        Menu
      </Link>
      <Link
        to="/reservations"
        className="flex-1 flex items-center justify-center py-4 bg-accent-copper text-bg-primary font-sans font-semibold uppercase tracking-label text-sm transition-all duration-300 hover:bg-accent-gold"
      >
        Book Now
      </Link>
    </motion.div>
  )
}
