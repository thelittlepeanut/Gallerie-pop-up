'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, Album, Photo } from '@/lib/supabase'
import Lightbox from '@/components/Lightbox'

export default function AlbumPage() {
  const params = useParams()
  const id = params.id as string

  const [album, setAlbum] = useState<Album | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: albumData }, { data: photosData }] = await Promise.all([
        supabase.from('albums').select('*').eq('id', id).single(),
        supabase.from('photos').select('*').eq('album_id', id).order('created_at', { ascending: true }),
      ])
      setAlbum(albumData)
      setPhotos(photosData ?? [])
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!album) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p>Album introuvable.</p>
        <Link href="/" className="text-black underline text-sm">Retour à l&apos;accueil</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4 flex items-center gap-4 sticky top-0 z-40">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </Link>
        <span className="text-white/30">|</span>
        <h1 className="text-base font-semibold truncate">{album.name}</h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Album info */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{album.name}</h2>
          {album.description && (
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl">{album.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-3">
            {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Photos grid */}
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-2">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75z" />
            </svg>
            <p>Aucune photo dans cet album.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setLightboxIndex(i)}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 group focus:outline-none focus:ring-2 focus:ring-black"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </main>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
