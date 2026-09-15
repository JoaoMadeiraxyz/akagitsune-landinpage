'use client'

import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Zap, Radio, Shield, Layers } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Payload-Agnostic',
    description: 'The gateway forwards your data without touching it. Chat messages, game states, live dashboards, IoT telemetry — it all rides the same wire. The meaning is yours; the transport is ours.',
  },
  {
    icon: Radio,
    title: 'Real-Time, Always',
    description: 'Built on asynchronous Rust with a lock-free hot path. Every message is serialized once — not once per receiver — then broadcast to all connected peers instantly.',
  },
  {
    icon: Shield,
    title: 'Backpressure Over Breakage',
    description: 'When a slow client falls behind, Akagitsune drops its queued messages and warns it — rather than slowing down everyone else. The fast stay fast; the slow get a second chance.',
  },
  {
    icon: Layers,
    title: 'Three Tasks, One Connection',
    description: 'Each connection runs a reader (ingest), a bridge (fanout), and a writer (flush). Bounded queues everywhere, no shared locks, reference-counted message clones. Clean, predictable, debuggable.',
  },
]

export function WhatItIsSection() {
  return (
    <Section id="about" className="relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">What It Is</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              A WebSocket relay that stays out of your way
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              Akagitsune is a generic realtime gateway — a piece of infrastructure, not a product. 
              It connects sockets and moves bytes. What those bytes mean is entirely your decision.
            </p>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f: { icon: React.ElementType; title: string; description: string }) => (
            <StaggerItem key={f.title}>
              <div className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-red-sm h-full">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <f.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Quick start snippet */}
        <SlideIn from="bottom" delay={0.3}>
          <div className="mt-12 max-w-xl mx-auto">
            <p className="text-xs text-muted-foreground font-mono mb-2 text-center">Get it running</p>
            <div className="code-block p-4 text-sm font-mono">
              <div className="text-muted-foreground">$ <span className="text-foreground">cargo run</span></div>
              <div className="text-muted-foreground mt-1"># Connect at <span className="text-primary">ws://127.0.0.1:3000/ws</span></div>
            </div>
          </div>
        </SlideIn>
      </Container>
    </Section>
  )
}
