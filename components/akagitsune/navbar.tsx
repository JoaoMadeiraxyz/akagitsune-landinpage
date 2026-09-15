'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Performance', href: '#performance' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Scope', href: '#scope' },
  { label: 'Characters', href: '#characters' },
  { label: 'Roadmap', href: '#roadmap' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Image src="/images/logo.png" alt="Akagitsune logo" fill className="object-contain" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              Akagitsune
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link: { label: string; href: string }) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://github.com/JoaoMadeiraxyz/akagitsune"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors glow-red-sm"
            >
              GitHub
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link: { label: string; href: string }) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 text-lg text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://github.com/JoaoMadeiraxyz/akagitsune"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-3 text-lg font-medium bg-primary text-primary-foreground rounded-md text-center glow-red-sm"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
