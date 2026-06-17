import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ma ville est mon école',
  description: 'Galerie photo — Ma ville est mon école',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
