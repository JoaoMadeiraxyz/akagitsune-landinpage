'use client'

import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { Zap, Radio, Shield, Layers } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'

const featureIcons = [Zap, Radio, Shield, Layers]

export function WhatItIsSection() {
  const { t } = useI18n()
  return (
    <Section id="about" className="relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">{t.whatItIs.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t.whatItIs.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.whatItIs.intro}
            </p>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.whatItIs.features.map((f, i) => {
            const Icon = featureIcons[i]
            return (
            <StaggerItem key={f.title}>
              <div className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-red-sm h-full">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
            )
          })}
        </Stagger>

        <SlideIn from="bottom" delay={0.3}>
          <div className="mt-12 max-w-xl mx-auto">
            <p className="text-xs text-muted-foreground font-mono mb-2 text-center">{t.whatItIs.getItRunning}</p>
            <div className="code-block p-4 text-sm font-mono">
              <div className="text-muted-foreground">$ <span className="text-foreground">cargo run</span></div>
              <div className="text-muted-foreground mt-1">{t.whatItIs.connectAt}<span className="text-primary">ws://127.0.0.1:3000/ws</span></div>
            </div>
          </div>
        </SlideIn>
      </Container>
    </Section>
  )
}
