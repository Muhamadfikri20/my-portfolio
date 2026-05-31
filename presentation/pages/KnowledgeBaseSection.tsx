'use client'

import { BookOpen, Clock, Tag, User, TrendingUp, Search, Filter, ArrowRight } from 'lucide-react'

export default function KnowledgeBaseSection() {
  const articles = [
    {
      id: 1,
      title: 'Building Scalable Microservices with Docker and Kubernetes',
      excerpt: 'A comprehensive guide to designing and deploying microservices architecture using containerization technologies.',
      category: 'Infrastructure',
      readTime: '12 min read',
      publishDate: '2024-01-15',
      tags: ['Docker', 'Kubernetes', 'Microservices', 'DevOps'],
      views: 2840,
      featured: true,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Optimizing PostgreSQL Performance for High-Traffic Applications',
      excerpt: 'Learn advanced techniques for database optimization, indexing strategies, and query performance tuning.',
      category: 'Database',
      readTime: '15 min read',
      publishDate: '2024-01-08',
      tags: ['PostgreSQL', 'Performance', 'Database', 'Optimization'],
      views: 1920,
      featured: true,
      status: 'Published'
    },
    {
      id: 3,
      title: 'Infrastructure as Code: Terraform Best Practices',
      excerpt: 'Explore best practices for managing cloud infrastructure using Terraform, including state management and modular design.',
      category: 'DevOps',
      readTime: '10 min read',
      publishDate: '2024-01-02',
      tags: ['Terraform', 'IaC', 'AWS', 'DevOps'],
      views: 1560,
      featured: false,
      status: 'Published'
    },
    {
      id: 4,
      title: 'Implementing Event-Driven Architecture with Apache Kafka',
      excerpt: 'Design patterns and implementation strategies for building robust event-driven systems using Kafka.',
      category: 'Architecture',
      readTime: '18 min read',
      publishDate: '2023-12-20',
      tags: ['Kafka', 'Event-Driven', 'Architecture', 'Streaming'],
      views: 3200,
      featured: false,
      status: 'Published'
    },
    {
      id: 5,
      title: 'API Security: Rate Limiting and Authentication Strategies',
      excerpt: 'Comprehensive overview of API security measures including OAuth2, JWT tokens, and advanced rate limiting techniques.',
      category: 'Security',
      readTime: '14 min read',
      publishDate: '2023-12-10',
      tags: ['API', 'Security', 'OAuth2', 'Rate Limiting'],
      views: 2100,
      featured: false,
      status: 'Published'
    },
    {
      id: 6,
      title: 'Monitoring and Observability in Distributed Systems',
      excerpt: 'Building comprehensive monitoring solutions using Prometheus, Grafana, and distributed tracing.',
      category: 'Monitoring',
      readTime: '16 min read',
      publishDate: '2023-11-28',
      tags: ['Monitoring', 'Prometheus', 'Grafana', 'Observability'],
      views: 1800,
      featured: false,
      status: 'Draft'
    }
  ]

  const categories = ['All', 'Infrastructure', 'Database', 'DevOps', 'Architecture', 'Security', 'Monitoring']

  const tutorials = [
    {
      title: 'Setting up CI/CD Pipeline with GitLab',
      duration: '45 min',
      level: 'Intermediate',
      category: 'DevOps'
    },
    {
      title: 'Redis Caching Strategies',
      duration: '30 min',
      level: 'Advanced',
      category: 'Database'
    },
    {
      title: 'Load Balancing with NGINX',
      duration: '25 min',
      level: 'Beginner',
      category: 'Infrastructure'
    }
  ]

  const stats = [
    { label: 'Articles Published', value: '25+' },
    { label: 'Total Reads', value: '50K+' },
    { label: 'Community Members', value: '1.2K' },
    { label: 'Average Rating', value: '4.8/5' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Knowledge Base
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
          Technical articles, tutorials, and insights from my experience in backend development and infrastructure
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles, tutorials, and topics..."
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder-neutral-400"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-primary-400">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Category Tabs */}
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

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.value}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3">
          {/* Featured Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {articles.filter(article => article.featured).map((article) => (
                <div key={article.id} className="card group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{article.publishDate}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 transition-colors mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="skill-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.views} views
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Articles */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              All Articles
            </h2>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="card group hover:shadow-md transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded">
                          {article.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          article.status === 'Published' 
                            ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100' 
                            : 'bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-100'
                        }`}>
                          {article.status}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{article.publishDate}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 transition-colors mb-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="skill-badge">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.views}
                          </div>
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
          {/* Quick Tutorials */}
          <section>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Quick Tutorials</h3>
            <div className="space-y-4">
              {tutorials.map((tutorial, index) => (
                <div key={index} className="card">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{tutorial.title}</h4>
                  <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className={`font-medium ${
                        tutorial.level === 'Beginner' ? 'text-green-600' :
                        tutorial.level === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{tutorial.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{tutorial.category}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                    Start Tutorial
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Tags */}
          <section>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Popular Tags</h3>
            <div className="card">
              <div className="flex flex-wrap gap-2">
                {['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Python', 'Terraform', 'API', 'Microservices', 'DevOps', 'Security'].map((tag, index) => (
                  <span key={index} className="skill-badge cursor-pointer hover:bg-primary-100 hover:text-primary-700 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Stay Updated</h3>
            <div className="card">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Get notified when I publish new articles and tutorials about backend development and infrastructure.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-md text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder-neutral-400"
                />
                <button className="w-full px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors dark:bg-primary-600 dark:hover:bg-primary-700">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
          Load More Articles
        </button>
      </div>
    </div>
  )
} 