/**
 * Benchmark results for the Akagitsune gateway, topic-routing architecture.
 *
 * Source of truth: `akagitsune/bench-results/20261006-150929-all.csv` (a local
 * file, not committed), also summarised in `docs/architecture.md` and in
 * https://github.com/JoaoMadeiraxyz/akagitsune/pull/33. Latency is *service*
 * latency (arrival − actual send), the conservative of the two definitions the
 * harness reports. Every number here is verbatim from that run — if the
 * benchmark is re-run, replace this file rather than editing numbers into
 * components.
 */

/**
 * Traffic shapes exercised by the harness. ingest, mesh and fanout all run on a
 * single topic. `topics` spreads the same load over many topics, `churn` adds
 * subscribe/unsubscribe traffic, and `explore` is a probe past the goal scenarios.
 */
export type TrafficShape = 'ingest' | 'mesh' | 'fanout' | 'topics' | 'churn' | 'explore'

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

/** Ordered by offered load, then by p99 within each load step. */
export const benchmarkRuns: BenchmarkRun[] = [
  { shape: 'topics', load: 90_000, connections: 1000, serviceP50Ms: 2.744, serviceP99Ms: 5.104, serviceP999Ms: 6.128, deliveryPct: 100, warnings: 0 },
  { shape: 'churn', load: 124_750, connections: 500, serviceP50Ms: 5.296, serviceP99Ms: 50.304, serviceP999Ms: 86.784, deliveryPct: 100, warnings: 0 },
  { shape: 'topics', load: 450_000, connections: 5000, serviceP50Ms: 46.208, serviceP99Ms: 71.424, serviceP999Ms: 94.976, deliveryPct: 100, warnings: 0 },
  { shape: 'ingest', load: 1_000_000, connections: 101, serviceP50Ms: 1.988, serviceP99Ms: 4.528, serviceP999Ms: 6.64, deliveryPct: 100, warnings: 0 },
  { shape: 'fanout', load: 1_000_000, connections: 501, serviceP50Ms: 1.836, serviceP99Ms: 4.72, serviceP999Ms: 7.472, deliveryPct: 100, warnings: 0 },
  { shape: 'mesh', load: 1_000_000, connections: 201, serviceP50Ms: 3.096, serviceP99Ms: 5.968, serviceP999Ms: 7.376, deliveryPct: 100, warnings: 0 },
  { shape: 'topics', load: 1_000_000, connections: 2100, serviceP50Ms: 18.624, serviceP99Ms: 27.84, serviceP999Ms: 32.064, deliveryPct: 100, warnings: 0 },
  { shape: 'ingest', load: 1_500_000, connections: 101, serviceP50Ms: 1.58, serviceP99Ms: 3.064, serviceP999Ms: 5.552, deliveryPct: 100, warnings: 0 },
  { shape: 'fanout', load: 1_500_000, connections: 501, serviceP50Ms: 2.216, serviceP99Ms: 4.912, serviceP999Ms: 6.512, deliveryPct: 100, warnings: 0 },
  { shape: 'mesh', load: 1_500_000, connections: 251, serviceP50Ms: 3.096, serviceP99Ms: 4.944, serviceP999Ms: 5.68, deliveryPct: 100, warnings: 0 },
  { shape: 'mesh', load: 2_000_000, connections: 201, serviceP50Ms: 1.836, serviceP99Ms: 4.088, serviceP999Ms: 5.2, deliveryPct: 100, warnings: 0 },
  { shape: 'fanout', load: 2_000_000, connections: 1001, serviceP50Ms: 8.864, serviceP99Ms: 13.984, serviceP999Ms: 17.472, deliveryPct: 100, warnings: 0 },
  { shape: 'explore', load: 3_000_000, connections: 301, serviceP50Ms: 2.376, serviceP99Ms: 4.176, serviceP999Ms: 8.8, deliveryPct: 100, warnings: 0 },
  { shape: 'explore', load: 3_588_000, connections: 300, serviceP50Ms: 2.488, serviceP99Ms: 4.4, serviceP999Ms: 5.168, deliveryPct: 100, warnings: 0 },
]

/** Shapes drawn as connected series, quietest first. */
export const chartedShapes = ['ingest', 'mesh', 'fanout'] as const
export type ChartedShape = (typeof chartedShapes)[number]

/** Shapes drawn as unconnected hollow markers, because each is a different kind of result. */
export const markerShapes = ['topics', 'explore'] as const
export type MarkerShape = (typeof markerShapes)[number]

/** The goal run spread over 100 topics — the only goal-load run over the p99 budget. */
export const topicsGoalRun = benchmarkRuns.find((r) => r.shape === 'topics' && r.load === 1_000_000)!

/**
 * One row per load step, with each charted shape as a key so Recharts can draw
 * three series off one dataset. `null` means the shape was never run at that
 * load — Recharts leaves a gap rather than interpolating.
 *
 * The load steps are discrete benchmark configurations rather than samples off
 * a continuum, so the chart spaces them evenly and lets the tick labels carry
 * the real values. Marker shapes are separate keys so they draw as unconnected
 * points instead of joining a series.
 */
export const p99ByLoad = [1_000_000, 1_500_000, 2_000_000, 3_000_000, 3_588_000].map((load) => ({
  load,
  ...Object.fromEntries(
    [...chartedShapes, ...markerShapes].map((shape) => [
      shape,
      benchmarkRuns.find((r) => r.load === load && r.shape === shape)?.serviceP99Ms ?? null,
    ]),
  ),
})) as ({ load: number } & Record<ChartedShape | MarkerShape, number | null>)[]

/** The highest load any run held inside the p99 budget with every message delivered. */
export const sustainedLoad = 3_588_000

/** Headline figures, also used by the hero so the two never drift apart. Labels live in the i18n dictionaries, keyed by `key`. */
export const headlineStats = [
  { key: 'sustained', value: '1M/s' },
  { key: 'p99', value: '6ms' },
  { key: 'delivered', value: '100%' },
] as const
