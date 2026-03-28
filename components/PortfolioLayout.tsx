'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ResumeSection from './sections/ResumeSection'
import ShowcaseSection from './sections/ShowcaseSection'
import KnowledgeBaseSection from './sections/KnowledgeBaseSection'
import { useLanguage } from '@/contexts/LanguageContext'

export type SectionType = 'resume' | 'showcase' | 'knowledge'

export default function PortfolioLayout() {
  const [activeSection, setActiveSection] = useState<SectionType>('resume')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { direction } = useLanguage()

  const renderContent = () => {
    switch (activeSection) {
      case 'resume':
        return <ResumeSection />
      case 'showcase':
        return <ShowcaseSection />
      case 'knowledge':
        return <KnowledgeBaseSection />
      default:
        return <ResumeSection />
    }
  }

  return (
    <div className={`flex min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 top-16 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${direction === 'rtl' ? 'lg:mr-72' : 'lg:ml-72'}`}>
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          activeSection={activeSection}
        />
        <main className="px-4 py-6 lg:px-8 pt-20">
          {renderContent()}
        </main>
      </div>
    </div>
  )
} 