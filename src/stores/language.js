import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { STORAGE_KEYS, VALID_LANGUAGES } from '@/config/constants'
import enMessages from '@/locales/en.json'
import idMessages from '@/locales/id.json'
import arMessages from '@/locales/ar.json'

const ALL_MESSAGES = {
  en: enMessages,
  id: idMessages,
  ar: arMessages,
}

function applyToDOM(lang, dir) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
  document.documentElement.dir = dir
  if (document.body) document.body.dir = dir
}

export const useLanguageStore = defineStore('language', () => {
  const stored = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    : null

  const language = ref(VALID_LANGUAGES.includes(stored) ? stored : 'en')

  const direction = computed(() =>
    language.value === 'ar' ? 'rtl' : 'ltr',
  )
  const messages = computed(
    () => ALL_MESSAGES[language.value] || ALL_MESSAGES.en,
  )

  // Initial DOM apply
  applyToDOM(language.value, direction.value)

  watch(language, (val) => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, val)
    } catch {
      // Ignore quota / privacy mode errors
    }
    applyToDOM(val, val === 'ar' ? 'rtl' : 'ltr')
  })

  function setLanguage(lang) {
    if (VALID_LANGUAGES.includes(lang)) language.value = lang
  }

  return {
    language,
    direction,
    messages,
    allMessages: ALL_MESSAGES,
    setLanguage,
  }
})
