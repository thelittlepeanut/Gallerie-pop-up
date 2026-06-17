'use client'

import Link from 'next/link'
import { Album } from '@/lib/supabase'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/albums/${album.id}`} className="group block">
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-sm">
        {album.cover_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={album.cover_url}
            alt={album.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 gap-2">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75z" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-gray-900 text-center truncate px-1 group-hover:text-gray-500 transition-colors">
        {album.name}
      </p>
    </Link>
  )
}
