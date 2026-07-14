<script setup lang="ts">
import type { Project, ProjectMedia } from '@/data/portfolio'

const props = defineProps<{
  project: Project
  image: ProjectMedia
  imageIndex: number
}>()

function isVideo(media: ProjectMedia): boolean {
  return media.type === 'video'
}

const target = {
  name: 'category',
  params: {
    id: props.project.categoryId,
  },
  hash: `#${props.project.id}-image-${props.imageIndex}`,
}
</script>

<template>
  <router-link
    v-if="!isVideo(image)"
    :to="target"
    class="project-card"
    :style="{ '--image-ratio': `${image.width || 4} / ${image.height || 3}` }"
  >
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
      </div>
    </div>
  </router-link>

  <div
    v-else
    class="project-card project-card--static"
    :style="{ '--image-ratio': `${image.width || 4} / ${image.height || 3}` }"
  >
    <div class="card-image">
      <video
        :src="image.src"
        :height="image.height"
        :width="image.width"
        class="card-img"
        autoplay
        disablepictureinpicture
        muted
        loop
        playsinline
        controlslist="nodownload nofullscreen noremoteplayback"
        preload="auto"
      />
      <div class="card-overlay">
        <h3 class="card-title">{{ project.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  display: block;
  overflow: hidden;
  min-height: 0;
  aspect-ratio: var(--image-ratio);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  text-decoration: none;
  transition:
    border-color 0.3s,
    box-shadow 0.2s,
    transform 0.2s;
}

.project-card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 12px 32px var(--shadow-sm);
  transform: translateY(-2px);
}

.project-card--static,
.project-card--static .card-img {
  cursor: default;
}

.project-card--static video {
  pointer-events: none;
}

.project-card--static:hover {
  border-color: var(--border);
  box-shadow: none;
  transform: none;
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

.project-card--static:hover .card-img {
  filter: none;
  transform: none;
}

.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.65rem;
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

@media (max-width: 720px) {
  .project-card {
    grid-column: span 1;
    grid-row: span 1;
    aspect-ratio: 3 / 4;
  }

  .all-projects-card .card-image {
    display: block;
  }

  .all-projects-card .card-img {
    min-height: 0;
    filter: none;
    transform: none;
  }

  .all-projects-card .card-overlay {
    top: auto;
    bottom: 0;
    display: block;
    padding: 0.35rem 0.42rem;
    background: rgba(0, 0, 0, 0.62);
    opacity: 1;
  }

  .all-projects-card .card-title {
    margin-bottom: 0;
    color: #fff;
    font-size: clamp(0.62rem, 2.7vw, 0.78rem);
    line-height: 1.12;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
