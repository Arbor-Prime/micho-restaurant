import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const SESSION_KEY = 'micho_promo_dismissed'

export default function PromoBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY)
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-40 left-0 right-0 flex items-center justify-between px-5 py-3 gap-4"
          style={{
            bottom: '57px',
            background: 'rgba(26, 24, 22, 0.96)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(196, 122, 59, 0.3)',
          }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-sm text-text-muted flex-1 min-w-0">
            <span className="text-accent-copper font-semibold">New: </span>
            Citir Beyti — our signature minced meat wrap with yogurt & tomato sauce.{' '}
            <Link to="/reservations" onClick={dismiss} className="text-accent-copper underline hover:text-accent-gold transition-colors">
              Book your table →
            </Link>
          </p>
          <button
            onClick={dismiss}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
