import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/resume',
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'resume',
        name: 'resume',
        component: () => import('@/views/ResumeView.vue'),
        meta: { titleKey: 'header.resume.title', subtitleKey: 'header.resume.subtitle' },
      },
      {
        path: 'showcase',
        name: 'showcase',
        component: () => import('@/views/ShowcaseView.vue'),
        meta: { titleKey: 'header.showcase.title', subtitleKey: 'header.showcase.subtitle' },
      },
      {
        path: 'knowledge',
        name: 'knowledge',
        component: () => import('@/views/KnowledgeView.vue'),
        meta: { titleKey: 'header.knowledge.title', subtitleKey: 'header.knowledge.subtitle' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/resume',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
