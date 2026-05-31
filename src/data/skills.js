/**
 * Skills catalog — hardcoded portfolio content.
 * Icon paths reference /public/assets/icons/tech/*.
 *
 * NOTE: filename `postgrsql.webp` is intentional typo from original asset — do not "fix".
 */

export const skills = {
  backend: [
    { name: 'Python', icon: '/assets/icons/tech/python.webp' },
    { name: 'Node.js', icon: '/assets/icons/tech/node_js.png' },
    { name: 'Go', icon: '/assets/icons/tech/go.png' },
    { name: 'REST API', icon: '/assets/icons/tech/rest.webp' },
    { name: 'Odoo', icon: '/assets/icons/tech/odoo.png' },
  ],
  infrastructure: [
    { name: 'AWS', icon: '/assets/icons/tech/aws.png' },
    { name: 'Google Cloud', icon: '/assets/icons/tech/gcp.png' },
    { name: 'Docker', icon: '/assets/icons/tech/docker.png' },
    { name: 'Kubernetes', icon: '/assets/icons/tech/k8s.png' },
    { name: 'GitLab CI', icon: '/assets/icons/tech/gitlab_ci.png' },
    { name: 'Prometheus', icon: '/assets/icons/tech/prometheus.png' },
    { name: 'Shell', icon: '/assets/icons/tech/shell.png' },
    { name: 'Open Telemetry', icon: '/assets/icons/tech/opentelemetry.png' },
  ],
  databases: [
    { name: 'PostgreSQL', icon: '/assets/icons/tech/postgrsql.webp' },
    { name: 'MongoDB', icon: '/assets/icons/tech/mongo_db.png' },
    { name: 'Redis', icon: '/assets/icons/tech/redis.png' },
    { name: 'MySQL', icon: '/assets/icons/tech/mysql.webp' },
  ],
  tools: [
    { name: 'Git', icon: '/assets/icons/tech/git.webp' },
    { name: 'Linux', icon: '/assets/icons/tech/linux.png' },
    { name: 'Nginx', icon: '/assets/icons/tech/nginx.webp' },
    { name: 'Grafana', icon: '/assets/icons/tech/grafana.png' },
  ],
}
