import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'eJoi - Tu compañera virtual con memoria',
  description: 'Plataforma de acompañamiento personal con IA. Una relación continua con una compañera virtual que recuerda tus gustos, hitos y contexto para que el vínculo evolucione.',
  keywords: ['IA', 'compañera virtual', 'chatbot', 'memoria persistente', 'avatar', 'Chile'],
  authors: [{ name: 'eJoi' }],
  openGraph: {
    title: 'eJoi - Tu compañera virtual con memoria',
    description: 'Plataforma de acompañamiento personal con IA. Una relación continua con una compañera virtual.',
    type: 'website',
    locale: 'es_CL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

