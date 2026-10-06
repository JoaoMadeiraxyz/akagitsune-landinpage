'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { useI18n } from '@/components/i18n-provider'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'

interface CharacterData {
  id: string
  name: string
  image: string
  color: string
  borderColor: string
}

const characters: CharacterData[] = [
  {
    id: 'akane',
    name: 'Akane',
    image: '/images/akane.png',
    color: 'text-[#E1181E]',
    borderColor: 'border-[#E1181E]/30 hover:border-[#E1181E]/60',
  },
  {
    id: 'messenger',
    name: 'Kaze',
    image: '/images/kaze.png',
    color: 'text-[#E1181E]',
    borderColor: 'border-[#C32427]/30 hover:border-[#C32427]/60',
  },
  {
    id: 'gatekeeper',
    name: 'Tetsu',
    image: '/images/tetsu.png',
    color: 'text-[#D76260]',
    borderColor: 'border-[#871B1D]/30 hover:border-[#871B1D]/60',
  },
  {
    id: 'trickster',
    name: 'Hayate',
    image: '/images/hayate.png',
    color: 'text-[#6E2A55]',
    borderColor: 'border-[#6E2A55]/30 hover:border-[#6E2A55]/60',
  },
]

export function CharactersSection() {
  const { t } = useI18n()
  const cast = t.characters.cast
  const [selected, setSelected] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const selectedChar = characters.find((c: CharacterData) => c.id === selected)
  const selectedCast = selectedChar ? cast[selectedChar.id as keyof typeof cast] : undefined

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [zoomed])

  return (
    <Section id="characters">
      <Container size="lg">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">{t.characters.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t.characters.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.characters.intro}
            </p>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((char: CharacterData) => (
            <StaggerItem key={char.id}>
              <button
                onClick={() => {
                  setZoomed(false)
                  setSelected(selected === char.id ? null : char.id)
                }}
                className={`w-full text-left rounded-xl bg-card border ${char.borderColor} transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={char.image}
                    alt={`${char.name} — ${cast[char.id as keyof typeof cast].role}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`font-mono text-xs tracking-wider uppercase ${char.color}`}>{cast[char.id as keyof typeof cast].task}</p>
                    <h3 className="font-display text-xl font-bold mt-1">{char.name}</h3>
                    <p className="text-sm text-muted-foreground">{cast[char.id as keyof typeof cast].role}</p>
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <AnimatePresence>
          {selectedChar && (
            <motion.div
              key={selectedChar.id}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`rounded-xl bg-card border ${selectedChar.borderColor} p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start`}>
                <motion.button
                  layoutId={`char-zoom-${selectedChar.id}`}
                  onClick={() => setZoomed(true)}
                  aria-label={t.characters.viewFullSize(selectedChar.name)}
                  className="shrink-0 w-full md:w-48 h-64 relative rounded-lg overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Image
                    src={selectedChar.image}
                    alt={selectedChar.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover object-top"
                  />
                </motion.button>
                <div>
                  <p className={`font-mono text-xs tracking-wider uppercase ${selectedChar.color}`}>{selectedCast?.task}</p>
                  <h3 className="font-display text-2xl font-bold mt-1">{selectedChar.name} — {selectedCast?.role}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{selectedCast?.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      <AnimatePresence>
        {selectedChar && zoomed && (
          <motion.div
            key="char-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t.characters.fullSize(selectedChar.name)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              layoutId={`char-zoom-${selectedChar.id}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="relative w-[min(90vw,56vh)] aspect-[2/3] rounded-xl overflow-hidden cursor-default shadow-2xl"
            >
              <Image
                src={selectedChar.image}
                alt={selectedChar.name}
                fill
                sizes="(max-width: 768px) 90vw, 56vh"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
