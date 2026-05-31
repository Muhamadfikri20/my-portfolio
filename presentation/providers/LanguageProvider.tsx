'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { Language } from '@/domain/constants/languages'
import { useLanguageLogic } from '@/application/hooks/useLanguage'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  direction: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Thin provider wrapper — delegates all logic to useLanguageLogic hook.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLanguageLogic()

  return (
    <LanguageContext.Provider value={lang}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return context
}

// Alias for backward compatibility
export const useLanguage = useLanguageContext
