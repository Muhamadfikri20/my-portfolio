'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type ThemeTemplate = 'default' | 'ocean' | 'forest' | 'sunset'

export interface ThemeConfig {
  name: string
  displayName: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    warning: string
    error: string
  }
  darkColors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    warning: string
    error: string
  }
  gradients: {
    primary: string
    secondary: string
    background: string
  }
  shadows: {
    small: string
    medium: string
    large: string
  }
}

interface ThemeContextType {
  currentTheme: ThemeTemplate
  setTheme: (theme: ThemeTemplate) => void
  themeConfig: ThemeConfig
  isDark: boolean
  toggleDarkMode: () => void
}

// Theme configurations
const themeConfigs: Record<ThemeTemplate, ThemeConfig> = {
  default: {
    name: 'default',
    displayName: 'Classic',
    description: 'Clean and professional design',
    colors: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#7c3aed',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      textSecondary: '#475569',
      border: '#e2e8f0',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    darkColors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#8b5cf6',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      border: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      secondary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    },
    shadows: {
      small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  },
  ocean: {
    name: 'ocean',
    displayName: 'Ocean Breeze',
    description: 'Calming blue tones inspired by the ocean',
    colors: {
      primary: '#0284c7',
      secondary: '#0891b2',
      accent: '#0e7490',
      background: '#ffffff',
      surface: '#f0f9ff',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      border: '#bae6fd',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    darkColors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#0891b2',
      background: '#0c4a6e',
      surface: '#075985',
      text: '#f0f9ff',
      textSecondary: '#bae6fd',
      border: '#0369a1',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#f87171'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
    },
    shadows: {
      small: '0 1px 3px 0 rgba(14, 165, 233, 0.1), 0 1px 2px 0 rgba(14, 165, 233, 0.06)',
      medium: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
      large: '0 10px 15px -3px rgba(14, 165, 233, 0.1), 0 4px 6px -2px rgba(14, 165, 233, 0.05)'
    }
  },
  forest: {
    name: 'forest',
    displayName: 'Forest Green',
    description: 'Natural green tones for a calming experience',
    colors: {
      primary: '#047857',
      secondary: '#059669',
      accent: '#065f46',
      background: '#ffffff',
      surface: '#f0fdf4',
      text: '#064e3b',
      textSecondary: '#047857',
      border: '#bbf7d0',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626'
    },
    darkColors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#059669',
      background: '#064e3b',
      surface: '#065f46',
      text: '#f0fdf4',
      textSecondary: '#bbf7d0',
      border: '#047857',
      success: '#22c55e',
      warning: '#eab308',
      error: '#f87171'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      secondary: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    },
    shadows: {
      small: '0 1px 3px 0 rgba(5, 150, 105, 0.1), 0 1px 2px 0 rgba(5, 150, 105, 0.06)',
      medium: '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)',
      large: '0 10px 15px -3px rgba(5, 150, 105, 0.1), 0 4px 6px -2px rgba(5, 150, 105, 0.05)'
    }
  },
  sunset: {
    name: 'sunset',
    displayName: 'Sunset Glow',
    description: 'Warm orange and pink tones like a beautiful sunset',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#dc2626',
      background: '#ffffff',
      surface: '#fff7ed',
      text: '#9a3412',
      textSecondary: '#c2410c',
      border: '#fdba74',
      success: '#16a34a',
      warning: '#eab308',
      error: '#dc2626'
    },
    darkColors: {
      primary: '#fb923c',
      secondary: '#f97316',
      accent: '#ea580c',
      background: '#9a3412',
      surface: '#c2410c',
      text: '#fff7ed',
      textSecondary: '#fed7aa',
      border: '#ea580c',
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#f87171'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      secondary: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)'
    },
    shadows: {
      small: '0 1px 3px 0 rgba(249, 115, 22, 0.1), 0 1px 2px 0 rgba(249, 115, 22, 0.06)',
      medium: '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
      large: '0 10px 15px -3px rgba(249, 115, 22, 0.1), 0 4px 6px -2px rgba(249, 115, 22, 0.05)'
    }
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeTemplate>('default')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeTemplate
    const savedDarkMode = localStorage.getItem('portfolio-dark-mode') === 'true'
    
    if (savedTheme && themeConfigs[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
    setIsDark(savedDarkMode)
  }, [])

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(isDark ? 'dark' : 'light')
    
    // Apply CSS custom properties
    const config = themeConfigs[currentTheme]
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
    
    // Save preferences
    localStorage.setItem('portfolio-theme', currentTheme)
    localStorage.setItem('portfolio-dark-mode', isDark.toString())
  }, [currentTheme, isDark])

  const setTheme = (theme: ThemeTemplate) => {
    setCurrentTheme(theme)
  }

  const toggleDarkMode = () => {
    setIsDark(prev => !prev)
  }

  const themeConfig = themeConfigs[currentTheme]

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      themeConfig, 
      isDark, 
      toggleDarkMode 
    }}>
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