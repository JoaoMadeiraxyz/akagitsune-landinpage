'use client'

import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { useI18n } from '@/components/i18n-provider'
import { GitBranch, Lock, ShieldCheck, Timer, Gauge, Radio } from 'lucide-react'

const roadmapMeta = [
  { icon: GitBranch, status: 'achieved' },
  { icon: Lock, status: 'next' },
  { icon: ShieldCheck, status: 'planned' },
  { icon: Timer, status: 'planned' },
  { icon: Gauge, status: 'planned' },
  { icon: Radio, status: 'exploring' },
] as const

export function RoadmapSection() {
  const { t } = useI18n()
  return (
    <Section id="roadmap">
      <Container size="lg">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">{t.roadmap.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t.roadmap.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.roadmap.intro}
            </p>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.1} className="max-w-3xl mx-auto space-y-4">
          {t.roadmap.items.map((item, i) => {
            const meta = roadmapMeta[i]
            return (
            <StaggerItem key={item.title}>
              <div className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col items-center shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    meta.status === 'achieved'
                      ? 'bg-green-500/10 text-green-400'
                      : meta.status === 'next'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    <meta.icon size={18} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-base font-semibold">{item.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      meta.status === 'achieved'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : meta.status === 'next'
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : meta.status === 'planned'
                        ? 'bg-secondary text-muted-foreground border border-border'
                        : 'bg-accent/10 text-accent border border-accent/20'
                    }`}>
                      {t.roadmap.status[meta.status]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </Section>
  )
}
