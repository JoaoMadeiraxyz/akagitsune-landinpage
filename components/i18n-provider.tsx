'use client'

import { createContext, useCallback, useContext, useMemo, useState, useTransition, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { LOCALE_COOKIE, intlLocale, type Locale } from '@/lib/i18n/config'
import { dictionaries, type Dictionary } from '@/lib/i18n/dictionaries'

type I18nContextValue = {
  locale: Locale
  /** BCP 47 tag for Intl/number formatting. */
  intl: string
  t: Dictionary
  formatNumber: (value: number, maxFractionDigits?: number, minFractionDigits?: number) => string
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

/**
 * `initialLocale` is resolved on the server (cookie, then Accept-Language), so SSR
 * and the first client render agree and there is no hydration mismatch.
 */
export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()
  const [, startTransition] = useTransition()

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    document.documentElement.lang = next
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => router.refresh())
  }, [router])

  const value = useMemo<I18nContextValue>(
    () => {
      const intl = intlLocale[locale]
      return {
        locale,
        intl,
        t: dictionaries[locale],
        formatNumber: (value, maxFractionDigits = 0, minFractionDigits = maxFractionDigits) =>
          new Intl.NumberFormat(intl, { maximumFractionDigits: maxFractionDigits, minimumFractionDigits: minFractionDigits }).format(value),
        setLocale,
      }
    },
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
