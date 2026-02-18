import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const navLinks = [
  { label: 'Welcome', to: '/' },
  { label: 'Our Menu', to: '/menu' },
  { label: 'Our Story', to: '/about' },
  { label: 'Collection', to: '/collection' },
  { label: 'Reservations', to: '/reservations' },
]

const connectLinks = [
  { label: 'Contact Us', to: 'mailto:info@michoturkishbarandgrill.co.uk', external: true },
  { label: 'Instagram', to: 'https://instagram.com/michoturkishbarandgrill', external: true },
  { label: 'Facebook', to: 'https://facebook.com/michoturkishbarandgrill', external: true },
  { label: '+44 114 349 2043', to: 'tel:+441143492043', external: true },
]

function NavOverlay({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(26, 24, 22, 0.98)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <div className="flex justify-between items-center px-8 py-6">
            <Link to="/" onClick={onClose}>
              <span className="font-serif text-2xl font-light text-text-primary tracking-widest">MICHO</span>
            </Link>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Book Now prominent */}
          <motion.div
            className="px-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Link
              to="/reservations"
              onClick={onClose}
              className="inline-block bg-accent-copper text-bg-primary font-sans font-semibold uppercase tracking-label text-sm px-8 py-4 hover:bg-accent-gold transition-all duration-300"
            >
              Book Now
            </Link>
          </motion.div>

          {/* Links columns */}
          <div className="flex-1 px-8 flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Pages */}
            <div>
              <p className="section-label mb-8">Pages</p>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="font-serif font-light text-4xl md:text-5xl text-text-primary hover:text-accent-copper transition-colors duration-300 block leading-tight py-1"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <p className="section-label mb-8">Connect</p>
              <nav className="flex flex-col gap-2">
                {connectLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  >
                    {link.external ? (
                      <a
                        href={link.to}
                        target={link.to.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-sans font-light text-xl text-text-muted hover:text-text-primary transition-colors duration-300 block py-1"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="font-sans font-light text-xl text-text-muted hover:text-text-primary transition-colors duration-300 block py-1"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom address */}
          <motion.div
            className="px-8 py-8 border-t border-text-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-sans text-text-muted text-sm">200 Crookes, Sheffield, S10 1TG</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOverlayOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(26, 24, 22, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(196, 122, 59, 0.1)' : 'none',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-light text-text-primary hover:text-accent-copper transition-colors duration-300 tracking-widest">
            MICHO
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-sans text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOverlayOpen(true)}
            className="flex flex-col gap-1.5 p-2 hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-text-primary transition-all duration-300" />
            <span className="block w-4 h-px bg-accent-copper transition-all duration-300" />
            <span className="block w-6 h-px bg-text-primary transition-all duration-300" />
          </button>
        </div>
      </header>

      <NavOverlay isOpen={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  )
}
