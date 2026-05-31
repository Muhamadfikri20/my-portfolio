'use client'

import { useState, useEffect } from 'react'
import type { Language } from '@/domain/constants/languages'
import { SUPPORTED_LANGUAGES, getDirection } from '@/domain/constants/languages'
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter'

const LANGUAGE_KEY = 'portfolio-language'

/**
 * Language hook — manages language state with RTL support.
 * Consumes localStorageAdapter (infrastructure layer).
 */
export function useLanguageLogic() {
  const [language, setLanguageState] = useState<Language>('en')

  const direction = getDirection(language)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorageAdapter.get<string>(LANGUAGE_KEY) as Language | null
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language and update document direction when it changes
  useEffect(() => {
    localStorageAdapter.set(LANGUAGE_KEY, language)
    document.documentElement.dir = direction
    document.documentElement.lang = language
  }, [language, direction])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  return {
    language,
    setLanguage,
    direction,
  }
}
