'use client'

import { useLanguageContext } from '@/presentation/providers/LanguageProvider'
import { resolveTranslation, resolveTranslationObject } from '@/infrastructure/i18n/messageLoader'

/**
 * Translation hook — provides `t()` function for components.
 * Consumes messageLoader (infrastructure layer) and LanguageContext (presentation layer).
 */
export function useTranslations() {
  const { language } = useLanguageContext()

  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    if (options?.returnObjects) {
      return resolveTranslationObject(language, key)
    }
    return resolveTranslation(language, key)
  }

  return { t, language }
}
