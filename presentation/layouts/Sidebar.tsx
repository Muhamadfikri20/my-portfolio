'use client'

import { User, Briefcase, BookOpen, X } from 'lucide-react'
import { MdChromeReaderMode } from "react-icons/md"
import clsx from 'clsx'
import type { SectionType } from './PortfolioLayout'
import PrayerTimeCountdown from './ui/PrayerTimeCountdown'
import { useTranslations } from '@/hooks/useTranslations'
import { useLanguage } from '@/contexts/LanguageContext'

interface SidebarProps {
  activeSection: SectionType
  onSectionChange: (section: SectionType) => void
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export default function Sidebar({ activeSection, onSectionChange, isOpen, onToggle, onClose }: SidebarProps) {
  const { t } = useTranslations()
  const { direction } = useLanguage()
  
  const navigationItems = [
    {
      id: 'resume' as SectionType,
      label: t('sidebar.navigation.resume.label'),
      icon: User,
      description: t('sidebar.navigation.resume.description')
    },
    {
      id: 'showcase' as SectionType,
      label: t('sidebar.navigation.showcase.label'),
      icon: Briefcase,
      description: t('sidebar.navigation.showcase.description')
    },
    {
      id: 'knowledge' as SectionType,
      label: t('sidebar.navigation.knowledge.label'),
      icon: BookOpen,
      description: t('sidebar.navigation.knowledge.description')
    }
  ]

  const handleSectionChange = (section: SectionType) => {
    onSectionChange(section)
    onClose() // Close sidebar on mobile after selection
  }

  return (
          <aside className={`fixed top-16 h-[calc(100vh-4rem)] w-72 bg-neutral-50 border-neutral-200 p-4 z-20 transform transition-all duration-300 lg:translate-x-0 dark:bg-neutral-900 dark:border-neutral-700 ${
        direction === 'rtl' 
          ? `right-0 border-l ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
          : `left-0 border-r ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
      }`}>
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={onClose}
          className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
          aria-label={t('common.closeMenu')}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="mb-6 lg:mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary-200 dark:border-primary-600">
          <img 
            src="/assets/icons/general/profile.png" 
            alt="Rheyno Apria Pratama"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold theme-text">{t('sidebar.profile.name')}</h2>
        <p className="text-sm theme-text-secondary">{t('sidebar.profile.title')}</p>
        <p className="text-xs theme-text-secondary mt-1">{t('sidebar.profile.experience')}</p>
      </div>

      {/* Prayer Time Countdown */}
      <div className="mb-6">
        <PrayerTimeCountdown />
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            className={clsx(
              'sidebar-nav-item w-full text-left',
              activeSection === item.id && 'active'
            )}
          >
            <item.icon className="w-5 h-5" />
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MdChromeReaderMode className="w-4 h-4 theme-primary" />
          <span className="text-xs font-medium theme-text-secondary">{t('sidebar.footer.portfolio')}</span>
        </div>
        <div className="text-xs theme-text-secondary text-center">
          {t('sidebar.footer.copyright')}
        </div>
      </div>
    </aside>
  )
} 