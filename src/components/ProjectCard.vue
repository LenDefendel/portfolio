<script setup lang="ts">
import type { Project } from '@/data/portfolio'

const props = defineProps<{
  project: Project
  image: {
    src: string
    width: number
    height: number
  }
  imageIndex: number
  variant?: 'feature' | 'wide' | 'tall' | 'standard' | 'compact'
}>()

const target = {
  name: 'workplace',
  params: { id: props.project.workplaceId },
  hash: `#${props.project.id}-image-${props.imageIndex}`,
}
</script>

<template>
  <router-link :to="target" class="project-card" :class="`project-card--${variant ?? 'standard'}`">
    <div class="card-image">
      <img
        :src="image.src"
        :height="image.height"
        :width="image.width"
        :alt="project.title"
        class="card-img"
        loading="lazy"
      />
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
  min-height: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  text-decoration: none;
  transition:
    border-color 0.3s,
    box-shadow 0.2s,
    transform 0.2s;
}

.project-card--feature {
  grid-column: span 6;
  grid-row: span 4;
}

.project-card--wide {
  grid-column: span 6;
  grid-row: span 3;
}

.project-card--tall {
  grid-column: span 3;
  grid-row: span 4;
}

.project-card--standard {
  grid-column: span 3;
  grid-row: span 3;
}

.project-card--compact {
  grid-column: span 3;
  grid-row: span 2;
}

.project-card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 12px 32px var(--shadow-sm);
  transform: translateY(-2px);
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
  transition:
    filter 0.25s,
    transform 0.25s;
}

.project-card:hover .card-img,
.project-card:focus-visible .card-img {
  filter: brightness(0.78);
  transform: scale(1.015);
}

.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.9rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.74), rgba(0, 0, 0, 0.06) 72%);
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
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.card-tag {
  padding: 0.12rem 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.7rem;
}

@media (max-width: 1100px) {
  .project-card--feature,
  .project-card--wide {
    grid-column: span 8;
    grid-row: span 3;
  }

  .project-card--tall,
  .project-card--standard,
  .project-card--compact {
    grid-column: span 4;
    grid-row: span 3;
  }
}

@media (max-width: 720px) {
  .project-card,
  .project-card--feature,
  .project-card--wide,
  .project-card--tall,
  .project-card--standard,
  .project-card--compact {
    grid-column: span 1;
    grid-row: span 1;
    aspect-ratio: 1;
  }
}
</style>
