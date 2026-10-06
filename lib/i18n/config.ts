export const locales = ['en', 'pt-BR', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Cookie that stores the visitor's explicit choice; it wins over the system language. */
export const LOCALE_COOKIE = 'locale'

export const localeLabels: Record<Locale, { short: string; native: string }> = {
  en: { short: 'EN', native: 'English' },
  'pt-BR': { short: 'PT', native: 'Português (BR)' },
  es: { short: 'ES', native: 'Español' },
}

/** Intl locale tags used for number formatting. */
export const intlLocale: Record<Locale, string> = {
  en: 'en-US',
  'pt-BR': 'pt-BR',
  es: 'es-ES',
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

/** Maps a BCP 47 tag ("pt-PT", "es-MX", "en-GB") onto a supported locale, or null. */
function matchTag(tag: string): Locale | null {
  const primary = tag.toLowerCase().split('-')[0]
  if (primary === 'pt') return 'pt-BR'
  if (primary === 'es') return 'es'
  if (primary === 'en') return 'en'
  return null
}

/**
 * Picks the first supported language from an Accept-Language header, honouring
 * q-values. Falls back to English when nothing matches.
 */
export function resolveLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale

  const ranked = acceptLanguage
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      const weight = q ? Number.parseFloat(q.slice(2)) : 1
      return { tag: tag.trim(), weight: Number.isNaN(weight) ? 0 : weight, index }
    })
    .filter((entry) => entry.tag && entry.tag !== '*' && entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index)

  for (const { tag } of ranked) {
    const match = matchTag(tag)
    if (match) return match
  }
  return defaultLocale
}
