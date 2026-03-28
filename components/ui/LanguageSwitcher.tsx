'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslations } from '@/hooks/useTranslations'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslations()

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-primary-400 dark:hover:bg-primary-900 dark:hover:bg-opacity-20"
        title="Change language"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </button>
      
      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-3 ${
              language === lang.code 
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20' 
                : 'text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
