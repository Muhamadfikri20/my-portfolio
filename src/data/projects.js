export const projects = [
  {
    id: 1,
    title: 'Microservices E-commerce Platform',
    description: 'A scalable e-commerce platform built with microservices architecture, handling high-traffic loads and real-time inventory management.',
    category: 'Backend & Infrastructure',
    technologies: ['Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    status: 'Production',
    year: '2023',
    highlights: ['1M+ daily active users', '99.9% uptime', 'Auto-scaling infrastructure'],
    links: {
      github: 'https://github.com/rheynoapria/ecommerce-platform',
      live: 'https://ecommerce-demo.com',
    },
  },
  {
    id: 2,
    title: 'Real-time Analytics Dashboard',
    description: 'High-performance analytics dashboard processing millions of events per second with real-time data visualization and alerting.',
    category: 'Data Engineering',
    technologies: ['Java', 'Kafka', 'Elasticsearch', 'React', 'AWS'],
    status: 'Production',
    year: '2023',
    highlights: ['10M+ events/second', 'Sub-second latency', 'Real-time alerting'],
    links: {
      github: 'https://github.com/rheynoapria/analytics-dashboard',
    },
  },
  {
    id: 3,
    title: 'Infrastructure as Code Pipeline',
    description: 'Automated infrastructure provisioning and deployment pipeline using Terraform and GitOps principles.',
    category: 'DevOps & Infrastructure',
    technologies: ['Terraform', 'AWS', 'GitLab CI', 'Ansible', 'Monitoring'],
    status: 'Open Source',
    year: '2022',
    highlights: ['70% faster deployments', 'Zero-downtime releases', 'Multi-environment support'],
    links: {
      github: 'https://github.com/rheynoapria/iac-pipeline',
    },
  },
  {
    id: 4,
    title: 'Distributed Caching System',
    description: 'High-performance distributed caching solution with automatic failover and data replication across multiple regions.',
    category: 'System Architecture',
    technologies: ['Go', 'Redis', 'Docker', 'Kubernetes', 'Prometheus'],
    status: 'Production',
    year: '2022',
    highlights: ['< 1ms response time', 'Multi-region replication', 'Auto-failover capability'],
    links: {
      github: 'https://github.com/rheynoapria/distributed-cache',
    },
  },
  {
    id: 5,
    title: 'API Gateway & Rate Limiter',
    description: 'Scalable API gateway with intelligent rate limiting, authentication, and request routing capabilities.',
    category: 'Backend & Security',
    technologies: ['Node.js', 'Redis', 'MongoDB', 'JWT', 'Docker'],
    status: 'Production',
    year: '2021',
    highlights: ['100K+ requests/minute', 'Advanced rate limiting', 'OAuth2 integration'],
    links: {
      github: 'https://github.com/rheynoapria/api-gateway',
    },
  },
  {
    id: 6,
    title: 'Blockchain Transaction Monitor',
    description: 'Real-time blockchain transaction monitoring system with fraud detection and automated alerting.',
    category: 'Blockchain & Security',
    technologies: ['Python', 'PostgreSQL', 'WebSocket', 'Machine Learning'],
    status: 'Prototype',
    year: '2021',
    highlights: ['Real-time monitoring', 'ML-based fraud detection', 'Multi-chain support'],
    links: {
      github: 'https://github.com/rheynoapria/blockchain-monitor',
    },
  },
]

export const projectCategories = [
  'All',
  'Backend & Infrastructure',
  'Data Engineering',
  'DevOps & Infrastructure',
  'System Architecture',
  'Backend & Security',
  'Blockchain & Security',
]

export const projectStats = [
  { value: '15+', label: 'Projects Completed' },
  { value: '6', label: 'Production Systems' },
  { value: '1M+', label: 'Users Served' },
  { value: '99.9%', label: 'Average Uptime' },
]
