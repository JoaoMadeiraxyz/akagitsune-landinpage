'use client'

import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { GitBranch, Lock, Gauge, Server, Radio } from 'lucide-react'

const roadmapItems = [
  {
    icon: GitBranch,
    title: 'Topic & Room Routing',
    description: 'Replace the single broadcast bus with a topic-based subscription model. Clients subscribe to rooms; messages route only to subscribers — eliminating O(N²) fanout.',
    status: 'Next',
  },
  {
    icon: Lock,
    title: 'Authentication',
    description: 'Token-based admission control at connection time. The gateway verifies identity without interpreting payload — auth is transport-level, not content-level.',
    status: 'Planned',
  },
  {
    icon: Gauge,
    title: 'Per-Connection Rate Limiting',
    description: 'Configurable ingest rate limits per connection to prevent abuse and smooth traffic spikes. Token bucket or sliding window, decided at the transport layer.',
    status: 'Planned',
  },
  {
    icon: Server,
    title: 'Multi-Instance Backplane',
    description: 'Horizontal scaling via a shared backplane (Redis, NATS, or a custom protocol) so multiple gateway instances form a single logical relay.',
    status: 'Planned',
  },
  {
    icon: Radio,
    title: 'Delivery Acknowledgements',
    description: 'Optional per-message ack/nack for clients that need delivery guarantees. Still payload-agnostic — the gateway confirms transport, not meaning.',
    status: 'Exploring',
  },
]

export function RoadmapSection() {
  return (
    <Section id="roadmap">
      <Container size="lg">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Roadmap</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              What comes next
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              Akagitsune is under active development. These are the features on the horizon — 
              all of them pass the scope test.
            </p>
          </div>
        </FadeIn>

        <Stagger staggerDelay={0.1} className="max-w-3xl mx-auto space-y-4">
          {roadmapItems.map((item: { icon: React.ElementType; title: string; description: string; status: string }, i: number) => (
            <StaggerItem key={item.title}>
              <div className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                {/* Timeline dot */}
                <div className="flex flex-col items-center shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    i === 0 ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                  }`}>
                    <item.icon size={18} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-base font-semibold">{item.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      item.status === 'Next'
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : item.status === 'Planned'
                        ? 'bg-secondary text-muted-foreground border border-border'
                        : 'bg-accent/10 text-accent border border-accent/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
