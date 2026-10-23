'use client'

import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { useI18n } from '@/components/i18n-provider'
import {
  Activity,
  Box,
  FileStack,
  Gauge,
  GitBranch,
  HeartPulse,
  Lock,
  Power,
  Radio,
  ShieldCheck,
  ShieldHalf,
  Timer,
  Users,
  type LucideIcon,
} from 'lucide-react'

type Status = 'achieved' | 'mvp' | 'later' | 'exploring'
type GroupId = 'done' | 'mvp' | 'after' | 'considering'

/** Icons and dates per item, in the same order as `t.roadmap.items[group]`. */
const groupMeta: Record<GroupId, { status: Status; items: { icon: LucideIcon; reached?: string }[] }> = {
  done: {
    status: 'achieved',
    items: [
      { icon: GitBranch, reached: '2026-10-06' },
      { icon: Lock, reached: '2026-10-22' },
      { icon: Timer, reached: '2026-10-22' },
    ],
  },
  mvp: {
    status: 'mvp',
    items: [
      { icon: HeartPulse },
      { icon: Users },
      { icon: Power },
      { icon: Activity },
      { icon: ShieldHalf },
      { icon: FileStack },
      { icon: Box },
    ],
  },
  after: { status: 'later', items: [{ icon: Gauge }] },
  considering: { status: 'exploring', items: [{ icon: ShieldCheck }, { icon: Radio }] },
}

const groupOrder: GroupId[] = ['done', 'mvp', 'after', 'considering']

const iconTone: Record<Status, string> = {
  achieved: 'bg-green-500/10 text-green-400',
  mvp: 'bg-primary/20 text-primary',
  later: 'bg-secondary text-muted-foreground',
  exploring: 'bg-secondary text-muted-foreground',
}

const badgeTone: Record<Status, string> = {
  achieved: 'bg-green-500/10 text-green-400 border border-green-500/20',
  mvp: 'bg-primary/10 text-primary border border-primary/20',
  later: 'bg-secondary text-muted-foreground border border-border',
  exploring: 'bg-accent/10 text-accent border border-accent/20',
}

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

        <div className="max-w-3xl mx-auto space-y-12">
          {groupOrder.map((groupId) => {
            const group = t.roadmap.groups[groupId]
            const meta = groupMeta[groupId]
            return (
              <div key={groupId}>
                <FadeIn>
                  <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                  {group.note && (
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{group.note}</p>
                  )}
                </FadeIn>

                <Stagger staggerDelay={0.08} className="mt-5 space-y-4">
                  {t.roadmap.items[groupId].map((item, i) => {
                    const { icon: Icon, reached } = meta.items[i]
                    return (
                      <StaggerItem key={item.title}>
                        <div className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                          <div className="flex flex-col items-center shrink-0 mt-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconTone[meta.status]}`}>
                              <Icon size={18} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="font-display text-base font-semibold">{item.title}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${badgeTone[meta.status]}`}>
                                {t.roadmap.status[meta.status]}
                              </span>
                              {reached && (
                                <span className="text-xs font-mono text-muted-foreground">{reached}</span>
                              )}
                            </div>
                            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </Stagger>
              </div>
            )
          })}

          <FadeIn>
            <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              <span className="font-semibold text-foreground">{t.roadmap.notScheduled.title}: </span>
              {t.roadmap.notScheduled.text}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
