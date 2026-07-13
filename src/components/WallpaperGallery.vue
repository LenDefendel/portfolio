<script setup lang="ts">
import { computed, ref } from 'vue'
import { portfolio, type Project, type ProjectMedia } from '@/data/portfolio'
import ImageLightbox from '@/components/ImageLightbox.vue'

const category = computed(() =>
  portfolio.categories.find((c) => c.id === 'wallpaper'),
)
const projects = computed(() =>
  portfolio.projects.filter((p) => p.categoryId === 'wallpaper'),
)

function projectImages(project: Project) {
  return project.images?.length ? project.images : [project.image]
}

function isVideo(media: ProjectMedia): boolean {
  return media.type === 'video'
}

function imageAnchor(projectId: string, imageIndex: number): string {
  return `${projectId}-image-${imageIndex}`
}

function lightboxImageId(projectId: string, imageIndex: number): string {
  return `${projectId}-${imageIndex}`
}

function hasMainImage(project: Project): boolean {
  return projectImages(project).length > 1
}

const lightboxItems = computed(() =>
  projects.value.flatMap((project) =>
    projectImages(project).map((media, imageIndex) => ({
      id: lightboxImageId(project.id, imageIndex),
      media,
    })),
  ),
)

const imageLightbox = ref<InstanceType<typeof ImageLightbox> | null>(null)
</script>

<template>
  <article v-if="category" class="wallpaper-page">
    <header class="wallpaper-header">
      <div class="header-content">
        <span class="material-symbols-outlined header-icon">wall_art</span>
        <h1>{{ category.name }}</h1>
        <p class="header-summary">{{ category.summary }}</p>
      </div>
    </header>

    <div class="wallpaper-projects">
      <section
        v-for="project in projects"
        :id="project.id"
        :key="project.id"
        class="project-section"
      >
        <div class="project-head">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-desc">{{ project.description }}</p>
        </div>

        <div class="project-grid">
          <figure
            v-for="(image, imageIndex) in projectImages(project)"
            :key="imageIndex"
            :id="imageAnchor(project.id, imageIndex)"
            class="project-figure"
            :class="{
              'is-main': imageIndex === 0 && hasMainImage(project) && !isVideo(image),
            }"
          >
            <img
              v-if="!isVideo(image)"
              :src="image.src"
              :width="image.width"
              :height="image.height"
              :alt="`${project.title}, изображение ${imageIndex + 1}`"
              class="project-image"
              loading="lazy"
              @click="
                imageLightbox?.open(lightboxImageId(project.id, imageIndex))
              "
            />
            <video
              v-else
              :src="image.src"
              :width="image.width"
              :height="image.height"
              class="project-image project-video"
              autoplay
              disablepictureinpicture
              muted
              loop
              playsinline
              controlslist="nodownload nofullscreen noremoteplayback"
              preload="auto"
            />
          </figure>

          <div v-if="project.summary" class="summary-card">
            <p class="summary-text">{{ project.summary }}</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="!projects.length" class="empty">
      <span class="material-symbols-outlined empty-icon">folder_off</span>
      <p>Нет проектов</p>
    </div>
  </article>

  <div v-else class="empty">
    <span class="material-symbols-outlined empty-icon">folder_off</span>
    <p>Категория не найдена</p>
  </div>

  <ImageLightbox ref="imageLightbox" :items="lightboxItems" />
</template>

<style scoped>
.wallpaper-page {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 3rem clamp(1.5rem, 4vw, 4rem) 8rem;
}

.wallpaper-header {
  margin-bottom: 4rem;
  padding-top: 2rem;
}

.header-content {
  max-width: 680px;
}

.header-icon {
  display: inline-flex;
  font-size: 2.5rem;
  margin-bottom: 0.65rem;
  color: var(--accent);
  opacity: 0.85;
}

.wallpaper-header h1 {
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(1.85rem, 3.8vw, 3.25rem);
  font-weight: 760;
  line-height: 1.06;
  margin-bottom: 0.85rem;
}

.header-summary {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.05rem;
}

.wallpaper-projects {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.project-section {
  scroll-margin-top: 2rem;
}

.project-head {
  max-width: 640px;
  margin-bottom: 1rem;
}

.project-title {
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(1.35rem, 2.2vw, 1.9rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.15;
}

.project-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* ---------- grid ---------- */

.project-grid {
  display: grid;
  gap: 0.65rem;
  align-items: start;
}

@media (min-width: 769px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-figure {
  margin: 0;
  display: flex;
  scroll-margin-top: 2rem;
}

.project-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 75vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  cursor: pointer;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}

.project-image:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px var(--shadow-sm);
}

.project-video,
.project-video:hover {
  cursor: default;
  pointer-events: none;
  transform: none;
  box-shadow: none;
}

@media (min-width: 769px) {
  .is-main {
    grid-column: span 2;
  }
}

/* ---------- summary card ---------- */

.summary-card {
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border);
  align-self: center;
}

.summary-text {
  font-size: 0.9rem;
  line-height: 1.7;
}

/* ---------- empty ---------- */

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  color: var(--text-tertiary);
}

.empty-icon {
  margin-bottom: 1rem;
  font-size: 3rem;
}

/* ---------- responsive ---------- */

@media (max-width: 768px) {
  .wallpaper-page {
    padding: 4.75rem 1rem 4rem;
  }

  .wallpaper-header {
    margin-bottom: 2.5rem;
    padding-top: 0.5rem;
  }

  .wallpaper-header::after {
    bottom: -1.25rem;
  }

  .wallpaper-projects {
    gap: 3rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .summary-card {
    padding: 0.85rem 1rem;
  }
}

@media (min-width: 769px) and (max-height: 760px) {
  .wallpaper-page {
    padding-top: 2rem;
    padding-bottom: 5rem;
  }

  .wallpaper-header {
    margin-bottom: 2.5rem;
    padding-top: 0.5rem;
  }

  .wallpaper-projects {
    gap: 3rem;
  }
}
</style>
