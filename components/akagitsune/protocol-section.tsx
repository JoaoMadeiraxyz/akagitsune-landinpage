'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn } from '@/components/ui/animate'
import { MessageSquare, Binary, AlertTriangle, ArrowRight } from 'lucide-react'

type TabKey = 'welcome' | 'text' | 'binary' | 'control'

const protocolTabs: { key: TabKey; label: string; icon: React.ElementType; description: string; code: string }[] = [
  {
    key: 'welcome',
    label: 'Welcome',
    icon: ArrowRight,
    description: 'On connect, the server immediately sends a welcome frame with the client\'s assigned UUID. No handshake required — you\'re in.',
    code: `// Server → Client (on connect)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
  },
  {
    key: 'text',
    label: 'Text Frames',
    icon: MessageSquare,
    description: 'Any valid JSON the client sends is validated, wrapped in an envelope with the sender\'s ID, and relayed to every other connection. The payload is never deserialized — forwarded byte-for-byte inside the envelope.',
    code: `// Client sends:
{ "action": "move", "x": 42 }

// Every other client receives:
{
  "type": "message",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
  },
  {
    key: 'binary',
    label: 'Binary Frames',
    icon: Binary,
    description: 'Binary frames are relayed byte-for-byte with no envelope and no transformation. Use them for protobuf, msgpack, audio chunks, or anything that isn\'t JSON.',
    code: `// Client sends: <raw bytes>
// Every other client receives:
//   <same raw bytes, untouched>`,
  },
  {
    key: 'control',
    label: 'Control Frames',
    icon: AlertTriangle,
    description: 'When a slow client\'s queue overflows, the gateway drops queued messages for that client and sends a warning. Errors are reported as structured JSON. Frames over 64 KiB are rejected.',
    code: `// Backpressure warning (slow client):
{ "type": "warning", "dropped": 12 }

// Error (e.g., invalid JSON):
{ "type": "error", "message": "invalid JSON" }`,
  },
]

export function ProtocolSection() {
  const [active, setActive] = useState<TabKey>('welcome')
  const current = protocolTabs.find((t: { key: TabKey }) => t.key === active) ?? protocolTabs[0]

  return (
    <Section id="protocol" className="relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Protocol</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Simple by design
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              No handshake, no auth negotiation, no subscription dance. 
              Connect, receive your ID, start sending. Four frame types cover everything.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Tab bar */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {protocolTabs.map((tab: { key: TabKey; label: string; icon: React.ElementType }) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActive(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active === tab.key
                        ? 'bg-primary text-primary-foreground glow-red-sm'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.key ?? 'default'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl bg-card border border-border overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <p className="text-foreground leading-relaxed">{current?.description ?? ''}</p>
                </div>
                <div className="p-6 bg-[hsl(330,7%,6%)]">
                  <pre className="font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    <code>
                      {(current?.code ?? '').split('\n').map((line: string, i: number) => {
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
