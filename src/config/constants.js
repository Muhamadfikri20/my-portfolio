/**
 * Project-wide constants (immutable defaults + storage keys).
 */

export const ADMIN_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com'

export const STORAGE_KEYS = {
  THEME: 'portfolio-theme',
  DARK_MODE: 'portfolio-dark-mode',
  LANGUAGE: 'portfolio-language',
  REMEMBERED_EMAIL: 'portfolio-remembered-email',
  PRAYER_CACHE: 'portfolio-prayer-cache',
}

export const VALID_THEMES = ['default', 'ocean', 'forest', 'sunset']

export const THEME_LABELS = {
  default: 'Classic',
  ocean: 'Ocean Breeze',
  forest: 'Forest Green',
  sunset: 'Sunset Glow',
}

export const VALID_LANGUAGES = ['en', 'id', 'ar']

export const LANGUAGE_LABELS = {
  en: 'English',
  id: 'Bahasa Indonesia',
  ar: 'العربية',
}
