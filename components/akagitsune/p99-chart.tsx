'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import {
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ClientOnly } from '@/components/client-only'
import { benchmarkRuns, chartedShapes, cliffRun, p99ByLoad, slo, type ChartedShape } from '@/lib/benchmark-data'

/**
 * Emphasis palette, not categorical: fanout is the story (it is the binding
 * constraint and the first to break), the other two shapes are context. The
 * chart-1/2/3 tokens are all reds and are not separable under colour-vision
 * deficiency, so the two context series use the neutral steps instead.
 */
const shapeColor: Record<ChartedShape, string> = {
  ingest: 'hsl(var(--chart-4))',
  mesh: 'hsl(var(--chart-5))',
  fanout: 'hsl(var(--primary))',
}

const axis = 'hsl(var(--border))'
const axisText = 'hsl(var(--muted-foreground))'

const formatLoad = (load: number) => {
  const millions = load / 1_000_000
  return `${millions % 1 === 0 ? millions : millions.toFixed(2).replace(/0$/, '')}M`
}

function Readout({ active, label }: { active?: boolean; label?: number }) {
  if (!active || typeof label !== 'number') return null
  const runs = benchmarkRuns.filter((r) => r.load === label)
  if (runs.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2.5 backdrop-blur-sm">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {formatLoad(label)} deliveries/s offered
      </div>
      <table className="mt-2 font-mono text-xs">
        <tbody>
          {runs.map((run) => (
            <tr key={run.shape}>
              <td className="pr-3 py-0.5">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="h-0.5 w-3 rounded-full"
                    style={{ background: shapeColor[run.shape as ChartedShape] ?? 'hsl(var(--primary))' }}
                  />
                  <span className="text-foreground">{run.shape}</span>
                </span>
              </td>
              <td className="pr-3 py-0.5 text-right text-muted-foreground">
                p50 {run.serviceP50Ms.toFixed(2)}
              </td>
              <td className="pr-3 py-0.5 text-right text-foreground">
                p99 {run.serviceP99Ms.toFixed(2)} ms
              </td>
              <td className="py-0.5 text-right text-muted-foreground">
                {run.deliveryPct.toFixed(run.deliveryPct === 100 ? 0 : 2)}% delivered
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Plot() {
  const reduceMotion = useReducedMotion()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={p99ByLoad} margin={{ top: 12, right: 30, bottom: 4, left: 4 }}>
        {/* Everything above the p99 ceiling is out of spec — pass/fail reads by position. */}
        <ReferenceArea
          y1={slo.p99CeilingMs}
          y2={1100}
          fill="hsl(var(--primary))"
          fillOpacity={0.05}
          stroke="none"
        />
        <CartesianGrid vertical={false} stroke={axis} strokeOpacity={0.6} />
        <XAxis
          dataKey="load"
          type="category"
          tickFormatter={formatLoad}
          interval={0}
          stroke={axis}
          tick={{ fill: axisText, fontSize: 11, fontFamily: 'var(--font-mono)' }}
          tickLine={false}
          height={28}
        />
        <YAxis
          scale="log"
          domain={[2, 1100]}
          ticks={[3, 10, 30, 100, 300, 1000]}
          tickFormatter={(v: number) => `${v}`}
          stroke={axis}
          tick={{ fill: axisText, fontSize: 11, fontFamily: 'var(--font-mono)' }}
          tickLine={false}
          width={34}
        />
        {/* A real threshold, so a dashed rule is the right signal here. */}
        <ReferenceLine
          y={slo.p99CeilingMs}
          stroke={axisText}
          strokeDasharray="4 4"
          strokeOpacity={0.7}
          label={{
            value: `${slo.p99CeilingMs} ms budget`,
            position: 'insideTopRight',
            fill: axisText,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            offset: 8,
          }}
        />
        <Tooltip
          content={<Readout />}
          cursor={{ stroke: axisText, strokeOpacity: 0.3, strokeWidth: 1 }}
        />
        {chartedShapes.map((shape, i) => (
          <Line
            key={shape}
            type="linear"
            dataKey={shape}
            stroke={shapeColor[shape]}
            strokeWidth={2}
            connectNulls={false}
            dot={{ r: 3.5, fill: shapeColor[shape], strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
            isAnimationActive={!reduceMotion}
            animationBegin={i * 160}
            animationDuration={900}
          />
        ))}
        {/* The cliff: a separate exploratory shape, and the one point where
            delivery — not latency — is what gives out. Hollow and unconnected,
            so it reads as a different kind of result, not a fourth series. */}
        <Line
          dataKey="cliff"
          stroke="none"
          legendType="none"
          dot={{
            r: 5,
            fill: 'hsl(var(--background))',
            stroke: 'hsl(var(--primary))',
            strokeWidth: 2,
          }}
          activeDot={false}
          isAnimationActive={!reduceMotion}
          animationBegin={520}
          animationDuration={600}
        >
          {/* Names the failure mode, since this point breaks on delivery, not latency. */}
          <LabelList
            dataKey="cliff"
            position="left"
            offset={12}
            formatter={(v: number | null) =>
              v == null ? '' : `${cliffRun.deliveryPct.toFixed(1)}% delivered`
            }
            fill="hsl(var(--foreground))"
            fontSize={11}
            fontFamily="var(--font-mono)"
          />
        </Line>
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function P99Chart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' as `${number}px` })

  return (
    <div ref={ref} className="h-[280px] sm:h-[380px] w-full">
      {/* Recharts measures the DOM to size itself, so it never renders on the
          server. The wrapper reserves the exact height either way. */}
      <ClientOnly>{inView ? <Plot /> : null}</ClientOnly>
    </div>
  )
}
