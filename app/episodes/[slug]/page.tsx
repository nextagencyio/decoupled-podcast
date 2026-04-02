import { getClient } from '@/lib/drupal-client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Mic, User, ExternalLink } from 'lucide-react'
import { GET_NODE_BY_PATH } from '@/lib/queries'
import { notFound } from 'next/navigation'
import type { DrupalEpisode } from '@/lib/types'

export const dynamic = 'force-dynamic'

interface EpisodePageProps {
  params: Promise<{ slug: string }>
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params
  const client = getClient()

  let episode: DrupalEpisode | null = null

  try {
    const { data } = await client.query({
      query: GET_NODE_BY_PATH,
      variables: { path: `/episodes/${slug}` },
    })
    episode = data?.route?.entity
  } catch (e) {
    console.error('Failed to fetch episode:', e)
  }

  if (!episode) {
    notFound()
  }

  const date = episode.publishDate
    ? new Date(episode.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(episode.created.timestamp * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/episodes"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all episodes
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
            {episode.season && episode.episodeNumber && (
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-medium">
                Season {episode.season}, Episode {episode.episodeNumber}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {episode.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            {episode.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{episode.duration}</span>
              </div>
            )}
            {episode.guestName && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Guest: {episode.guestName}</span>
              </div>
            )}
          </div>

          {episode.audioUrl && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <a
                href={episode.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                <Mic className="h-5 w-5" />
                Listen to Episode
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </header>

        {episode.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={episode.image.url}
              alt={episode.image.alt || episode.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {episode.body?.processed && (
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: episode.body.processed }}
          />
        )}
      </div>
    </article>
  )
}
