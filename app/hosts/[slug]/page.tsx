import { getClient } from '@/lib/drupal-client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'
import { GET_NODE_BY_PATH } from '@/lib/queries'
import { notFound } from 'next/navigation'
import type { DrupalHost } from '@/lib/types'

export const dynamic = 'force-dynamic'

interface HostPageProps {
  params: Promise<{ slug: string }>
}

export default async function HostPage({ params }: HostPageProps) {
  const { slug } = await params
  const client = getClient()

  let host: DrupalHost | null = null

  try {
    const { data } = await client.query({
      query: GET_NODE_BY_PATH,
      variables: { path: `/hosts/${slug}` },
    })
    host = data?.route?.entity
  } catch (e) {
    console.error('Failed to fetch host:', e)
  }

  if (!host) {
    notFound()
  }

  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/hosts"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all hosts
        </Link>

        <header className="mb-8 text-center">
          {host.photo && (
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
              <Image
                src={host.photo.url}
                alt={host.photo.alt || host.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {host.title}
          </h1>

          {host.role && (
            <p className="text-purple-400 text-lg font-medium mb-4">{host.role}</p>
          )}

          <div className="flex items-center justify-center gap-4">
            {host.email && (
              <a
                href={`mailto:${host.email}`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                {host.email}
              </a>
            )}
            {host.socialUrl && (
              <a
                href={host.socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                Social
              </a>
            )}
          </div>
        </header>

        {host.body?.processed && (
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: host.body.processed }}
          />
        )}
      </div>
    </article>
  )
}
