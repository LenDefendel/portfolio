<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { portfolio, type Project, type ProjectMedia } from '@/data/portfolio'
import ImageLightbox from '@/components/ImageLightbox.vue'

const category = computed(() => portfolio.categories.find((c) => c.id === 'wallpaper'))
const projects = computed(() => {
  const items = portfolio.projects.filter((p) => p.categoryId === 'wallpaper')
  const [first, ...rest] = items

  return first ? [...rest, first] : items
})

function projectImages(project: Project) {
  const images = project.images?.length ? [...project.images] : [project.image]

  if (project.id === 'wall-forest' && images.length > 1) {
    const lastIndex = images.length - 1
    const previousImage = images[lastIndex - 1]
    const lastImage = images[lastIndex]

    if (previousImage && lastImage) {
      images[lastIndex - 1] = lastImage
      images[lastIndex] = previousImage
    }
  }

  return images
}

interface FeaturedColumnItem {
  media: ProjectMedia
  imageIndex: number
}

function featuredColumns(project: Project): FeaturedColumnItem[][] {
  const columns: FeaturedColumnItem[][] =
    project.id === 'wall-tropicalBirds' ? [[], [], []] : [[], []]

  projectImages(project).forEach((media, imageIndex) => {
    const columnIndex =
      project.id === 'wall-llamaUnicorns' && imageIndex > 0
        ? 1
        : project.id === 'wall-tropicalBirds' && imageIndex === 2
          ? 1
          : project.id === 'wall-tropicalBirds' && imageIndex === 3
            ? 2
          : imageIndex % 2

    columns[columnIndex]!.push({ media, imageIndex })
  })

  return columns
}

function isFeaturedProject(project: Project): boolean {
  return (
    project.id === 'wall-chinoiserie' ||
    project.id === 'wall-forest' ||
    project.id === 'wall-llamaUnicorns' ||
    project.id === 'wall-robo' ||
    project.id === 'wall-tropicalBirds'
  )
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

const lightboxItems = computed(() =>
  projects.value.flatMap((project) =>
    projectImages(project).map((media, imageIndex) => ({
      id: lightboxImageId(project.id, imageIndex),
      media,
    })),
  ),
)

const imageLightbox = ref<InstanceType<typeof ImageLightbox> | null>(null)
const compactLayout = ref(typeof window !== 'undefined' && window.innerWidth <= 1000)
const previewTouchStarts = new Map<number, { x: number; y: number }>()
let ignorePreviewClickUntil = 0

function openPreview(imageId: string): void {
  if (Date.now() < ignorePreviewClickUntil) return
  imageLightbox.value?.open(imageId)
}

function onPreviewPointerDown(event: PointerEvent): void {
  if (event.pointerType !== 'touch') return

  previewTouchStarts.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
  })
}

function onPreviewPointerUp(event: PointerEvent, imageId: string): void {
  if (event.pointerType !== 'touch') return

  const start = previewTouchStarts.get(event.pointerId)
  previewTouchStarts.delete(event.pointerId)
  if (!start) return

  const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
  if (moved > 10) return

  event.preventDefault()
  ignorePreviewClickUntil = Date.now() + 500
  imageLightbox.value?.open(imageId)
}

function onPreviewPointerCancel(event: PointerEvent): void {
  previewTouchStarts.delete(event.pointerId)
}

function updateCompactLayout(): void {
  compactLayout.value = window.innerWidth <= 1000
}

onMounted(() => {
  window.addEventListener('resize', updateCompactLayout)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCompactLayout)
})
</script>

<template>
  <article v-if="category" class="wallpaper-page">
    <header class="wallpaper-header">
      <div class="header-content">
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

        <div
          v-if="isFeaturedProject(project) && !compactLayout"
          class="project-columns"
          :class="{
            'project-columns--third': project.id === 'wall-llamaUnicorns',
            'project-columns--fourth': project.id === 'wall-robo',
            'project-columns--fifth': project.id === 'wall-tropicalBirds',
          }"
        >
          <div
            v-for="(column, columnIndex) in featuredColumns(project)"
            :key="columnIndex"
            class="project-column"
          >
            <template v-for="item in column" :key="item.imageIndex">
              <figure
                :id="imageAnchor(project.id, item.imageIndex)"
                class="project-figure"
                :class="{
                  'is-tropical-right-item': project.id === 'wall-tropicalBirds' && columnIndex > 0,
                  'is-tropical-cropped':
                    project.id === 'wall-tropicalBirds' &&
                    (item.imageIndex === 0 || item.imageIndex === 2),
                  'is-third-project-following':
                    project.id === 'wall-llamaUnicorns' && item.imageIndex === 2,
                }"
              >
                <img
                  v-if="!isVideo(item.media)"
                  :src="item.media.src"
                  :width="item.media.width"
                  :height="item.media.height"
                  :alt="`${project.title}, изображение ${item.imageIndex + 1}`"
                  class="project-image"
                  loading="lazy"
                  @click="openPreview(lightboxImageId(project.id, item.imageIndex))"
                  @pointerdown="onPreviewPointerDown"
                  @pointerup="
                    onPreviewPointerUp(
                      $event,
                      lightboxImageId(project.id, item.imageIndex),
                    )
                  "
                  @pointercancel="onPreviewPointerCancel"
                />
                <video
                  v-else
                  :src="item.media.src"
                  :width="item.media.width"
                  :height="item.media.height"
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

              <div
                v-if="
                  project.summary &&
                  ((project.id !== 'wall-tropicalBirds' &&
                    columnIndex === 1 &&
                    item.imageIndex === 1) ||
                    (project.id === 'wall-tropicalBirds' &&
                      columnIndex === 2 &&
                      item.imageIndex === 3))
                "
                class="summary-card"
              >
                <p class="summary-text">{{ project.summary }}</p>
              </div>
            </template>
          </div>
        </div>

        <div
          v-else
          class="project-grid"
          :class="{ 'project-grid--single': project.id === 'wall-tropics' }"
        >
          <template v-for="(image, imageIndex) in projectImages(project)" :key="imageIndex">
            <figure :id="imageAnchor(project.id, imageIndex)" class="project-figure">
              <img
                v-if="!isVideo(image)"
                :src="image.src"
                :width="image.width"
                :height="image.height"
                :alt="`${project.title}, изображение ${imageIndex + 1}`"
                class="project-image"
                loading="lazy"
                @click="openPreview(lightboxImageId(project.id, imageIndex))"
                @pointerdown="onPreviewPointerDown"
                @pointerup="
                  onPreviewPointerUp($event, lightboxImageId(project.id, imageIndex))
                "
                @pointercancel="onPreviewPointerCancel"
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

            <div
              v-if="
                isFeaturedProject(project) && compactLayout && imageIndex === 1 && project.summary
              "
              class="summary-card"
            >
              <p class="summary-text">{{ project.summary }}</p>
            </div>
          </template>

          <div v-if="project.summary && !isFeaturedProject(project)" class="summary-card">
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

.header-summary {
  color: var(--text-secondary);
  font-size: clamp(1.1rem, 1.3vw, 1.3rem);
  line-height: 1.7;
}

.wallpaper-projects {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.project-section {
  scroll-margin-top: 2rem;
}

.project-head {
  max-width: 640px;
  margin-bottom: 1.5rem;
}

.project-title {
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(1.65rem, 2.8vw, 2.3rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.15;
  text-align: left;
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

.project-columns {
  display: grid;
  gap: 0.65rem;
  align-items: start;
}

.project-column {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.65rem;
}

@media (min-width: 769px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-grid--single {
    grid-template-columns: 1fr;
  }

  .project-grid--single .project-figure {
    width: 72%;
  }

  .project-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-columns--third {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  }

  .project-columns--fourth {
    width: 90%;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.5fr);
    align-items: stretch;
  }

  .project-columns--fifth {
    grid-template-columns: minmax(0, 42%) repeat(2, minmax(0, 1fr));
  }

  .project-columns--fourth .project-column {
    display: contents;
  }

  .project-columns--fourth .project-figure {
    height: 100%;
  }

  .project-columns--fourth .project-image {
    height: 100%;
    object-fit: cover;
  }

  .project-columns--fourth .project-column:first-child .project-figure {
    height: auto;
    align-self: flex-start;
  }

  .project-columns--fourth .project-column:first-child .project-image {
    height: auto;
    object-fit: contain;
  }

  .project-columns--fourth .project-column:nth-child(2) .project-figure {
    height: 100%;
    align-self: stretch;
    overflow: hidden;
  }

  .project-columns--fourth .project-column:nth-child(2) .project-image {
    height: 100%;
    object-fit: cover;
  }

  .project-columns--third .is-third-project-following {
    width: 100%;
    align-self: flex-start;
  }

  .project-columns--fifth .project-column:first-child .project-figure {
    width: 100%;
    align-self: stretch;
  }

  .project-columns--fifth .is-tropical-cropped {
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }

  .project-columns--fifth .is-tropical-cropped .project-image {
    height: 100%;
    object-fit: cover;
  }

  .project-columns--fifth .is-tropical-right-item {
    aspect-ratio: 1;
    overflow: hidden;
  }

  .project-columns--fifth .is-tropical-right-item .project-image {
    height: 100%;
    object-fit: cover;
  }
}

@media (min-width: 769px) and (max-width: 1000px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-grid .summary-card {
    padding: 1.2rem 1.35rem;
  }
}

.project-figure {
  margin: 0;
  display: flex;
  min-width: 0;
  scroll-margin-top: 2rem;
}

.project-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 75vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  cursor: pointer;
  touch-action: manipulation;
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

/* ---------- summary card ---------- */

.summary-card {
  padding: 1.5rem 1.75rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border);
  align-self: stretch;
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
    gap: 4rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-columns {
    grid-template-columns: 1fr;
  }

  .summary-card {
    padding: 1rem 1.25rem;
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
