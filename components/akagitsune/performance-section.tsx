import { Container } from '@/components/layouts/container'
import { Section } from '@/components/layouts/section'
import { SafeNumber } from '@/components/safe-format'
import { FadeIn } from '@/components/ui/animate'
import { P99Chart } from '@/components/akagitsune/p99-chart'
import { benchmarkHardware, benchmarkRuns, slo, sustainedLoad } from '@/lib/benchmark-data'

/** Matches the emphasis palette in `p99-chart.tsx`, plus what each shape actually does. */
const shapeLegend = [
  { shape: 'ingest', swatch: 'bg-chart-4', gloss: 'many senders, one topic' },
  { shape: 'mesh', swatch: 'bg-chart-5', gloss: 'everyone talks to everyone' },
  { shape: 'fanout', swatch: 'bg-primary', gloss: 'one sender, every socket' },
]

const columns = ['Offered load', 'Shape', 'Conns', 'p50', 'p99', 'Delivered', 'Against budget']

function verdict(p99: number, deliveryPct: number) {
  if (deliveryPct < slo.deliveryPct) return 'delivery breaks'
  if (p99 > slo.p99CeilingMs) return 'over budget'
  return 'within budget'
}

export function PerformanceSection() {
  return (
    <Section id="performance">
      <Container size="lg">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Performance</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              One million, sustained
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              The target is a million deliveries a second inside a {slo.p99BandMs[0]}–{slo.p99CeilingMs} ms
              p99 budget. All three traffic shapes clear it, and clear half again as much. Past that they
              part ways: fanout is the expensive one, and it breaks first.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <figure className="rounded-xl bg-card border border-border p-5 sm:p-7">
            <figcaption className="mb-6">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                Service p99 against offered load
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Log scale, because the spread runs from 3 ms to 825 ms. The dashed rule is the{' '}
                {slo.p99CeilingMs} ms budget; the tinted band above it is out of spec.
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-3">
                {shapeLegend.map((item) => (
                  <li key={item.shape} className="flex items-baseline gap-2">
                    <span aria-hidden className={`mt-1.5 h-0.5 w-4 shrink-0 rounded-full ${item.swatch}`} />
                    <span className="font-mono text-xs text-foreground">{item.shape}</span>
                    <span className="text-xs text-muted-foreground">{item.gloss}</span>
                  </li>
                ))}
              </ul>
            </figcaption>

            <P99Chart />

            <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground/80">
              Ingest stops at 1.5M because it was never run above it. The hollow marker at 2.78M is a
              separate exploratory shape, and the only point where delivery rather than latency is what
              gives out.
            </p>
          </figure>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-10">
            <h3 className="font-display text-lg font-semibold tracking-tight">Every run, in full</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Latency in milliseconds. Rows that miss the budget are dimmed.
              <span className="sm:hidden"> Scroll the table sideways for the rest of the columns.</span>
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <caption className="sr-only">
                  Benchmark runs by offered load and traffic shape, with p50 and p99 service latency,
                  delivery rate, and whether each run stayed inside the {slo.p99CeilingMs} ms budget.
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
                          <SafeNumber value={run.load} />
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
                          {verdict(run.serviceP99Ms, run.deliveryPct)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-muted-foreground/70 max-w-2xl">
              Every number is from a single local run on {benchmarkHardware} — not a production
              deployment. Latency is service latency: message arrival minus actual send, the more
              conservative of the two figures the harness records. The highest load every shape held
              inside the budget was <SafeNumber value={sustainedLoad} /> deliveries a second. Benchmark
              scripts and methodology are in the repository.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
