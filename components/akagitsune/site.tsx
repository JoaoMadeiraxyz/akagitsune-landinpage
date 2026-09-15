'use client'

import { Navbar } from './navbar'
import { HeroSection } from './hero-section'
import { WhatItIsSection } from './what-it-is-section'
import { PerformanceSection } from './performance-section'
import { ProtocolSection } from './protocol-section'
import { ScopeSection } from './scope-section'
import { CharactersSection } from './characters-section'
import { RoadmapSection } from './roadmap-section'
import { FooterSection } from './footer-section'

export function AkagitsuneSite() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <WhatItIsSection />
        <PerformanceSection />
        <ProtocolSection />
        <ScopeSection />
        <CharactersSection />
        <RoadmapSection />
        <FooterSection />
      </main>
    </div>
  )
}
