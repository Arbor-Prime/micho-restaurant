import React from 'react'
import { motion } from 'framer-motion'

/**
 * ScrollReveal - cinematic scroll-triggered entrance animation
 * direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
 * distance: px to travel
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.0,
  direction = 'up',
  distance = 60,
  once = true,
  ...props
}) {
  const vectors = {
    up:    { y: distance, x: 0, scale: 1 },
    down:  { y: -distance, x: 0, scale: 1 },
    left:  { x: distance, y: 0, scale: 1 },
    right: { x: -distance, y: 0, scale: 1 },
    scale: { scale: 0.88, y: 20, x: 0 },
    fade:  { y: 0, x: 0, scale: 1 },
  }

  const hidden = { opacity: 0, ...vectors[direction] }
  const visible = { opacity: 1, y: 0, x: 0, scale: 1 }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
