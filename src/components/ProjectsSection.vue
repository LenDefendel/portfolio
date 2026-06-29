<script setup lang="ts">
interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: 'Project Alpha',
    description:
      'A modern web application built with Vue 3 and TypeScript, featuring real-time data visualization and collaborative editing.',
    tags: ['Vue 3', 'TypeScript', 'WebSocket'],
  },
  {
    title: 'Project Beta',
    description:
      'REST API platform for managing microservices with automated deployment pipelines and monitoring dashboards.',
    tags: ['Node.js', 'Docker', 'PostgreSQL'],
  },
  {
    title: 'Project Gamma',
    description:
      'Cross-platform mobile-first application for task management with offline support and real-time sync.',
    tags: ['React', 'MongoDB', 'PWA'],
  },
]
</script>

<template>
  <section id="projects">
    <h2>Projects</h2>
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.title" class="project-card">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.75rem;
  transition:
    border-color 0.3s,
    transform 0.2s;
}

.project-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--tag-bg);
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  border: 1px solid var(--tag-border);
}
</style>
