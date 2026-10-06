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
import { useI18n } from '@/components/i18n-provider'
import { benchmarkRuns, chartedShapes, p99ByLoad, slo, topicsGoalRun, type ChartedShape } from '@/lib/benchmark-data'

const shapeColor: Record<ChartedShape, string> = {
  ingest: 'hsl(var(--chart-4))',
  mesh: 'hsl(var(--chart-5))',
  fanout: 'hsl(var(--primary))',
}

const axis = 'hsl(var(--border))'
const axisText = 'hsl(var(--muted-foreground))'

const formatLoad = (load: number, formatNumber: (v: number, max?: number, min?: number) => string) => {
  const millions = load / 1_000_000
  return `${formatNumber(millions, 2, 0)}M`
}

function Readout({ active, label }: { active?: boolean; label?: number }) {
  const { t, formatNumber } = useI18n()
  if (!active || typeof label !== 'number') return null
  const runs = benchmarkRuns.filter((r) => r.load === label)
  if (runs.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2.5 backdrop-blur-sm">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {formatLoad(label, formatNumber)} {t.performance.offeredReadout}
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
                p50 {formatNumber(run.serviceP50Ms, 2)}
              </td>
              <td className="pr-3 py-0.5 text-right text-foreground">
                p99 {formatNumber(run.serviceP99Ms, 2)} ms
              </td>
              <td className="py-0.5 text-right text-muted-foreground">
                {formatNumber(run.deliveryPct, run.deliveryPct === 100 ? 0 : 2)}% {t.performance.delivered}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Plot() {
  const { t, formatNumber } = useI18n()
  const reduceMotion = useReducedMotion()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={p99ByLoad} margin={{ top: 12, right: 30, bottom: 4, left: 4 }}>
        <ReferenceArea
          y1={slo.p99CeilingMs}
          y2={40}
          fill="hsl(var(--primary))"
          fillOpacity={0.05}
          stroke="none"
        />
        <CartesianGrid vertical={false} stroke={axis} strokeOpacity={0.6} />
        <XAxis
          dataKey="load"
          type="category"
          tickFormatter={(load: number) => formatLoad(load, formatNumber)}
          interval={0}
          stroke={axis}
          tick={{ fill: axisText, fontSize: 11, fontFamily: 'var(--font-mono)' }}
          tickLine={false}
          height={28}
        />
        <YAxis
          scale="log"
          domain={[2, 40]}
          ticks={[3, 5, 10, 20, 30]}
          tickFormatter={(v: number) => `${v}`}
          stroke={axis}
          tick={{ fill: axisText, fontSize: 11, fontFamily: 'var(--font-mono)' }}
          tickLine={false}
          width={28}
        />
        <ReferenceLine
          y={slo.p99CeilingMs}
          stroke={axisText}
          strokeDasharray="4 4"
          strokeOpacity={0.7}
          label={{
            value: t.performance.budgetLabel(slo.p99CeilingMs),
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
        <Line
          dataKey="explore"
          stroke="none"
          legendType="none"
          dot={{
            r: 5,
            fill: 'hsl(var(--background))',
            stroke: 'hsl(var(--muted-foreground))',
            strokeWidth: 2,
          }}
          activeDot={false}
          isAnimationActive={!reduceMotion}
          animationBegin={520}
          animationDuration={600}
        />
        <Line
          dataKey="topics"
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
          <LabelList
            dataKey="topics"
            position="right"
            offset={12}
            formatter={(v: number | null) =>
              v == null ? '' : t.performance.topicsLabel(formatNumber(topicsGoalRun.serviceP99Ms, 1))
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
      <ClientOnly>{inView ? <Plot /> : null}</ClientOnly>
    </div>
  )
}
