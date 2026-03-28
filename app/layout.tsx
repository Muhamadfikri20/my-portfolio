import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Rheyno Apria Pratama - Software Engineer',
  description: 'Portfolio website of Rheyno Apria Pratama, a Software Engineer with 5+ years of experience in backend development and infrastructure.',
  keywords: ['Software Engineer', 'Backend Developer', 'Infrastructure', 'Portfolio'],
  authors: [{ name: 'Rheyno Apria Pratama' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Rheyno Apria Pratama - Software Engineer',
    description: 'Portfolio website showcasing experience and projects',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
} 