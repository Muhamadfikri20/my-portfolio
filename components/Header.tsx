'use client'

import { useState } from 'react'
import { Download, Mail, Github, Linkedin, Menu, Sun, Moon, LogIn, LogOut, User, Edit3 } from 'lucide-react'
import { MdChromeReaderMode } from "react-icons/md"
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/hooks/useTranslations'
import LanguageSwitcher from './ui/LanguageSwitcher'
import ThemeSwitcher from './ui/ThemeSwitcher'
import AuthModal from './ui/AuthModal'

interface HeaderProps {
  onMenuClick: () => void
  activeSection: 'resume' | 'showcase' | 'knowledge'
}

export default function Header({ onMenuClick, activeSection }: HeaderProps) {
  const { isDark, toggleDarkMode } = useTheme()
  const { user, isAuthenticated, logout, isEditMode, toggleEditMode } = useAuth()
  const { t } = useTranslations()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const getSectionInfo = (section: string) => {
    switch (section) {
      case 'resume':
        return { title: t('header.resume.title'), subtitle: t('header.resume.subtitle') }
      case 'showcase':
        return { title: t('header.showcase.title'), subtitle: t('header.showcase.subtitle') }
      case 'knowledge':
        return { title: t('header.knowledge.title'), subtitle: t('header.knowledge.subtitle') }
      default:
        return { title: t('header.default.title'), subtitle: t('header.default.subtitle') }
    }
  }
  
  const sectionInfo = getSectionInfo(activeSection)
  
  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-neutral-200 bg-white px-4 lg:px-8 flex items-center justify-between dark:bg-neutral-900 dark:border-neutral-700 transition-colors duration-300 z-30 backdrop-blur-sm bg-white/95 dark:bg-neutral-900/95">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
          aria-label={t('common.openMenu')}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <MdChromeReaderMode className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-neutral-900 dark:text-neutral-100">{sectionInfo.title}</h1>
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">{sectionInfo.subtitle}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <LanguageSwitcher />
        
        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Social Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="mailto:rheyno.apria@example.com"
            className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-primary-400 dark:hover:bg-primary-900 dark:hover:bg-opacity-20"
            title={t('common.email')}
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/rheynoapria"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-primary-400 dark:hover:bg-primary-900 dark:hover:bg-opacity-20"
            title={t('common.github')}
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/rheynoapria"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-primary-400 dark:hover:bg-primary-900 dark:hover:bg-opacity-20"
            title={t('common.linkedin')}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        
        {/* Authentication Section */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {/* Edit Mode Toggle for Admin */}
            {user?.role === 'admin' && (
              <button
                onClick={toggleEditMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  isEditMode
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                }`}
                title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">{isEditMode ? 'Exit Edit' : 'Edit Mode'}</span>
              </button>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{user?.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{user?.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAuthClick('login')}
              className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Sign In</span>
            </button>
            <button
              onClick={() => handleAuthClick('signup')}
              className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white text-xs lg:text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Up</span>
            </button>
          </div>
        )}

        {/* Download Resume Button */}
        <button className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-neutral-200 text-neutral-700 text-xs lg:text-sm font-medium rounded-md hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 transition-colors dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 dark:focus:ring-neutral-400">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">{t('common.downloadResume')}</span>
          <span className="sm:hidden">{t('common.cv')}</span>
        </button>
      </div>
    </header>

    {/* Auth Modal */}
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      initialMode={authMode}
    />
    </>
  )
} 