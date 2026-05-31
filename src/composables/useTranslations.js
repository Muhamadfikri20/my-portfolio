import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'

/**
 * Resolve a dot-notation key against a nested object.
 * Returns the value, or `undefined` if any segment missing.
 */
function resolveKey(messages, key) {
  if (!messages || !key) return undefined
  const segments = key.split('.')
  let value = messages
  for (const seg of segments) {
    if (value && typeof value === 'object' && seg in value) {
      value = value[seg]
    } else {
      return undefined
    }
  }
  return value
}

/**
 * Translation composable.
 *
 * t('sidebar.profile.name')                 → string
 * t('resume.experiences', { returnObjects: true }) → array | object
 *
 * Fallback strategy:
 * 1. Lookup in active language.
 * 2. If undefined, lookup in English.
 * 3. If still undefined, return the key itself (debug aid).
 */
export function useTranslations() {
  const langStore = useLanguageStore()

  function t(key, options = {}) {
    const returnObjects = !!options.returnObjects

    let value = resolveKey(langStore.messages, key)
    if (value === undefined) {
      value = resolveKey(langStore.allMessages.en, key)
    }
    if (value === undefined) return key

    if (returnObjects) return value
    return typeof value === 'string' ? value : key
  }

  return {
    t,
    language: computed(() => langStore.language),
    direction: computed(() => langStore.direction),
  }
}
