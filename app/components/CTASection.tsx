'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Get in Touch'
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Contact Us'

  return (
    <section className="bg-gray-900 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">{title}</h2>
        <Link href="/contact" className="inline-block border-2 border-purple-500 text-purple-300 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-purple-600 hover:text-white transition-colors duration-200">{primaryLabel}</Link>
      </div>
    </section>
  )
}
