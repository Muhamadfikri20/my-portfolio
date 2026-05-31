'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { ThemeContextType } from '@/domain/models/Theme'
import { useThemeLogic } from '@/application/hooks/useTheme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Thin provider wrapper — delegates all logic to useThemeLogic hook.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeLogic()

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Re-export ThemeTemplate for convenience
export type { ThemeTemplate } from '@/domain/models/Theme'
