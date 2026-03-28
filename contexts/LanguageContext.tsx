'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'id' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  direction: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Set direction based on language
  const direction = language === 'ar' ? 'rtl' : 'ltr'

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language
    if (savedLanguage && ['en', 'id', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    // Update document direction
    document.documentElement.dir = direction
    document.documentElement.lang = language
  }, [language, direction])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
