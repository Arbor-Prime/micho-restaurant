import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import BottomCTA from './components/BottomCTA'
import FloatingDecorations from './components/FloatingDecorations'
import PromoBanner from './components/PromoBanner'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const About = lazy(() => import('./pages/About'))
const Collection = lazy(() => import('./pages/Collection'))
const Reservations = lazy(() => import('./pages/Reservations'))

function PageFallback() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-copper border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      <FloatingDecorations />
      <Navbar />
      <PromoBanner />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <BottomCTA />
    </div>
  )
}
