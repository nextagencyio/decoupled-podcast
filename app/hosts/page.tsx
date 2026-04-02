import { getClient } from '@/lib/drupal-client'
import { GET_HOST_LIST } from '@/lib/queries'
import { HostCard } from '../components/HostCard'
import type { HostListData } from '@/lib/types'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export default async function HostsPage() {
  const client = getClient()

  let hosts: any[] = []
  let error: string | null = null

  try {
    const { data } = await client.query<HostListData>({
      query: GET_HOST_LIST,
    })
    hosts = data?.nodeHosts?.nodes || []
  } catch (e: any) {
    console.error('Failed to fetch hosts:', e)
    error = e.message
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet the Hosts
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The voices behind The Deep Dive. Learn about the people who bring you
            thoughtful conversations every week.
          </p>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400">Failed to load hosts: {error}</p>
          </div>
        )}

        {hosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {hosts.map((host) => (
              <HostCard key={host.id} host={host} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No hosts yet. Import sample content with:
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
