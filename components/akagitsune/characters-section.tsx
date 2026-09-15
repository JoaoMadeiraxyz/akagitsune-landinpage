'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'

interface CharacterData {
  id: string
  name: string
  role: string
  task: string
  image: string
  description: string
  color: string
  borderColor: string
}

const characters: CharacterData[] = [
  {
    id: 'akane',
    name: 'Akane',
    role: 'The Gateway',
    task: 'Project Lead',
    image: '/images/akane.png',
    description: 'The face of Akagitsune. Akane embodies the gateway itself — poised, precise, and relentlessly fast. She coordinates the three operatives below, ensuring every message reaches its destination without interference or delay. The crimson eyes see all traffic; the fox mask stays close, a reminder that the gateway is cunning infrastructure, not blunt force.',
    color: 'text-[#E1181E]',
    borderColor: 'border-[#E1181E]/30 hover:border-[#E1181E]/60',
  },
  {
    id: 'messenger',
    name: 'Kaze',
    role: 'The Messenger',
    task: 'Reader Task',
    image: '/images/kaze.png',
    description: 'The Reader. Kaze intercepts every incoming frame the instant it arrives — validates the JSON, constructs the envelope once, and publishes to the broadcast bus. One serialization per message, not per receiver. Her half-mask and data scroll mark her as the first point of contact: she touches the wire so nobody else has to.',
    color: 'text-[#E1181E]',
    borderColor: 'border-[#C32427]/30 hover:border-[#C32427]/60',
  },
  {
    id: 'gatekeeper',
    name: 'Tetsu',
    role: 'The Gatekeeper',
    task: 'Bridge Task',
    image: '/images/tetsu.png',
    description: 'The Bridge. Tetsu stands between the broadcast bus and every local connection queue. He receives from the bus, skips the sender\'s own messages, and forwards the rest. His armored frame and glowing lantern embody the principle: guard the flow, never the content. Sturdy, reliable, always watching.',
    color: 'text-[#D76260]',
    borderColor: 'border-[#871B1D]/30 hover:border-[#871B1D]/60',
  },
  {
    id: 'trickster',
    name: 'Hayate',
    role: 'The Trickster',
    task: 'Writer Task',
    image: '/images/hayate.png',
    description: 'The Writer. Hayate drains the local queue in batches — one flush per batch, never wasted work. Only the Writer touches the sink. His acrobatic agility mirrors the writer task\'s speed: clear the queue, flush, repeat. The twin blades? One for each end of the pipe.',
    color: 'text-[#6E2A55]',
    borderColor: 'border-[#6E2A55]/30 hover:border-[#6E2A55]/60',
  },
]

export function CharactersSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const selectedChar = characters.find((c: CharacterData) => c.id === selected)

  // Close the lightbox on Escape and lock page scroll while it's open.
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
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">The Operatives</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Four tasks, four faces
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              Every connection in Akagitsune runs three concurrent tasks — reader, bridge, and writer —
              plus a lead that ties them together. Meet the cast.
            </p>
          </div>
        </FadeIn>

        {/* Character grid */}
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
                    alt={`${char.name} — ${char.role}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`font-mono text-xs tracking-wider uppercase ${char.color}`}>{char.task}</p>
                    <h3 className="font-display text-xl font-bold mt-1">{char.name}</h3>
                    <p className="text-sm text-muted-foreground">{char.role}</p>
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Expanded character detail */}
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
                  aria-label={`View ${selectedChar.name} full size`}
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
                  <p className={`font-mono text-xs tracking-wider uppercase ${selectedChar.color}`}>{selectedChar.task}</p>
                  <h3 className="font-display text-2xl font-bold mt-1">{selectedChar.name} — {selectedChar.role}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{selectedChar.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Full-screen lightbox — morphs out of the detail card's thumbnail */}
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
            aria-label={`${selectedChar.name} full size`}
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
