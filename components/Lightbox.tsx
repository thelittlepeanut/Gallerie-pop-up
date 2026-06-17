'use client'

import { useState, useEffect, useCallback } from 'react'
import { Photo } from '@/lib/supabase'

interface Props {
  photos: Photo[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ photos, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)

  const prev = useCallback(() => setIndex(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setIndex(i => Math.min(photos.length - 1, i + 1)), [photos.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        onClick={onClose}
        aria-label="Fermer"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          className="absolute left-3 text-white/70 hover:text-white transition w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
          onClick={e => { e.stopPropagation(); prev() }}
          aria-label="Précédent"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[index].url}
        alt=""
        onClick={e => e.stopPropagation()}
        className="max-h-[90vh] max-w-[88vw] object-contain rounded-lg shadow-2xl select-none"
        draggable={false}
      />

      {/* Next */}
      {index < photos.length - 1 && (
        <button
          className="absolute right-3 text-white/70 hover:text-white transition w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Suivant"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
        {index + 1} / {photos.length}
      </div>
    </div>
  )
}
