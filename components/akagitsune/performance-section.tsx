'use client'

import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { SafeNumber } from '@/components/safe-format'
import { FadeIn } from '@/components/ui/animate'
import { P99Chart } from '@/components/akagitsune/p99-chart'
import { useI18n } from '@/components/i18n-provider'
import { benchmarkRuns, slo, sustainedLoad } from '@/lib/benchmark-data'

const shapeLegend = [
  { shape: 'ingest', swatch: 'bg-chart-4' },
  { shape: 'mesh', swatch: 'bg-chart-5' },
  { shape: 'fanout', swatch: 'bg-primary' },
] as const

function verdictKey(p99: number, deliveryPct: number) {
  if (deliveryPct < slo.deliveryPct) return 'breaks'
  if (p99 > slo.p99CeilingMs) return 'over'
  return 'within'
}

export function PerformanceSection() {
  const { t, intl } = useI18n()
  const p = t.performance
  const columns = p.columns
  return (
    <Section id="performance">
      <Container size="lg">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">{p.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {p.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              {p.intro(slo.p99BandMs[0], slo.p99CeilingMs)}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <figure className="rounded-xl bg-card border border-border p-5 sm:p-7">
            <figcaption className="mb-6">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {p.chartTitle}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {p.chartCaption(slo.p99CeilingMs)}
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-3">
                {shapeLegend.map((item) => (
                  <li key={item.shape} className="flex items-baseline gap-2">
                    <span aria-hidden className={`mt-1.5 h-0.5 w-4 shrink-0 rounded-full ${item.swatch}`} />
                    <span className="font-mono text-xs text-foreground">{item.shape}</span>
                    <span className="text-xs text-muted-foreground">{p.shapeGloss[item.shape]}</span>
                  </li>
                ))}
              </ul>
            </figcaption>

            <P99Chart />

            <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground/80">
              {p.chartNote}
            </p>
          </figure>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-10">
            <h3 className="font-display text-lg font-semibold tracking-tight">{p.tableTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.tableHint}
              <span className="sm:hidden">{p.tableScrollHint}</span>
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <caption className="sr-only">
                  {p.tableCaption(slo.p99CeilingMs)}
                </caption>
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    {columns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground ${
                          i === 0 || i === 1 ? 'text-left' : 'text-right'
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benchmarkRuns.map((run) => {
                    const missed = run.serviceP99Ms > slo.p99CeilingMs
                    return (
                      <tr
                        key={`${run.load}-${run.shape}`}
                        className={`border-b border-border last:border-0 ${
                          missed ? 'bg-secondary/40 text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        <td className="px-4 py-2.5 font-mono tabular-nums">
                          <SafeNumber value={run.load} locale={intl} />
                        </td>
                        <td className="px-4 py-2.5 font-mono">{run.shape}</td>
                        <td className="px-4 py-2.5 text-right font-mono tabular-nums">{run.connections}</td>
                        <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                          {run.serviceP50Ms.toFixed(2)}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-right font-mono tabular-nums ${
                            missed ? '' : 'font-semibold'
                          }`}
                        >
                          {run.serviceP99Ms.toFixed(2)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                          {run.deliveryPct.toFixed(run.deliveryPct === 100 ? 0 : 2)}%
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-xs">
                          {p.verdict[verdictKey(run.serviceP99Ms, run.deliveryPct)]}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-muted-foreground/70 max-w-2xl">
              {p.footnoteBefore(p.hardware)}
              <SafeNumber value={sustainedLoad} locale={intl} />
              {p.footnoteAfter}
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
