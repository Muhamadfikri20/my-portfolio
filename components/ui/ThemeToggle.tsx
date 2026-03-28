'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { isDark, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-primary-400 dark:hover:bg-primary-900 dark:hover:bg-opacity-20 ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="flex items-center gap-2">
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
        {showLabel && (
          <span className="text-sm font-medium">
            {isDark ? 'Light' : 'Dark'} Mode
          </span>
        )}
      </div>
    </button>
  )
} 