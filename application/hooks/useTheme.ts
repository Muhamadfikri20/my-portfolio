'use client'

import { useState, useEffect } from 'react'
import type { ThemeTemplate, ThemeConfig } from '@/domain/models/Theme'
import { themeService } from '@/application/services/themeService'

/**
 * Theme hook — manages theme state and applies CSS custom properties.
 * Consumes themeService (application layer).
 */
export function useThemeLogic() {
  const [currentTheme, setCurrentTheme] = useState<ThemeTemplate>('default')
  const [isDark, setIsDark] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const prefs = themeService.loadPreferences()
    setCurrentTheme(prefs.theme)
    setIsDark(prefs.isDark)
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    themeService.applyTheme(currentTheme, isDark)
    themeService.savePreferences(currentTheme, isDark)
  }, [currentTheme, isDark])

  const setTheme = (theme: ThemeTemplate) => {
    setCurrentTheme(theme)
  }

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev)
  }

  const themeConfig: ThemeConfig = themeService.getThemeConfig(currentTheme)

  return {
    currentTheme,
    setTheme,
    themeConfig,
    isDark,
    toggleDarkMode,
  }
}
