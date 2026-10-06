'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn } from '@/components/ui/animate'
import { useI18n } from '@/components/i18n-provider'
import { MessageSquare, Binary, AlertTriangle, ArrowRight } from 'lucide-react'

type TabKey = 'welcome' | 'text' | 'binary' | 'control'

const tabIcons: Record<TabKey, React.ElementType> = {
  welcome: ArrowRight,
  text: MessageSquare,
  binary: Binary,
  control: AlertTriangle,
}

const tabKeys: TabKey[] = ['welcome', 'text', 'binary', 'control']

export function ProtocolSection() {
  const { t } = useI18n()
  const [active, setActive] = useState<TabKey>('welcome')
  const current = t.protocol.tabs[active]

  return (
    <Section id="protocol" className="relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">{t.protocol.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t.protocol.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.protocol.intro}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {tabKeys.map((key) => {
                const Icon = tabIcons[key]
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active === key
                        ? 'bg-primary text-primary-foreground glow-red-sm'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                    }`}
                  >
                    <Icon size={16} />
                    {t.protocol.tabs[key].label}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl bg-card border border-border overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <p className="text-foreground leading-relaxed">{current.description}</p>
                </div>
                <div className="p-6 bg-[hsl(330,7%,6%)]">
                  <pre className="font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    <code>
                      {current.code.split('\n').map((line: string, i: number) => {
                        const isComment = line.trim().startsWith('//')
                        const isKey = /"[^"]+":/.test(line)
                        if (isComment) {
                          return <div key={i} className="text-muted-foreground/60">{line}</div>
                        }
                        if (isKey) {
                          const parts = line.split(/("[^"]+"\s*:)/)
                          return (
                            <div key={i}>
                              {parts.map((p: string, j: number) => (
                                <span key={j} className={/"[^"]+"\s*:/.test(p) ? 'text-primary' : 'text-foreground'}>{p}</span>
                              ))}
                            </div>
                          )
                        }
                        return <div key={i} className="text-foreground">{line}</div>
                      })}
                    </code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
