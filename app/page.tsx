'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, Album } from '@/lib/supabase'
import Header from '@/components/Header'
import AlbumCard from '@/components/AlbumCard'
import NewAlbumModal from '@/components/NewAlbumModal'

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchAlbums = useCallback(async () => {
    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setAlbums(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchAlbums() }, [fetchAlbums])

  return (
    <div className="min-h-screen bg-white">
      <Header onNewAlbum={() => setShowModal(true)} />

      <main className="max-w-7xl mx-auto px-6 py-14">
        {/* Hero text */}
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-5">
          Ma ville est mon école
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mb-14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        {/* Albums */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75z" />
            </svg>
            <p className="text-base">Aucun album pour l&apos;instant.</p>
            <p className="text-sm">Créez votre premier album avec le bouton &ldquo;Nouvel Album&rdquo;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {albums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <NewAlbumModal
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false)
            fetchAlbums()
          }}
        />
      )}
    </div>
  )
}
