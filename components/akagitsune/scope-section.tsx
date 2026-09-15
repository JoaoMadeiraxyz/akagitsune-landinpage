'use client'

import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn, SlideIn } from '@/components/ui/animate'
import { Check, X } from 'lucide-react'

const inScope = [
  'Connection management & lifecycle',
  'Message relay & envelope framing',
  'Backpressure & queue overflow handling',
  'Topic / room-based routing (planned)',
  'Per-connection rate limiting (planned)',
  'Auth & admission control (planned)',
  'Delivery semantics & acknowledgements',
  'Multi-instance backplane (planned)',
]

const outOfScope = [
  'Usernames, profiles, or identity',
  'Message content interpretation',
  'Chat history or persistence',
  'Business logic or domain rules',
  'Push notifications beyond WebSocket',
  'REST API endpoints for data',
]

export function ScopeSection() {
  return (
    <Section id="scope">
      <Container size="lg">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Scope</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Sharp boundaries, clear purpose
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              The scope test is simple: a feature belongs in the gateway only if it can be implemented 
              without knowing what the payload means. Everything else belongs in your application.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* In scope */}
          <SlideIn from="left" delay={0.1}>
            <div className="p-6 rounded-xl bg-card border border-border h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-green-500/10">
                  <Check size={16} className="text-green-400" />
                </div>
                <h3 className="font-display text-lg font-semibold">In the gateway</h3>
              </div>
              <ul className="space-y-3">
                {inScope.map((item: string) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>

          {/* Out of scope */}
          <SlideIn from="right" delay={0.1}>
            <div className="p-6 rounded-xl bg-card border border-border h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <X size={16} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">In your app</h3>
              </div>
              <ul className="space-y-3">
                {outOfScope.map((item: string) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <X size={14} className="text-primary/60 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>
        </div>

        {/* Scope philosophy */}
        <FadeIn delay={0.3}>
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="inline-block px-4 py-2 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground italic">
                "If it needs to know what the message says, it doesn't belong here."
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
