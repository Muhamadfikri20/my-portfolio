export type Language = 'en' | 'id' | 'ar'

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'id', 'ar']

export const RTL_LANGUAGES: Language[] = ['ar']

export interface LanguageInfo {
  code: Language
  name: string
  flag: string
}

export const LANGUAGE_LIST: LanguageInfo[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export function isRtlLanguage(lang: Language): boolean {
  return RTL_LANGUAGES.includes(lang)
}

export function getDirection(lang: Language): 'ltr' | 'rtl' {
  return isRtlLanguage(lang) ? 'rtl' : 'ltr'
}
