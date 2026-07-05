import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { portfolio } from '@/data/portfolio'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/category/${portfolio.categories[0]!.id}`,
  },
  {
    path: '/category/:id',
    name: 'category',
    component: ProjectsGrid,
  },
  {
    path: '/workplace/all',
    redirect: '/category/all',
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
            params: { id: project.categoryId },
            hash: `#${project.id}-image-0`,
          }
        : '/category/all'
    },
  },
]

const router = createRouter({
  history: createWebHashHistory('/portfolio/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
