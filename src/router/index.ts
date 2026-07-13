import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { portfolio } from '@/data/portfolio'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import HomeSections from '@/components/HomeSections.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeSections,
  },
  {
    path: '/category/all',
    redirect: '/',
  },
  {
    path: '/category/:id/:subcategoryId?',
    name: 'category',
    component: ProjectsGrid,
  },
  {
    path: '/workplace/all',
    redirect: '/',
  },
  {
    path: '/workplace/:id',
    redirect: (to) => ({
      name: 'category',
      params: { id: to.params.id },
      hash: to.hash,
    }),
  },
  {
    path: '/about',
    name: 'about',
    component: AboutSection,
  },
  {
    path: '/skills',
    name: 'skills',
    component: SkillsSection,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactSection,
  },
  {
    path: '/project/:id',
    redirect: (to) => {
      const project = portfolio.projects.find((item) => item.id === to.params.id)

      return project
        ? {
            name: 'category',
            params: {
              id: project.categoryId,
              ...(project.subcategoryId ? { subcategoryId: project.subcategoryId } : {}),
            },
            hash: `#${project.id}-image-0`,
          }
        : '/'
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    if (to.path === from.path && to.hash === from.hash) return false
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
