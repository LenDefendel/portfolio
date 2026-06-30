<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

const route = useRoute()

const workplaceId = computed(() => route.params.id as string)

const filteredProjects = computed(() => {
  if (workplaceId.value === 'all') {
    return portfolio.projects
  }
  return portfolio.projects.filter((p) => p.workplaceId === workplaceId.value)
})
</script>

<template>
  <div class="projects-page">
    <div v-if="filteredProjects.length" class="projects-grid">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>
    <div v-else class="empty">
      <span class="material-symbols-outlined empty-icon">folder_off</span>
      <p>Нет проектов</p>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  padding: 2rem 8rem 8rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .projects-page {
    padding: 2rem 1rem 4rem;
  }

  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
}
</style>
