import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const IMG_HERO = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'

const openingHours = [
  { day: 'Monday', hours: '12:00 – 22:00' },
  { day: 'Tuesday', hours: '12:00 – 22:00' },
  { day: 'Wednesday', hours: '12:00 – 22:00' },
  { day: 'Thursday', hours: '12:00 – 22:00' },
  { day: 'Friday', hours: '12:00 – 23:00' },
  { day: 'Saturday', hours: '12:00 – 23:00' },
  { day: 'Sunday', hours: '13:00 – 21:00' },
]

function SuccessMessage({ name }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <CheckCircle size={56} className="text-accent-copper mb-6" strokeWidth={1.5} />
      <h3 className="font-serif font-light text-text-primary text-3xl mb-4">
        Booking request received
      </h3>
      <p className="font-sans text-text-muted text-base max-w-sm leading-relaxed">
        Thank you, {name}. We'll confirm your reservation by email or phone within 2 hours.
        We look forward to welcoming you to Micho.
      </p>
      <div className="w-12 h-px bg-accent-copper/40 mt-10" />
      <p className="font-sans text-text-muted text-sm mt-6">
        Can't wait? Call us on{' '}
        <a href="tel:+441143492043" className="text-accent-copper hover:text-accent-gold transition-colors">
          +44 114 349 2043
        </a>
      </p>
    </motion.div>
  )
}

function ReservationsHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex items-end justify-start overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.2 }}>
        <img src={IMG_HERO} alt="Micho dining room" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,14,12,0.1), rgba(15,14,12,0.9))' }} />
      </motion.div>
      <motion.div className="relative z-10 px-8 md:px-14 pb-16 max-w-3xl" style={{ opacity }}>
        <motion.p className="section-label" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22,1,0.36,1] }}>
          Reservations
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-text-primary leading-none"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Book your table
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-accent-copper"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            at Micho
          </motion.h1>
        </div>
        <motion.div className="w-20 h-px bg-accent-copper mt-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.0, duration: 0.8 }} />
      </motion.div>
    </section>
  )
}

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(data) {
    // Simulate a short submission delay
    await new Promise((r) => setTimeout(r, 900))
    setSubmittedName(data.firstName)
    setSubmitted(true)
  }

  // Generate today + 90 days of valid dates
  const today = new Date()
  const minDate = today.toISOString().split('T')[0]
  const maxDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      <Helmet>
        <title>Reservations | Micho Turkish Bar &amp; Grill Sheffield</title>
        <meta name="description" content="Book a table at Micho Turkish Bar & Grill in Sheffield. Reserve online or call +44 114 349 2043. Authentic Turkish dining in Crookes, Sheffield." />
      </Helmet>

      {/* Hero */}
        <ReservationsHero />

      {/* Main content */}
      <section className="py-20 px-6">
        <div className="max-w-screen-lg mx-auto grid lg:grid-cols-[1fr_400px] gap-16 items-start">

          {/* Form */}
          <div>
            <ScrollReveal>
              <p className="section-label">Reserve Online</p>
              <h2 className="font-serif font-light text-text-primary text-3xl md:text-4xl mb-10">
                Request a reservation
              </h2>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessMessage key="success" name={submittedName} />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Name row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        First Name *
                      </label>
                      <input
                        className="form-input"
                        placeholder="Jane"
                        {...register('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Last Name *
                      </label>
                      <input
                        className="form-input"
                        placeholder="Smith"
                        {...register('lastName', { required: 'Last name is required' })}
                      />
                      {errors.lastName && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="jane@example.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                        })}
                      />
                      {errors.email && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+44 7700 000000"
                        {...register('phone', { required: 'Phone number is required' })}
                      />
                      {errors.phone && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Date & time */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        className="form-input"
                        min={minDate}
                        max={maxDate}
                        {...register('date', { required: 'Please select a date' })}
                      />
                      {errors.date && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.date.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Preferred Time *
                      </label>
                      <select
                        className="form-input appearance-none cursor-pointer"
                        {...register('time', { required: 'Please select a time' })}
                      >
                        <option value="">Select time</option>
                        {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                          '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.time.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Party size */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Number of Guests *
                      </label>
                      <select
                        className="form-input appearance-none cursor-pointer"
                        {...register('guests', { required: 'Please select number of guests' })}
                      >
                        <option value="">Select guests</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                        ))}
                        <option value="9+">9+ guests (please call us)</option>
                      </select>
                      {errors.guests && (
                        <p className="font-sans text-xs text-red-400 mt-1">{errors.guests.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                        Occasion
                      </label>
                      <select
                        className="form-input appearance-none cursor-pointer"
                        {...register('occasion')}
                      >
                        <option value="">No special occasion</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="business">Business meal</option>
                        <option value="date">Date night</option>
                        <option value="other">Other celebration</option>
                      </select>
                    </div>
                  </div>

                  {/* Special requests */}
                  <div>
                    <label className="block font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-2">
                      Special Requests or Dietary Requirements
                    </label>
                    <textarea
                      className="form-input resize-none"
                      rows={4}
                      placeholder="Let us know about any allergies, dietary requirements, or special requests..."
                      {...register('notes')}
                    />
                  </div>

                  <p className="font-sans text-xs text-text-muted leading-relaxed">
                    * Required fields. We'll confirm your booking by email or phone. For parties of 9+, please call us directly on{' '}
                    <a href="tel:+441143492043" className="text-accent-copper hover:text-accent-gold transition-colors">
                      +44 114 349 2043
                    </a>.
                  </p>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-copper inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        'Request Reservation'
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar info */}
          <div className="flex flex-col gap-10">
            {/* Opening hours */}
            <ScrollReveal>
              <div style={{ background: '#1A1816' }} className="p-8">
                <p className="section-label mb-6">Opening Hours</p>
                <div className="flex flex-col gap-3">
                  {openingHours.map((row) => {
                    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' })
                    const isToday = row.day === today
                    return (
                      <div
                        key={row.day}
                        className="flex justify-between items-center font-sans text-sm"
                        style={{
                          color: isToday ? '#F5F0E8' : '#A89F94',
                        }}
                      >
                        <span className={isToday ? 'font-semibold' : ''}>{row.day}</span>
                        <span className={isToday ? 'text-accent-copper font-semibold' : ''}>{row.hours}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal delay={0.1}>
              <div style={{ background: '#1A1816' }} className="p-8">
                <p className="section-label mb-6">Contact &amp; Location</p>
                <div className="flex flex-col gap-4 font-sans text-sm text-text-muted">
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Address</p>
                    <p>200 Crookes</p>
                    <p>Sheffield, S10 1TG</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Phone</p>
                    <a
                      href="tel:+441143492043"
                      className="hover:text-accent-copper transition-colors"
                    >
                      +44 114 349 2043
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Email</p>
                    <a
                      href="mailto:info@michoturkishbarandgrill.co.uk"
                      className="hover:text-accent-copper transition-colors break-all"
                    >
                      info@michoturkishbarandgrill.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Note */}
            <ScrollReveal delay={0.15}>
              <div className="border-l-2 border-accent-copper/40 pl-5">
                <p className="font-sans text-text-muted text-sm leading-relaxed">
                  For large group bookings (10+) or private dining enquiries, please call us directly. We'd love to create a bespoke experience for your occasion.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-6 pb-10">
        <div className="max-w-screen-lg mx-auto">
          <ScrollReveal>
            <a
              href="https://maps.google.com/?q=200+Crookes+Sheffield+S10+1TG"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden group"
              style={{ height: '280px', background: '#1A1816' }}
            >
              <iframe
                title="Micho location"
                src="https://maps.google.com/maps?q=200+Crookes+Sheffield+S10+1TG&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(80%) invert(10%) brightness(0.8)' }}
                allowFullScreen=""
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: '1px solid rgba(196,122,59,0.2)' }}
              />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </motion.main>
  )
}
