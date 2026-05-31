'use client'

import { useState } from 'react'
import { Calendar, MapPin, Award, Code, Server, Database, Cloud, Users, Briefcase, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import AnimatedGreeting from '../ui/AnimatedGreeting'
import EditableText from '../ui/EditableText'
import { useTranslations } from '@/hooks/useTranslations'

export default function ResumeSection() {
  const { t } = useTranslations()
  
  // Editable content state
  const [editableContent, setEditableContent] = useState({
    introduction: t('resume.introduction'),
    description: t('resume.description'),
    location: t('resume.location'),
    experience: t('resume.experience'),
    expertise: t('resume.expertise')
  })
  
  const experiences = t('resume.experiences', { returnObjects: true }) as any[]

  const skills = {
    backend: [
      { name: 'Python', icon: '/assets/icons/tech/python.webp' },
      { name: 'Node.js', icon: '/assets/icons/tech/node_js.png' },
      { name: 'Go', icon: '/assets/icons/tech/go.png' },
      { name: 'REST API', icon: '/assets/icons/tech/rest.webp' },
      { name: 'Odoo', icon: '/assets/icons/tech/odoo.png' }
    ],
    infrastructure: [
      { name: 'AWS', icon: '/assets/icons/tech/aws.png' },
      { name: 'Google Cloud', icon: '/assets/icons/tech/gcp.png' },
      { name: 'Docker', icon: '/assets/icons/tech/docker.png' },
      { name: 'Kubernetes', icon: '/assets/icons/tech/k8s.png' },
      { name: 'GitLab CI', icon: '/assets/icons/tech/gitlab_ci.png' },
      { name: 'Prometheus', icon: '/assets/icons/tech/prometheus.png' },
      { name: 'Shell', icon: '/assets/icons/tech/shell.png' },
      { name: 'Open Telemetry', icon: '/assets/icons/tech/opentelemetry.png'}
    ],
    databases: [
      { name: 'PostgreSQL', icon: '/assets/icons/tech/postgrsql.webp' },
      { name: 'MongoDB', icon: '/assets/icons/tech/mongo_db.png' },
      { name: 'Redis', icon: '/assets/icons/tech/redis.png' },
      { name: 'MySQL', icon: '/assets/icons/tech/mysql.webp' }
    ],
    tools: [
      { name: 'Git', icon: '/assets/icons/tech/git.webp' },
      { name: 'Linux', icon: '/assets/icons/tech/linux.png' },
      { name: 'Nginx', icon: '/assets/icons/tech/nginx.webp' },
      { name: 'Grafana', icon: '/assets/icons/tech/grafana.png' }
    ]
  }

  const education = t('resume.education', { returnObjects: true }) as any[]
  const certifications = t('resume.certifications', { returnObjects: true }) as string[]

  const handleContentChange = (field: string, value: string) => {
    setEditableContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
          {/* Profile Photo - Hidden on desktop, shown on mobile */}
          <div className="flex-shrink-0 mx-auto lg:hidden">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-lg">
              <img
                src="/assets/icons/general/profile.png"
                alt="Rheyno Apria Pratama"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
                         <div className="mb-4">
               <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                 <AnimatedGreeting /> 👋
               </h1>
               <h1 className="text-3xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
                 <EditableText
                   value={editableContent.introduction}
                   onChange={(value) => handleContentChange('introduction', value)}
                   className="text-3xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200"
                 />
               </h1>
             </div>
            <p className="text-sm lg:text-xl text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              <EditableText
                value={editableContent.description}
                onChange={(value) => handleContentChange('description', value)}
                className="text-sm lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
                multiline
                maxLength={500}
              />
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <EditableText
                  value={editableContent.location}
                  onChange={(value) => handleContentChange('location', value)}
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <EditableText
                  value={editableContent.experience}
                  onChange={(value) => handleContentChange('experience', value)}
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <EditableText
                  value={editableContent.expertise}
                  onChange={(value) => handleContentChange('expertise', value)}
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-bold theme-text mb-6 flex items-center gap-3">
              <Briefcase className="w-6 h-6 theme-primary" />
              {t('resume.sections.experience')}
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="card">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div className="mb-2 lg:mb-0">
                      <h3 className="text-lg font-semibold theme-text">{exp.title}</h3>
                      <p className="theme-primary font-medium">{exp.company}</p>
                    </div>
                                         <div className="text-left lg:text-right text-sm theme-text-secondary">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="theme-text-secondary mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium theme-text">{t('resume.achievements')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm theme-text-secondary">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-bold theme-text mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 theme-primary" />
              {t('resume.sections.education')}
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index !== education.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-neutral-200 dark:bg-neutral-700"></div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 theme-surface rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 theme-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="theme-surface rounded-lg theme-border p-4 shadow-sm">
                        <h3 className="text-lg font-semibold theme-text mb-1">
                          {edu.degree}
                        </h3>
                        <p className="theme-primary font-medium mb-3">
                          {edu.institution}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm theme-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{edu.period}</span>
                          </div>
                          {edu.gpa !== '-' && (
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              <span>GPA: {edu.gpa}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills Section */}
          <section>
            <h2 className="text-xl font-bold theme-text mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 theme-primary" />
              {t('resume.sections.skills')}
            </h2>
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold theme-text mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  {t('resume.skills.backend')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.backend.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 theme-surface rounded-lg hover:bg-opacity-80 transition-colors">
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                      <span className="text-sm font-medium theme-text-secondary">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold theme-text mb-4 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  {t('resume.skills.infrastructure')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.infrastructure.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 theme-surface rounded-lg hover:bg-opacity-80 transition-colors">
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                      <span className="text-sm font-medium theme-text-secondary">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold theme-text mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  {t('resume.skills.databases')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.databases.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 theme-surface rounded-lg hover:bg-opacity-80 transition-colors">
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                      <span className="text-sm font-medium theme-text-secondary">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold theme-text mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t('resume.skills.tools')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.tools.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 theme-surface rounded-lg hover:bg-opacity-80 transition-colors">
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                      <span className="text-sm font-medium theme-text-secondary">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xl font-bold theme-text mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 theme-primary" />
              {t('resume.sections.certifications')}
            </h2>
            <div className="card">
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 theme-surface rounded-lg">
                    <Award className="w-4 h-4 theme-primary flex-shrink-0" />
                    <span className="text-sm theme-text-secondary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 