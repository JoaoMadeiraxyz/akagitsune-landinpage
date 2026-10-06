'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { headlineStats } from '@/lib/benchmark-data'
import { useI18n } from '@/components/i18n-provider'

export function HeroSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <Image
          src="/images/banner.png"
          alt={t.hero.bannerAlt}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{ y: textY, opacity }}
      >
        <motion.div
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 relative mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image src="/images/logo.png" alt={t.nav.logoAlt} fill className="object-contain drop-shadow-[0_0_30px_rgba(225,24,30,0.4)]" />
        </motion.div>

        <motion.h1
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-glow-red"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Akagitsune
        </motion.h1>

        <motion.p
          className="font-display text-xl sm:text-2xl text-primary/80 mt-2 tracking-widest"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          赤狐
        </motion.p>

        <motion.p
          className="mt-6 text-lg sm:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t.hero.taglineBefore}{' '}
          <br className="hidden sm:block" />
          <span className="text-primary font-semibold">{t.hero.taglineHighlight}</span>
          {t.hero.taglineAfter}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          {headlineStats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-primary text-glow-red">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{t.hero.stats[stat.key]}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://github.com/JoaoMadeiraxyz/akagitsune"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all glow-red"
          >
            {t.hero.viewOnGithub}
          </a>
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 border border-primary/30 text-foreground font-semibold rounded-lg hover:border-primary/60 hover:bg-primary/5 transition-all"
          >
            {t.hero.learnMore}
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
