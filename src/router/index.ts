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
    redirect: `/workplace/${portfolio.workplaces[0]!.id}`,
  },
  {
    path: '/workplace/:id',
    name: 'workplace',
    component: ProjectsGrid,
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
            name: 'workplace',
            params: { id: project.workplaceId },
            hash: `#${project.id}-image-0`,
          }
        : '/workplace/all'
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
