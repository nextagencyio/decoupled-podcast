import Link from 'next/link'
import { Mic } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Mic className="h-6 w-6 text-purple-500" />
              <span>The Deep Dive</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Weekly conversations with the world&apos;s most interesting thinkers, builders, and creators.
              We go beyond the surface to explore the ideas shaping our future.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/episodes" className="text-gray-400 hover:text-white transition-colors">
                  All Episodes
                </Link>
              </li>
              <li>
                <Link href="/hosts" className="text-gray-400 hover:text-white transition-colors">
                  Hosts
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Listen */}
          <div>
            <h3 className="text-white font-semibold mb-4">Listen</h3>
            <p className="text-gray-400 text-sm mb-4">
              New episodes every week. Subscribe on your favorite platform.
            </p>
            <Link
              href="/episodes"
              className="inline-block bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Episodes
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} The Deep Dive Podcast. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Powered by{' '}
            <a
              href="https://decoupled.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Decoupled.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
