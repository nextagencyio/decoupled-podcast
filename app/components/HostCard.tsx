import Link from 'next/link'
import Image from 'next/image'
import { Mail, ExternalLink } from 'lucide-react'
import type { DrupalHost } from '@/lib/types'

interface HostCardProps {
  host: DrupalHost
}

export function HostCard({ host }: HostCardProps) {
  const bio = host.body?.processed?.replace(/<[^>]*>/g, '').slice(0, 200) || ''

  return (
    <Link
      href={host.path || `/hosts/${host.id}`}
      className="group block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          {host.photo ? (
            <Image
              src={host.photo.url}
              alt={host.photo.alt || host.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-gray-800 flex items-center justify-center">
              <span className="text-3xl text-purple-400/50 font-bold">{host.title.charAt(0)}</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
          {host.title}
        </h3>
        {host.role && (
          <p className="text-purple-400 text-sm font-medium mb-3">{host.role}</p>
        )}
        <p className="text-gray-400 text-sm line-clamp-3 mb-4">{bio}</p>
        <div className="flex items-center justify-center gap-4">
          {host.email && (
            <span className="text-gray-500 hover:text-purple-400 transition-colors">
              <Mail className="h-4 w-4" />
            </span>
          )}
          {host.socialUrl && (
            <span className="text-gray-500 hover:text-purple-400 transition-colors">
              <ExternalLink className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
