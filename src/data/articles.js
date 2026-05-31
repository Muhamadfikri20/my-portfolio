export const articles = [
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
    status: 'Published',
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
    status: 'Published',
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
    status: 'Published',
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
    status: 'Published',
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
    status: 'Published',
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
    status: 'Draft',
  },
]

export const articleCategories = [
  'All',
  'Infrastructure',
  'Database',
  'DevOps',
  'Architecture',
  'Security',
  'Monitoring',
]

export const tutorials = [
  { title: 'Setting up CI/CD Pipeline with GitLab', duration: '45 min', level: 'Intermediate', category: 'DevOps' },
  { title: 'Redis Caching Strategies', duration: '30 min', level: 'Advanced', category: 'Database' },
  { title: 'Load Balancing with NGINX', duration: '25 min', level: 'Beginner', category: 'Infrastructure' },
]

export const knowledgeStats = [
  { label: 'Articles Published', value: '25+' },
  { label: 'Total Reads', value: '50K+' },
  { label: 'Community Members', value: '1.2K' },
  { label: 'Average Rating', value: '4.8/5' },
]

export const popularTags = [
  'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Python',
  'Terraform', 'API', 'Microservices', 'DevOps', 'Security',
]
