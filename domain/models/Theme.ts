export type ThemeTemplate = 'default' | 'ocean' | 'forest' | 'sunset'

export interface ThemeColors {
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

export interface ThemeConfig {
  name: string
  displayName: string
  description: string
  colors: ThemeColors
  darkColors: ThemeColors
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

export interface ThemeContextType {
  currentTheme: ThemeTemplate
  setTheme: (theme: ThemeTemplate) => void
  themeConfig: ThemeConfig
  isDark: boolean
  toggleDarkMode: () => void
}
