'use client'

import { ExternalLink, Github, Star, Calendar, Tag, Eye } from 'lucide-react'

export default function ShowcaseSection() {
  const projects = [
    {
      id: 1,
      title: 'Microservices E-commerce Platform',
      description: 'A scalable e-commerce platform built with microservices architecture, handling high-traffic loads and real-time inventory management.',
      image: '/api/placeholder/400/250',
      category: 'Backend & Infrastructure',
      technologies: ['Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      status: 'Production',
      year: '2023',
      highlights: [
        '1M+ daily active users',
        '99.9% uptime',
        'Auto-scaling infrastructure'
      ],
      links: {
        github: 'https://github.com/rheynoapria/ecommerce-platform',
        live: 'https://ecommerce-demo.com'
      }
    },
    {
      id: 2,
      title: 'Real-time Analytics Dashboard',
      description: 'High-performance analytics dashboard processing millions of events per second with real-time data visualization and alerting.',
      image: '/api/placeholder/400/250',
      category: 'Data Engineering',
      technologies: ['Java', 'Kafka', 'Elasticsearch', 'React', 'AWS'],
      status: 'Production',
      year: '2023',
      highlights: [
        '10M+ events/second',
        'Sub-second latency',
        'Real-time alerting'
      ],
      links: {
        github: 'https://github.com/rheynoapria/analytics-dashboard'
      }
    },
    {
      id: 3,
      title: 'Infrastructure as Code Pipeline',
      description: 'Automated infrastructure provisioning and deployment pipeline using Terraform and GitOps principles.',
      image: '/api/placeholder/400/250',
      category: 'DevOps & Infrastructure',
      technologies: ['Terraform', 'AWS', 'GitLab CI', 'Ansible', 'Monitoring'],
      status: 'Open Source',
      year: '2022',
      highlights: [
        '70% faster deployments',
        'Zero-downtime releases',
        'Multi-environment support'
      ],
      links: {
        github: 'https://github.com/rheynoapria/iac-pipeline'
      }
    },
    {
      id: 4,
      title: 'Distributed Caching System',
      description: 'High-performance distributed caching solution with automatic failover and data replication across multiple regions.',
      image: '/api/placeholder/400/250',
      category: 'System Architecture',
      technologies: ['Go', 'Redis', 'Docker', 'Kubernetes', 'Prometheus'],
      status: 'Production',
      year: '2022',
      highlights: [
        '< 1ms response time',
        'Multi-region replication',
        'Auto-failover capability'
      ],
      links: {
        github: 'https://github.com/rheynoapria/distributed-cache'
      }
    },
    {
      id: 5,
      title: 'API Gateway & Rate Limiter',
      description: 'Scalable API gateway with intelligent rate limiting, authentication, and request routing capabilities.',
      image: '/api/placeholder/400/250',
      category: 'Backend & Security',
      technologies: ['Node.js', 'Redis', 'MongoDB', 'JWT', 'Docker'],
      status: 'Production',
      year: '2021',
      highlights: [
        '100K+ requests/minute',
        'Advanced rate limiting',
        'OAuth2 integration'
      ],
      links: {
        github: 'https://github.com/rheynoapria/api-gateway'
      }
    },
    {
      id: 6,
      title: 'Blockchain Transaction Monitor',
      description: 'Real-time blockchain transaction monitoring system with fraud detection and automated alerting.',
      image: '/api/placeholder/400/250',
      category: 'Blockchain & Security',
      technologies: ['Python', 'PostgreSQL', 'WebSocket', 'Machine Learning'],
      status: 'Prototype',
      year: '2021',
      highlights: [
        'Real-time monitoring',
        'ML-based fraud detection',
        'Multi-chain support'
      ],
      links: {
        github: 'https://github.com/rheynoapria/blockchain-monitor'
      }
    }
  ]

  const categories = ['All', 'Backend & Infrastructure', 'Data Engineering', 'DevOps & Infrastructure', 'System Architecture', 'Backend & Security', 'Blockchain & Security']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Project Showcase
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
          A collection of backend systems, infrastructure projects, and technical solutions I've built
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-200 hover:border-primary-500 hover:text-primary-600 transition-colors duration-200 first:bg-primary-50 first:border-primary-500 first:text-primary-600"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">15+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Projects Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">6</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Production Systems</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">1M+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Users Served</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.9%</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Average Uptime</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card group hover:shadow-lg transition-all duration-300">
            {/* Project Image Placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-neutral-400 dark:text-neutral-500 text-center">
                <Eye className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm">Project Preview</span>
              </div>
            </div>

            {/* Project Header */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2 sm:mb-0">
                  {project.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full self-start ${
                  project.status === 'Production' 
                    ? 'bg-green-100 text-green-700' 
                    : project.status === 'Open Source'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-neutral-500 mb-3">
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {project.category}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.year}
                </div>
              </div>
            </div>

            {/* Project Description */}
            <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Key Highlights */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Key Highlights:</h4>
              <ul className="space-y-1">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <Star className="w-3 h-3 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="skill-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors">
          Load More Projects
        </button>
      </div>
    </div>
  )
} 