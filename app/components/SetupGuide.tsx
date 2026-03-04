import { AlertCircle, ExternalLink, Terminal } from 'lucide-react'

interface SetupGuideProps {
  missingVars: string[]
}

export function SetupGuide({ missingVars }: SetupGuideProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <AlertCircle className="h-6 w-6 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Setup Required</h1>
          </div>

          <p className="text-gray-400 mb-6">
            Welcome to The Deep Dive Podcast starter! To get started, configure the following environment variables:
          </p>

          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Missing Environment Variables:
            </h3>
            <ul className="space-y-1">
              {missingVars.map((envVar) => (
                <li key={envVar} className="text-amber-400 font-mono text-sm">
                  {envVar}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="border-l-2 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                1. Set up Drupal Backend
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Run the setup script to create a Drupal space:
              </p>
              <div className="bg-gray-900 rounded-lg p-3 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-gray-500" />
                <code className="text-purple-400 text-sm">npm run setup</code>
              </div>
            </div>

            <div className="border-l-2 border-gray-600 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                2. Import Content
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Import sample podcast content:
              </p>
              <div className="bg-gray-900 rounded-lg p-3 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-gray-500" />
                <code className="text-purple-400 text-sm">npm run setup-content</code>
              </div>
            </div>

            <div className="border-l-2 border-gray-600 pl-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Start Development Server
              </h3>
              <div className="bg-gray-900 rounded-lg p-3 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-gray-500" />
                <code className="text-purple-400 text-sm">npm run dev</code>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              Or enable demo mode by setting <code className="text-purple-400">NEXT_PUBLIC_DEMO_MODE=true</code> in{' '}
              <code className="text-purple-400">.env.local</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
