import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_HOMEPAGE_DATA, GET_EPISODE_TEASERS } from '@/lib/queries'
import { EpisodeCard } from './components/EpisodeCard'
import Header from './components/Header'
import { SetupGuide } from './components/SetupGuide'
import { Mic, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { checkConfiguration } from '@/lib/config-check'
import type { HomepageData, EpisodeTeaserData, DrupalHomepage } from '@/lib/types'

export const revalidate = 3600

export default async function HomePage() {
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const requestHeaders = await headers()
  const client = getServerApolloClient(requestHeaders)

  let homepageContent: DrupalHomepage | null = null
  let episodes: any[] = []
  let error: string | null = null

  try {
    const [homepageResult, episodesResult] = await Promise.all([
      client.query<HomepageData>({ query: GET_HOMEPAGE_DATA }),
      client.query<EpisodeTeaserData>({ query: GET_EPISODE_TEASERS, variables: { first: 10 } }),
    ])

    homepageContent = homepageResult.data?.nodeHomepages?.nodes?.[0] || null
    episodes = episodesResult.data?.nodeEpisodes?.nodes || []
  } catch (e: any) {
    console.error('Failed to fetch data:', e)
    error = e.message
  }

  const featuredEpisode = episodes.find((ep) => ep.featured) || episodes[0]
  const recentEpisodes = episodes.filter((ep) => ep !== featuredEpisode).slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900 text-white pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-6">
              <Mic className="h-8 w-8 text-purple-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {homepageContent?.heroTitle || 'The Deep Dive Podcast'}
              {(homepageContent?.heroSubtitle || 'Conversations That Matter') && (
                <span className="block text-purple-300 text-2xl md:text-3xl mt-2">
                  {homepageContent?.heroSubtitle || 'Conversations That Matter'}
                </span>
              )}
            </h1>
            <div className="text-lg md:text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              {homepageContent?.heroDescription?.processed ? (
                <div dangerouslySetInnerHTML={{ __html: homepageContent.heroDescription.processed }} />
              ) : (
                <p>Weekly conversations with the world&apos;s most interesting thinkers, builders, and creators.</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/episodes"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {homepageContent?.ctaPrimary || 'Listen Now'}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/hosts"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-800 transition-colors"
              >
                {homepageContent?.ctaSecondary || 'Meet the Hosts'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400">Failed to load episodes: {error}</p>
            </div>
          )}

          {/* Featured Episode */}
          {featuredEpisode && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-gray-400 mb-4">Latest Episode</h2>
              <EpisodeCard episode={featuredEpisode} featured />
            </div>
          )}

          {/* Recent Episodes */}
          {recentEpisodes.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-400">Recent Episodes</h2>
                <Link href="/episodes" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                  View All
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            </div>
          )}

          {episodes.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No episodes yet. Import sample content with:
              </p>
              <code className="text-purple-400 text-sm mt-2 block">
                npm run setup-content
              </code>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {homepageContent?.ctaTitle || 'Never Miss an Episode'}
          </h2>
          <div className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {homepageContent?.ctaDescription?.processed ? (
              <div dangerouslySetInnerHTML={{ __html: homepageContent.ctaDescription.processed }} />
            ) : (
              <p>Subscribe to The Deep Dive and get new episodes delivered every week.</p>
            )}
          </div>
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <Mic className="h-5 w-5" />
            Browse All Episodes
          </Link>
        </div>
      </section>
    </div>
  )
}
