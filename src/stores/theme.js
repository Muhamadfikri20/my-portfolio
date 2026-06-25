import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { STORAGE_KEYS, VALID_THEMES } from '@/config/constants'

/**
 * Theme store — dark/light mode + 4 accent themes.
 * Accent is applied via `data-theme` on <html>; main.css swaps the
 * brand hue so the whole palette reskins. Dark mode via `.dark` class.
 */

function applyDark(isDark) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark)
}
function applyTheme(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
}

export const useThemeStore = defineStore('theme', () => {
  const storedDark = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true'
    : false
  const storedTheme = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEYS.THEME)
    : null

  const isDark = ref(storedDark)
  const theme = ref(VALID_THEMES.includes(storedTheme) ? storedTheme : 'default')

  // Initial DOM apply (avoid FOUC)
  applyDark(isDark.value)
  applyTheme(theme.value)

  watch(isDark, (val) => {
    try { localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(val)) } catch { /* ignore */ }
    applyDark(val)
  })
  watch(theme, (val) => {
    try { localStorage.setItem(STORAGE_KEYS.THEME, val) } catch { /* ignore */ }
    applyTheme(val)
  })

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }
  function setDarkMode(value) {
    isDark.value = !!value
  }
  function setTheme(value) {
    if (VALID_THEMES.includes(value)) theme.value = value
  }

  return {
    isDark,
    theme,
    toggleDarkMode,
    setDarkMode,
    setTheme,
  }
})
