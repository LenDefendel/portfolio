<script setup lang="ts">
import type { Project } from '@/data/portfolio'

defineProps<{
  project: Project
}>()
</script>

<template>
  <router-link :to="`/project/${project.id}`" class="project-card">
    <div class="card-image">
      <div class="placeholder-img">
        <span class="placeholder-text">{{ project.title.charAt(0) }}</span>
      </div>
      <div class="card-overlay">
        <h3 class="card-title">{{ project.title }}</h3>
        <div class="card-tags">
          <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="card-tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.project-card {
  display: block;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid var(--border);
  transition: border-color 0.3s, transform 0.2s;
}

.project-card:hover {
  border-color: var(--accent);
  transform: scale(1.02);
}

.card-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.5;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.4rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.card-tag {
  font-size: 0.7rem;
  color: var(--accent);
  background: rgba(167, 139, 250, 0.15);
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  border: 1px solid rgba(167, 139, 250, 0.2);
}
</style>
