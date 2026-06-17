'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, Album, Photo } from '@/lib/supabase'
import Lightbox from '@/components/Lightbox'

export default function AlbumPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [album, setAlbum] = useState<Album | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const paths = photos.map(p => p.storage_path).filter(Boolean) as string[]
      if (paths.length > 0) await supabase.storage.from('photos').remove(paths)
      await supabase.from('albums').delete().eq('id', id)
      router.push('/')
    } catch {
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

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
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white transition text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </Link>
        <h1 className="text-base font-semibold truncate absolute left-1/2 -translate-x-1/2 max-w-[50%]">{album.name}</h1>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
        >
          Supprimer
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{album.name}</h2>
          {album.description && <p className="text-gray-500 text-base leading-relaxed max-w-2xl">{album.description}</p>}
          <p className="text-xs text-gray-400 mt-3">{photos.length} photo{photos.length !== 1 ? 's' : ''}</p>
        </div>

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
              <button key={photo.id} onClick={() => setLightboxIndex(i)}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 group focus:outline-none focus:ring-2 focus:ring-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </main>

      {lightboxIndex !== null && (
        <Lightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-5 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Supprimer l&apos;album</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                &ldquo;{album.name}&rdquo; et toutes ses photos seront supprimés définitivement.
              </p>
            </div>
            <div className="border-t border-gray-100 flex divide-x divide-gray-100">
              <button onClick={() => setShowDeleteConfirm(false)} disabled={deleting}
                className="flex-1 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
                Annuler
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition disabled:opacity-50 flex items-center justify-center gap-2">
                {deleting ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
