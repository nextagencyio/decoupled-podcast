'use client'

import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Clear Thinking. Clean Execution.'
  const subtitle = (homepageContent as any)?.heroSubtitle || ''

  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=2000&q=80&fit=crop"
          alt="Podcast recording setup"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-purple-900/80 to-purple-800/65" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]">{title}</h1>
        {subtitle && <p className="text-lg text-purple-200 mt-8 max-w-xl">{subtitle}</p>}
      </div>
    </section>
  )
}
