import type { ThemeTemplate, ThemeConfig } from '@/domain/models/Theme'
import { themeConfigs } from '@/domain/constants/themes'
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter'

const THEME_KEY = 'portfolio-theme'
const DARK_MODE_KEY = 'portfolio-dark-mode'

/**
 * Theme service — manages theme application and persistence.
 * Does not depend on React.
 */
export const themeService = {
  getThemeConfig(theme: ThemeTemplate): ThemeConfig {
    return themeConfigs[theme]
  },

  getAllThemes(): Record<ThemeTemplate, ThemeConfig> {
    return themeConfigs
  },

  /**
   * Apply theme colors as CSS custom properties on the document root.
   */
  applyTheme(theme: ThemeTemplate, isDark: boolean): void {
    if (typeof window === 'undefined') return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(isDark ? 'dark' : 'light')

    const config = themeConfigs[theme]
    const colors = isDark ? config.darkColors : config.colors

    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-text', colors.text)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
    root.style.setProperty('--color-border', colors.border)
    root.style.setProperty('--color-success', colors.success)
    root.style.setProperty('--color-warning', colors.warning)
    root.style.setProperty('--color-error', colors.error)
  },

  /**
   * Save theme preferences to localStorage.
   */
  savePreferences(theme: ThemeTemplate, isDark: boolean): void {
    localStorageAdapter.set(THEME_KEY, theme)
    localStorageAdapter.set(DARK_MODE_KEY, isDark.toString())
  },

  /**
   * Load saved theme preferences from localStorage.
   */
  loadPreferences(): { theme: ThemeTemplate; isDark: boolean } {
    const savedTheme = localStorageAdapter.get<string>(THEME_KEY) as ThemeTemplate | null
    const savedDarkMode = localStorageAdapter.get<string>(DARK_MODE_KEY) === 'true'

    return {
      theme: savedTheme && themeConfigs[savedTheme] ? savedTheme : 'default',
      isDark: savedDarkMode,
    }
  },
}
