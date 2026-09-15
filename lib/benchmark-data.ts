/**
 * Benchmark results for the Akagitsune gateway.
 *
 * Source of truth: `realtime-gateway/bench-results/20260803-153443-all.csv`.
 * Latency is *service* latency (arrival − actual send), the conservative of the
 * two definitions the harness reports. Every number here is verbatim from that
 * run — if the benchmark is re-run, replace this file rather than editing
 * numbers into components.
 */

/** Traffic shapes exercised by the harness. `explore` is a one-off probe past the cliff. */
export type TrafficShape = 'ingest' | 'mesh' | 'fanout' | 'explore'

export type BenchmarkRun = {
  shape: TrafficShape
  /** Offered load in deliveries per second. */
  load: number
  connections: number
  serviceP50Ms: number
  serviceP99Ms: number
  serviceP999Ms: number
  /** Percentage of expected messages actually delivered. */
  deliveryPct: number
  warnings: number
}

/** The service-level objective the runs are measured against. */
export const slo = {
  throughput: 1_000_000,
  /** Passes at or below the upper bound; the band is the stated target. */
  p99BandMs: [10, 20] as const,
  p99CeilingMs: 20,
  deliveryPct: 99.9,
} as const

export const benchmarkHardware =
  'Apple M4 Pro, 14 cores, release build, gateway and load generator on the same machine'

/** Ordered by offered load, then by p99 within each load step. */
export const benchmarkRuns: BenchmarkRun[] = [
  { shape: 'ingest', load: 1_000_000, connections: 101, serviceP50Ms: 1.828, serviceP99Ms: 3.0, serviceP999Ms: 3.192, deliveryPct: 100, warnings: 0 },
  { shape: 'mesh', load: 1_000_000, connections: 201, serviceP50Ms: 3.064, serviceP99Ms: 5.392, serviceP999Ms: 5.776, deliveryPct: 100, warnings: 0 },
  { shape: 'fanout', load: 1_000_000, connections: 501, serviceP50Ms: 2.456, serviceP99Ms: 6.032, serviceP999Ms: 11.744, deliveryPct: 100, warnings: 0 },
  { shape: 'ingest', load: 1_500_000, connections: 101, serviceP50Ms: 1.66, serviceP99Ms: 3.16, serviceP999Ms: 3.912, deliveryPct: 100, warnings: 0 },
  { shape: 'mesh', load: 1_500_000, connections: 251, serviceP50Ms: 3.528, serviceP99Ms: 6.512, serviceP999Ms: 7.12, deliveryPct: 100, warnings: 0 },
  { shape: 'fanout', load: 1_500_000, connections: 501, serviceP50Ms: 6.16, serviceP99Ms: 18.88, serviceP999Ms: 28.608, deliveryPct: 100, warnings: 0 },
  { shape: 'mesh', load: 2_000_000, connections: 201, serviceP50Ms: 16.448, serviceP99Ms: 48.768, serviceP999Ms: 66.304, deliveryPct: 100, warnings: 0 },
  { shape: 'fanout', load: 2_000_000, connections: 1001, serviceP50Ms: 42.88, serviceP99Ms: 193.024, serviceP999Ms: 281.6, deliveryPct: 100, warnings: 0 },
  { shape: 'explore', load: 2_782_322, connections: 301, serviceP50Ms: 180.736, serviceP99Ms: 825.344, serviceP999Ms: 1118.208, deliveryPct: 92.7441, warnings: 1184 },
]

/** Shapes drawn as connected series, quietest first. `explore` is plotted on its own. */
export const chartedShapes = ['ingest', 'mesh', 'fanout'] as const
export type ChartedShape = (typeof chartedShapes)[number]

/** The single run past the cliff — where delivery, not latency, is what gives out. */
export const cliffRun = benchmarkRuns.find((r) => r.shape === 'explore')!

/**
 * One row per load step, with each charted shape as a key so Recharts can draw
 * three series off one dataset. `null` means the shape was never run at that
 * load — Recharts leaves a gap rather than interpolating.
 *
 * The load steps are four discrete benchmark configurations rather than samples
 * off a continuum, so the chart spaces them evenly and lets the tick labels
 * carry the real values. `cliff` is a separate key so the last step draws as an
 * unconnected marker instead of joining a series.
 */
export const p99ByLoad = [1_000_000, 1_500_000, 2_000_000, cliffRun.load].map((load) => ({
  load,
  cliff: load === cliffRun.load ? cliffRun.serviceP99Ms : null,
  ...Object.fromEntries(
    chartedShapes.map((shape) => [
      shape,
      benchmarkRuns.find((r) => r.load === load && r.shape === shape)?.serviceP99Ms ?? null,
    ]),
  ),
})) as ({ load: number; cliff: number | null } & Record<ChartedShape, number | null>)[]

/** The highest load every charted shape held inside the p99 budget. */
export const sustainedLoad = 1_500_000

/** Headline figures, also used by the hero so the two never drift apart. */
export const headlineStats = [
  { value: '1M/s', label: 'Deliveries sustained' },
  { value: '6ms', label: 'Worst p99 at 1M/s' },
  { value: '100%', label: 'Delivered at 1M/s' },
] as const
