'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { LOCALE_COOKIE, intlLocale, type Locale } from '@/lib/i18n/config'
import { dictionaries, type Dictionary } from '@/lib/i18n/dictionaries'

type I18nContextValue = {
  locale: Locale
  /** BCP 47 tag for Intl/number formatting. */
  intl: string
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

/**
 * `initialLocale` is resolved on the server (cookie, then Accept-Language), so SSR
 * and the first client render agree and there is no hydration mismatch.
 */
export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    document.documentElement.lang = next
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({ locale, intl: intlLocale[locale], t: dictionaries[locale], setLocale }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
