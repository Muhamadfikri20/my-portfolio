import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { STORAGE_KEYS } from '@/config/constants'

/**
 * Theme store (hgis-vue style) — light/dark mode only.
 * Previous v2.0 had 4 brand themes; now using single hgis-vue brand blue palette.
 * Multi-theme infrastructure removed for design consistency with hgis-vue.
 */

function applyToDOM(isDark) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark)
}

export const useThemeStore = defineStore('theme', () => {
  // Hydrate from localStorage
  const storedDark = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true'
    : false

  const isDark = ref(storedDark)

  // Initial DOM apply (avoid FOUC)
  applyToDOM(isDark.value)

  // Watch + persist + re-apply
  watch(isDark, (val) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(val))
    } catch {
      // Ignore quota / privacy mode errors
    }
    applyToDOM(val)
  })

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  function setDarkMode(value) {
    isDark.value = !!value
  }

  return {
    isDark,
    toggleDarkMode,
    setDarkMode,
  }
})
