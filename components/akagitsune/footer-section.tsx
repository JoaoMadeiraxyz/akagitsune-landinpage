'use client'

import Image from 'next/image'
import { Container } from '@/components/layouts/container'
import { useI18n } from '@/components/i18n-provider'
import { Github, ExternalLink } from 'lucide-react'

export function FooterSection() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-border py-16">
      <Container size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt={t.nav.logoAlt} fill className="object-contain" />
            </div>
            <div>
              <p className="font-display font-bold text-lg">Akagitsune</p>
              <p className="text-xs text-muted-foreground">{t.footer.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/JoaoMadeiraxyz/akagitsune"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={16} />
              {t.footer.repository}
            </a>
            <a
              href="https://github.com/JoaoMadeiraxyz/akagitsune/blob/main/docs/architecture.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
              {t.footer.architecture}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t.footer.builtWith}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">GATEWAY_ADDR</span>
            <code className="font-mono text-xs text-primary bg-primary/5 px-2 py-0.5 rounded">
              127.0.0.1:3000
            </code>
          </div>
        </div>
      </Container>
    </footer>
  )
}
