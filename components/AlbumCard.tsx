'use client'

import Link from 'next/link'
import { Album } from '@/lib/supabase'

interface Props {
  album: Album
}

export default function AlbumCard({ album }: Props) {
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A.75.75 0 0021.75 19.5V6A.75.75 0 0021 5.25H3A.75.75 0 002.25 6v13.5A.75.75 0 003 20.25z" />
            </svg>
            <span className="text-xs text-gray-400">Aucune photo</span>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-gray-900 text-center truncate px-1 group-hover:text-gray-500 transition-colors">
        {album.name}
      </p>
    </Link>
  )
}
