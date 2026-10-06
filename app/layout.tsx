import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { cookies, headers } from 'next/headers'
import { I18nProvider } from '@/components/i18n-provider'
import { LOCALE_COOKIE, intlLocale, isLocale, resolveLocale, type Locale } from '@/lib/i18n/config'
import { dictionaries } from '@/lib/i18n/dictionaries'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

async function getLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value
  if (isLocale(saved)) return saved
  return resolveLocale((await headers()).get('accept-language'))
}

const siteMetadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  metadataBase: new URL(
    process.env.SITE_URL ??
      (process.env.VERCEL_ENV === 'production'
        ? 'https://www.akagitsune.org'
        : 'http://localhost:3000')
  ),
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { title, description, shortDescription } = dictionaries[locale].meta
  return {
    ...siteMetadata,
    title,
    description,
    openGraph: {
      title,
      description: shortDescription,
      locale: intlLocale[locale].replace('-', '_'),
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: shortDescription,
      images: ['/og-image.png'],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <I18nProvider initialLocale={locale}>{children}</I18nProvider>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
