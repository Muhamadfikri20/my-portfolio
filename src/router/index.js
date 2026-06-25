import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/AdminView.vue'),
        meta: { titleKey: 'header.admin.title', subtitleKey: 'header.admin.subtitle', requiresAdmin: true },
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

// Admin route guard — waits for async auth init, then checks role.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true
  const auth = useAuthStore()
  // Wait for the initial getSession() to resolve before deciding.
  let tries = 0
  while (auth.isLoading && tries < 50) {
    await new Promise((r) => setTimeout(r, 50))
    tries++
  }
  if (!auth.isAdmin) return { name: 'resume' }
  return true
})

export default router
