import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { STORAGE_KEYS, VALID_THEMES } from '@/config/constants'

function applyToDOM(theme, isDark) {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  for (const t of VALID_THEMES) html.classList.remove(`theme-${t}`)
  html.classList.add(`theme-${theme}`)
  html.classList.toggle('dark', isDark)
}

export const useThemeStore = defineStore('theme', () => {
  // ─── Hydrate from localStorage ───
  const storedTheme = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEYS.THEME)
    : null
  const storedDark = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true'
    : false

  const currentTheme = ref(
    VALID_THEMES.includes(storedTheme) ? storedTheme : 'default',
  )
  const isDark = ref(storedDark)

  // ─── Initial DOM apply (avoid FOUC) ───
  applyToDOM(currentTheme.value, isDark.value)

  // ─── Watch & persist & re-apply ───
  watch(currentTheme, (val) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, val)
    } catch {
      // Ignore quota / privacy mode errors
    }
    applyToDOM(val, isDark.value)
  })
  watch(isDark, (val) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(val))
    } catch {
      // Ignore quota / privacy mode errors
    }
    applyToDOM(currentTheme.value, val)
  })

  // ─── Actions ───
  function setTheme(theme) {
    if (VALID_THEMES.includes(theme)) currentTheme.value = theme
  }

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  return {
    currentTheme,
    isDark,
    themes: VALID_THEMES,
    setTheme,
    toggleDarkMode,
  }
})
