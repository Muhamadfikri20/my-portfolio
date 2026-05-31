import enMessages from './messages/en.json'
import idMessages from './messages/id.json'
import arMessages from './messages/ar.json'
import type { Language } from '@/domain/constants/languages'

type Messages = typeof enMessages

const allMessages: Record<Language, Messages> = {
  en: enMessages,
  id: idMessages as unknown as Messages,
  ar: arMessages as unknown as Messages,
}

/**
 * Resolve a translation key using dot-notation.
 * Falls back to English if key not found in target language.
 * Returns the key itself if not found in any language.
 */
export function resolveTranslation(lang: Language, key: string): string {
  const keys = key.split('.')

  // Try target language
  let value: unknown = allMessages[lang]
  for (const k of keys) {
    if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k]
    } else {
      // Fallback to English
      value = allMessages.en
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in (value as Record<string, unknown>)) {
          value = (value as Record<string, unknown>)[fallbackKey]
        } else {
          return key
        }
      }
      break
    }
  }

  return typeof value === 'string' ? value : key
}

/**
 * Resolve a translation key and return the raw value (object or string).
 * Useful for getting arrays or nested objects from translations.
 */
export function resolveTranslationObject(lang: Language, key: string): unknown {
  const keys = key.split('.')

  let value: unknown = allMessages[lang]
  for (const k of keys) {
    if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k]
    } else {
      // Fallback to English
      value = allMessages.en
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in (value as Record<string, unknown>)) {
          value = (value as Record<string, unknown>)[fallbackKey]
        } else {
          return key
        }
      }
      break
    }
  }

  return value
}
