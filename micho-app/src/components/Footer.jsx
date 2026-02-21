import React from 'react'
import { Link } from 'react-router-dom'
import { neighbourhoods } from '../data/neighbourhoods'

const footerLinks = [
  { label: 'Welcome', to: '/' },
  { label: 'Our Menu', to: '/menu' },
  { label: 'Our Story', to: '/about' },
  { label: 'Collection', to: '/collection' },
  { label: 'Reservations', to: '/reservations' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/michoturkishbarandgrill' },
  { label: 'Facebook', href: 'https://facebook.com/michoturkishbarandgrill' },
]

export default function Footer() {
  return (
    <footer
      className="pb-20"
      style={{ background: '#0A0908', borderTop: '1px solid rgba(196,122,59,0.1)' }}
    >
      <div className="max-w-screen-xl mx-auto px-6 pt-16">
        {/* Top section */}
        <div className="grid md:grid-cols-3 gap-12 pb-14 border-b border-text-primary/5">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-serif text-3xl font-light text-text-primary tracking-widest hover:text-accent-copper transition-colors duration-300 block mb-4"
            >
              MICHO
            </Link>
            <p className="font-serif italic text-text-muted text-sm mb-6">
              A family table open to everyone
            </p>
            <p className="font-sans text-text-muted text-xs leading-relaxed">
              Authentic Turkish Bar &amp; Grill<br />
              200 Crookes, Sheffield, S10 1TG
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-label text-accent-copper mb-6">
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-sans text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-label text-accent-copper mb-6">
              Get In Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+441143492043"
                className="font-sans text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                +44 114 349 2043
              </a>
              <a
                href="mailto:info@michoturkishbarandgrill.co.uk"
                className="font-sans text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                info@michoturkishbarandgrill.co.uk
              </a>
              <div className="flex gap-5 mt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs font-semibold uppercase tracking-label text-text-muted hover:text-accent-copper transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Opening hours strip */}
          <div className="py-8 border-b border-text-primary/5 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {[
                { d: 'Mon–Thu', h: '12:00–22:00' },
                { d: 'Fri–Sat', h: '12:00–23:00' },
                { d: 'Sunday', h: '13:00–21:00' },
              ].map((row) => (
                <div key={row.d} className="flex items-center gap-3">
                  <span className="font-sans text-xs font-semibold uppercase tracking-label text-text-muted">{row.d}</span>
                  <span className="font-sans text-xs text-text-muted">{row.h}</span>
                  <span className="w-px h-3 bg-text-primary/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Neighbourhood SEO links */}
          <div className="py-10 border-b border-text-primary/5">
            <p className="font-sans text-xs font-semibold uppercase tracking-label text-accent-copper mb-6">
              Turkish food nearby?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-3">
              {neighbourhoods.map((n) => (
                <Link
                  key={n.slug}
                  to={n.path}
                  className="font-sans text-xs text-text-muted/70 hover:text-accent-copper transition-colors duration-200 truncate"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-text-muted/50">
              © {new Date().getFullYear()} Micho Turkish Bar &amp; Grill. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="font-sans text-xs text-text-muted/50">Sheffield, South Yorkshire</span>
              <Link
                to="/sitemap"
                className="font-sans text-xs text-text-muted/50 hover:text-accent-copper transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
      </div>
    </footer>
  )
}
