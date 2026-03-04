import Link from 'next/link'
import Image from 'next/image'
import { Clock, Mic, Calendar } from 'lucide-react'
import type { DrupalEpisode } from '@/lib/types'

interface EpisodeCardProps {
  episode: DrupalEpisode
  featured?: boolean
}

export function EpisodeCard({ episode, featured = false }: EpisodeCardProps) {
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

  const summary = episode.body?.summary || episode.body?.processed?.replace(/<[^>]*>/g, '').slice(0, 200) || ''

  if (featured) {
    return (
      <Link
        href={episode.path || `/episodes/${episode.id}`}
        className="group block bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-video md:aspect-auto md:h-full min-h-[250px]">
            {episode.image ? (
              <Image
                src={episode.image.url}
                alt={episode.image.alt || episode.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-purple-800/20 to-gray-800 flex items-center justify-center">
                <Mic className="w-16 h-16 text-purple-400/50" />
              </div>
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              {episode.season && episode.episodeNumber && (
                <>
                  <span className="text-purple-400 font-medium">S{episode.season} E{episode.episodeNumber}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                </>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              {episode.duration && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {episode.duration}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
              {episode.title}
            </h2>
            <p className="text-gray-400 line-clamp-3 mb-4">
              {summary}
            </p>
            {episode.guestName && (
              <p className="text-sm text-gray-500">
                Guest: <span className="text-gray-300">{episode.guestName}</span>
              </p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={episode.path || `/episodes/${episode.id}`}
      className="group block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="relative aspect-video">
        {episode.image ? (
          <Image
            src={episode.image.url}
            alt={episode.image.alt || episode.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-800/10 to-gray-800 flex items-center justify-center">
            <Mic className="w-12 h-12 text-purple-400/30" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
          {episode.season && episode.episodeNumber && (
            <>
              <span className="text-purple-400 font-medium">S{episode.season} E{episode.episodeNumber}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
            </>
          )}
          <span>{date}</span>
          {episode.duration && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {episode.duration}
              </span>
            </>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
          {episode.title}
        </h3>
        <p className="text-gray-400 line-clamp-2 mb-4">
          {summary}
        </p>
        {episode.guestName && (
          <p className="text-sm text-gray-500">
            Guest: <span className="text-gray-300">{episode.guestName}</span>
          </p>
        )}
      </div>
    </Link>
  )
}
