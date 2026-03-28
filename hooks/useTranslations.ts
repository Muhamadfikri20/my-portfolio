'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import enMessages from '@/messages/en.json'
import idMessages from '@/messages/id.json'
import arMessages from '@/messages/ar.json'

type Messages = typeof enMessages

const messages: Record<string, Messages> = {
  en: enMessages,
  id: idMessages,
  ar: arMessages
}

export function useTranslations() {
  const { language } = useLanguage()
  
  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.')
    let value: any = messages[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if translation not found
        value = messages.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return the key if no translation found
          }
        }
        break
      }
    }
    
    if (options?.returnObjects) {
      return value
    }
    
    return typeof value === 'string' ? value : key
  }

  return { t, language }
}
