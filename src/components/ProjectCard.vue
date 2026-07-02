<script setup lang="ts">
import type { Project } from '@/data/portfolio'

const props = defineProps<{
  project: Project
  image: string
  imageIndex: number
}>()

const target = {
  name: 'workplace',
  params: { id: props.project.workplaceId },
  hash: `#${props.project.id}-image-${props.imageIndex}`,
}
</script>

<template>
  <router-link :to="target" class="project-card">
    <div class="card-image">
      <img :src="image" :alt="project.title" class="card-img" loading="lazy" />
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
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
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

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .card-overlay,
.project-card:focus-visible .card-overlay {
  opacity: 1;
}

.card-title {
  margin-bottom: 0.4rem;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.card-tag {
  padding: 0.15rem 0.5rem;
  border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: 10px;
  background: rgba(167, 139, 250, 0.15);
  color: var(--accent);
  font-size: 0.7rem;
}
</style>
