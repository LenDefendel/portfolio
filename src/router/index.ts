import { createRouter, createWebHashHistory } from 'vue-router'
import { portfolio } from '@/data/portfolio'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

const routes = [
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
    name: 'project',
    component: ProjectDetail,
  },
]

const router = createRouter({
  history: createWebHashHistory('/portfolio/'),
  routes,
})

export default router
