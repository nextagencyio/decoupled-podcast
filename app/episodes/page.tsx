import { getClient } from '@/lib/drupal-client'
import { GET_EPISODE_TEASERS } from '@/lib/queries'
import { EpisodeCard } from '../components/EpisodeCard'
import type { EpisodeTeaserData } from '@/lib/types'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export default async function EpisodesPage() {
  const client = getClient()

  let episodes: any[] = []
  let error: string | null = null

  try {
    const data = await client.raw<EpisodeTeaserData>(GET_EPISODE_TEASERS, { first: 50 })
    episodes = data?.nodeEpisodes?.nodes || []
  } catch (e: any) {
    console.error('Failed to fetch episodes:', e)
    error = e.message
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            All Episodes
          </h1>
          <p className="text-gray-400">
            Browse our complete library of conversations and deep dives.
          </p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400">Failed to load episodes: {error}</p>
          </div>
        )}

        {episodes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
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
  )
}
