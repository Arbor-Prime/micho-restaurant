import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Turkish tulip SVG silhouette — more detailed
function TulipSVG({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 130 L40 68" stroke="#C47A3B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 100 Q22 88 16 70 Q32 76 40 88" fill="#C47A3B" opacity="0.7" />
      <path d="M40 95 Q58 82 64 64 Q48 72 40 84" fill="#D4A853" opacity="0.55" />
      <path d="M40 12 C35 28 22 40 25 60 C29 72 51 72 55 60 C58 40 45 28 40 12Z" fill="#C47A3B" opacity="0.8" />
      <path d="M40 10 C26 22 16 42 20 60 C23 72 34 74 40 68Z" fill="#D4A853" opacity="0.55" />
      <path d="M40 10 C54 22 64 42 60 60 C57 72 46 74 40 68Z" fill="#6B2D3E" opacity="0.45" />
      <ellipse cx="40" cy="46" rx="4.5" ry="9" fill="#F5F0E8" opacity="0.25" />
    </svg>
  )
}

// İznik tile — richer
function IznikTile({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="120" cy="120" r="112" stroke="#2563EB" strokeWidth="1.2" opacity="0.5" />
      <circle cx="120" cy="120" r="94" stroke="#D4A853" strokeWidth="0.8" opacity="0.4" />
      <circle cx="120" cy="120" r="68" stroke="#2563EB" strokeWidth="0.6" opacity="0.3" />
      <path d="M120 16 L133 84 L200 72 L152 120 L200 168 L133 156 L120 224 L107 156 L40 168 L88 120 L40 72 L107 84 Z"
        stroke="#2563EB" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M56 56 L184 184 M184 56 L56 184" stroke="#D4A853" strokeWidth="0.9" opacity="0.35" />
      <circle cx="120" cy="120" r="16" fill="#2563EB" opacity="0.18" />
      <circle cx="120" cy="120" r="8" fill="#D4A853" opacity="0.28" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx={120 + 55 * Math.cos((angle * Math.PI) / 180)}
          cy={120 + 55 * Math.sin((angle * Math.PI) / 180)}
          rx="11" ry="22"
          transform={`rotate(${angle} ${120 + 55 * Math.cos((angle * Math.PI) / 180)} ${120 + 55 * Math.sin((angle * Math.PI) / 180)})`}
          fill="#2563EB" opacity="0.22"
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <circle
          key={`dot-${i}`}
          cx={120 + 55 * Math.cos((angle * Math.PI) / 180)}
          cy={120 + 55 * Math.sin((angle * Math.PI) / 180)}
          r="4" fill="#D4A853" opacity="0.3"
        />
      ))}
    </svg>
  )
}

// Crescent moon — Ottoman symbol
function CrescentMoon({ style }) {
  return (
    <svg style={style} viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M42 8 C22 12 10 28 10 42 C10 56 22 66 38 66 C28 62 20 54 20 42 C20 26 32 14 48 14 C46 12 44 9 42 8Z"
        fill="#D4A853" opacity="0.6"
      />
      <circle cx="50" cy="20" r="4" fill="#D4A853" opacity="0.5" />
    </svg>
  )
}

// Smoke wisp — more dramatic
function SmokeWisp({ style, color = '#F5F0E8' }) {
  return (
    <svg style={style} viewBox="0 0 50 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 280 C18 250 32 220 22 190 C14 160 28 130 20 100 C12 70 26 45 22 20 C20 10 23 4 25 0"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.2" />
      <path d="M32 280 C36 245 26 215 34 185 C40 155 30 125 36 95 C42 65 32 38 35 12"
        stroke="#C47A3B" strokeWidth="1.8" strokeLinecap="round" opacity="0.1" />
      <path d="M18 260 C14 230 22 200 16 175 C10 150 18 120 12 95"
        stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.08" />
    </svg>
  )
}

// Arabesque spiral
function ArabesqueSvg({ style }) {
  return (
    <svg style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[20, 40, 60, 80, 100].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r} stroke="#D4A853" strokeWidth="0.7" opacity={0.35 - i * 0.05} />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const x1 = 100 + 20 * Math.cos(angle)
        const y1 = 100 + 20 * Math.sin(angle)
        const x2 = 100 + 100 * Math.cos(angle)
        const y2 = 100 + 100 * Math.sin(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C47A3B" strokeWidth="0.6" opacity="0.25" />
      })}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180
        return (
          <circle key={i}
            cx={100 + 60 * Math.cos(angle)}
            cy={100 + 60 * Math.sin(angle)}
            r="3" fill="#D4A853" opacity="0.2"
          />
        )
      })}
    </svg>
  )
}

// Spice particles — more, bigger, varied shapes
function SpiceParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 25 + 18,
      delay: -(Math.random() * 20),
      color: i % 4 === 0 ? '#C47A3B' : i % 4 === 1 ? '#D4A853' : i % 4 === 2 ? '#6B2D3E' : '#F5F0E8',
      tx: (Math.random() - 0.5) * 120,
      ty: (Math.random() - 0.5) * 120,
      shape: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0%' : '20%',
    }))
  )

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.shape,
            backgroundColor: p.color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            animation: `particleDrift ${p.duration}s ${p.delay}s ease-in-out infinite`,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
        />
      ))}
    </>
  )
}

// Orbiting ring element
function OrbitRing({ size, color, duration, delay, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderWidth: '1px',
        opacity,
        right: '-10%',
        top: '30%',
        x: '50%',
        y: '-50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    />
  )
}

export default function FloatingDecorations() {
  const { scrollYProgress } = useScroll()
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* ─── TULIPS ─── */}
      {/* Tulip 1 — top left, large */}
      <motion.div
        className="absolute"
        style={{ top: '8%', left: '1.5%', width: '80px' }}
        animate={{ y: [0, -35, -15, -45, 0], x: [0, 18, 35, 12, 0], rotate: [0, 6, -3, 9, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      >
        <TulipSVG style={{ opacity: 0.13, width: '80px', height: '104px' }} />
      </motion.div>

      {/* Tulip 2 — right side, medium */}
      <motion.div
        className="absolute hidden sm:block"
        style={{ top: '38%', right: '2.5%', width: '65px' }}
        animate={{ y: [0, -28, -50, -20, 0], x: [0, -12, -5, -18, 0], rotate: [0, -5, 4, -8, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut', delay: -12 }}
      >
        <TulipSVG style={{ opacity: 0.10, width: '65px', height: '84px', transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* Tulip 3 — lower left, small */}
      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: '22%', left: '4.5%', width: '50px' }}
        animate={{ y: [0, -25, -10, -40, 0], x: [0, 10, 22, 8, 0], rotate: [0, 4, -6, 10, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut', delay: -22 }}
      >
        <TulipSVG style={{ opacity: 0.09, width: '50px', height: '65px' }} />
      </motion.div>

      {/* Tulip 4 — top right corner, large */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '15%', right: '8%', width: '55px' }}
        animate={{ y: [0, -20, -42, -15, 0], x: [0, -10, -4, -16, 0], rotate: [0, 3, -4, 7, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: -7 }}
      >
        <TulipSVG style={{ opacity: 0.09, width: '55px', height: '71px', transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* ─── CRESCENT MOONS ─── */}
      <motion.div
        className="absolute hidden sm:block"
        style={{ top: '25%', left: '5%' }}
        animate={{ y: [0, -20, -8, -30, 0], rotate: [0, 8, -4, 12, 0], opacity: [0.12, 0.08, 0.14, 0.06, 0.12] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
      >
        <CrescentMoon style={{ width: '50px', height: '58px' }} />
      </motion.div>

      <motion.div
        className="absolute hidden lg:block"
        style={{ bottom: '35%', right: '6%' }}
        animate={{ y: [0, -18, -35, -12, 0], rotate: [0, -6, 3, -10, 0], opacity: [0.1, 0.06, 0.12, 0.04, 0.1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: -14 }}
      >
        <CrescentMoon style={{ width: '40px', height: '46px', transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* ─── İZNIK TILES ─── */}
      {/* Large tile mid-right */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '50%', right: '-6%', width: '360px', height: '360px' }}
        animate={{ y: [0, -25, -10, -38, 0], rotate: [0, 3, -1.5, 4, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: -6 }}
      >
        <IznikTile style={{ opacity: 0.07, width: '360px', height: '360px' }} />
      </motion.div>

      {/* Smaller tile bottom left */}
      <motion.div
        className="absolute hidden xl:block"
        style={{ bottom: '10%', left: '-4%', width: '260px', height: '260px' }}
        animate={{ y: [0, -18, -32, -10, 0], rotate: [0, -2, 1, -3.5, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: -20 }}
      >
        <IznikTile style={{ opacity: 0.055, width: '260px', height: '260px' }} />
      </motion.div>

      {/* ─── ARABESQUE SPINNER ─── */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '5%', right: '15%', width: '180px', height: '180px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <ArabesqueSvg style={{ opacity: 0.06, width: '180px', height: '180px' }} />
      </motion.div>

      <motion.div
        className="absolute hidden xl:block"
        style={{ bottom: '15%', left: '12%', width: '130px', height: '130px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <ArabesqueSvg style={{ opacity: 0.05, width: '130px', height: '130px' }} />
      </motion.div>

      {/* ─── SMOKE WISPS ─── */}
      <motion.div
        className="absolute hidden sm:block"
        style={{ bottom: '10%', left: '0.5%', width: '50px', height: '280px' }}
        animate={{ y: [0, -200], opacity: [0.8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeOut', delay: 0 }}
      >
        <SmokeWisp style={{ width: '50px', height: '280px' }} />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: '8%', right: '1%', width: '40px', height: '240px' }}
        animate={{ y: [0, -180], opacity: [0.7, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeOut', delay: -5 }}
      >
        <SmokeWisp style={{ width: '40px', height: '240px' }} color="#C47A3B" />
      </motion.div>

      <motion.div
        className="absolute hidden lg:block"
        style={{ bottom: '5%', left: '25%', width: '35px', height: '200px' }}
        animate={{ y: [0, -160], opacity: [0.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeOut', delay: -3 }}
      >
        <SmokeWisp style={{ width: '35px', height: '200px' }} />
      </motion.div>

      {/* ─── HORIZONTAL GOLDEN LINES ─── */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '20%', left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent 0%, rgba(196,122,59,0.08) 30%, rgba(212,168,83,0.12) 50%, rgba(196,122,59,0.08) 70%, transparent 100%)' }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: '70%', left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent 0%, rgba(196,122,59,0.06) 40%, rgba(212,168,83,0.10) 50%, rgba(196,122,59,0.06) 60%, transparent 100%)' }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* ─── CORNER ORNAMENTS ─── */}
      <motion.div
        className="absolute top-0 left-0 hidden md:block"
        style={{ width: '120px', height: '120px' }}
        animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '120px', height: '120px' }}>
          <path d="M0 0 L120 0 L120 20 Q60 20 20 60 L0 60 Z" fill="#C47A3B" opacity="0.08" />
          <path d="M0 0 L0 120 L20 120 Q20 60 60 20 L60 0 Z" fill="#D4A853" opacity="0.06" />
          <path d="M30 0 Q30 30 0 30" stroke="#C47A3B" strokeWidth="0.8" opacity="0.2" />
          <path d="M60 0 Q60 60 0 60" stroke="#C47A3B" strokeWidth="0.6" opacity="0.12" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 hidden md:block"
        style={{ width: '120px', height: '120px', transform: 'scaleX(-1)' }}
        animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '120px', height: '120px' }}>
          <path d="M0 0 L120 0 L120 20 Q60 20 20 60 L0 60 Z" fill="#C47A3B" opacity="0.08" />
          <path d="M0 0 L0 120 L20 120 Q20 60 60 20 L60 0 Z" fill="#D4A853" opacity="0.06" />
          <path d="M30 0 Q30 30 0 30" stroke="#C47A3B" strokeWidth="0.8" opacity="0.2" />
        </svg>
      </motion.div>

      {/* ─── SPICE PARTICLES ─── */}
      <SpiceParticles />
    </div>
  )
}
