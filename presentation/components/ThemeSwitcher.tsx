'use client'

import { Palette, Sun, Moon, Check } from 'lucide-react'
import { useTheme, type ThemeTemplate } from '@/contexts/ThemeContext'
import { useTranslations } from '@/hooks/useTranslations'

const themes: { id: ThemeTemplate; name: string; description: string; preview: string[] }[] = [
  {
    id: 'default',
    name: 'Classic',
    description: 'Clean and professional',
    preview: ['#3b82f6', '#6366f1', '#8b5cf6']
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Calming blue tones',
    preview: ['#0ea5e9', '#06b6d4', '#0891b2']
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural green tones',
    preview: ['#059669', '#047857', '#065f46']
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    description: 'Warm orange tones',
    preview: ['#f97316', '#ea580c', '#dc2626']
  }
]

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, isDark, toggleDarkMode } = useTheme()
  const { t } = useTranslations()

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-primary-400 dark:hover:bg-primary-900 dark:hover:bg-opacity-20"
        title="Change theme"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Theme</span>
      </button>
      
      {/* Theme Selection Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {/* Dark Mode Toggle */}
        <div className="px-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDark ? (
                <Moon className="w-4 h-4 text-yellow-500" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
              )}
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-primary-600' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Theme Options */}
        <div className="px-4 pt-3">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            Choose Theme
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                  currentTheme === theme.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                {/* Theme Preview */}
                <div className="flex gap-1 mb-2">
                  {theme.preview.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                {/* Theme Info */}
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {theme.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {theme.description}
                  </div>
                </div>

                {/* Selected Indicator */}
                {currentTheme === theme.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Info */}
        <div className="px-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
            Theme preferences are saved automatically
          </div>
        </div>
      </div>
    </div>
  )
}
