<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio, type Project, type ProjectMedia } from '@/data/portfolio'
import ImageLightbox from '@/components/ImageLightbox.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import WallpaperGallery from '@/components/WallpaperGallery.vue'

interface GalleryItem {
  project: Project
  image: ProjectMedia
  imageIndex: number
}

interface DescriptionPart {
  text: string
  href?: string
}

const route = useRoute()

const categoryId = computed(() => route.params.id as string)
const category = computed(() => portfolio.categories.find((item) => item.id === categoryId.value))
const isMarketplaceCards = computed(() => categoryId.value === 'marketplace-cards')
const categoryProjects = computed(() =>
  portfolio.projects.filter((project) => {
    return project.categoryId === categoryId.value
  }),
)

function projectImages(project: Project) {
  return project.images?.length ? project.images : [project.image]
}

function isVideo(media: ProjectMedia): boolean {
  return media.type === 'video'
}

function mediaPreviewStyle(media: ProjectMedia): Record<string, string> {
  const ratio = media.height ? media.width / media.height : 1
  const maxWidth = media.width > media.height ? Math.round(350 * ratio) : 350

  return {
    width: `min(100%, ${maxWidth}px)`,
  }
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex]!, result[index]!]
  }

  return result
}

const allImages = computed<GalleryItem[]>(() =>
  shuffle(
    portfolio.projects.flatMap((project) => {
      const categoryExists = portfolio.categories.some(
        (categoryItem) => categoryItem.id === project.categoryId,
      )

      if (!categoryExists) return []

      const image = projectImages(project)[0]

      return image ? [{ project, image, imageIndex: 0 }] : []
    }),
  ),
)

function imageAnchor(projectId: string, imageIndex: number): string {
  return `${projectId}-image-${imageIndex}`
}

function lightboxImageId(projectId: string, imageIndex: number): string {
  return `${projectId}-${imageIndex}`
}

const lightboxItems = computed(() =>
  categoryProjects.value.flatMap((project) =>
    projectImages(project).map((media, imageIndex) => ({
      id: lightboxImageId(project.id, imageIndex),
      media,
    })),
  ),
)

function descriptionParts(text: string): DescriptionPart[] {
  const parts: DescriptionPart[] = []
  const urlPattern = /https?:\/\/[^\s,)]+/g
  let lastIndex = 0

  for (const match of text.matchAll(urlPattern)) {
    const rawUrl = match[0]
    const start = match.index ?? 0

    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start) })
    }

    let href = rawUrl
    let trailing = ''

    while (/[.!?:;]$/.test(href)) {
      trailing = href.charAt(href.length - 1) + trailing
      href = href.slice(0, -1)
    }

    parts.push({ text: href, href })

    if (trailing) {
      parts.push({ text: trailing })
    }

    lastIndex = start + rawUrl.length
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) })
  }

  return parts
}

const imageLightbox = ref<InstanceType<typeof ImageLightbox> | null>(null)
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
  imageLightbox.value?.open(imageId, true)
}

function onPreviewPointerCancel(event: PointerEvent): void {
  previewTouchStarts.delete(event.pointerId)
}
</script>

<template>
  <WallpaperGallery v-if="categoryId === 'wallpaper'" />

  <div v-else-if="categoryId === 'all'" class="projects-page">
    <div v-if="allImages.length" class="projects-grid">
      <ProjectCard
        v-for="item in allImages"
        :key="`${item.project.id}-${item.imageIndex}`"
        :project="item.project"
        :image="item.image"
        :image-index="item.imageIndex"
        class="all-projects-card"
      />
    </div>
    <div v-else class="empty">
      <span class="material-symbols-outlined empty-icon">folder_off</span>
      <p>Нет проектов</p>
    </div>
  </div>

  <article v-else-if="category" class="category-page">
    <header v-if="!isMarketplaceCards" class="category-header">
      <p class="header-summary">{{ category.summary }}</p>
    </header>

    <div
      v-if="categoryProjects.length"
      class="project-list"
      :class="{ 'project-list--images-only': isMarketplaceCards }"
    >
      <section
        v-for="project in categoryProjects"
        :id="project.id"
        :key="project.id"
        class="project-section"
      >
        <div v-if="!isMarketplaceCards" class="project-heading">
          <h2>{{ project.title }}</h2>
          <p class="description">
            <template
              v-for="(part, partIndex) in descriptionParts(project.description ?? '')"
              :key="`${project.id}-description-${partIndex}`"
            >
              <a
                v-if="part.href"
                :href="part.href"
                target="_blank"
                rel="noopener"
                class="desc-link"
              >
                {{ part.text }}
              </a>
              <span v-else>{{ part.text }}</span>
            </template>
          </p>
          <p v-if="project.summary" class="summary">{{ project.summary }}</p>
        </div>

        <div class="image-gallery">
          <template v-for="(image, imageIndex) in projectImages(project)" :key="imageIndex">
            <video
              v-if="isVideo(image)"
              :id="imageAnchor(project.id, imageIndex)"
              :src="image.src"
              :height="image.height"
              :width="image.width"
              class="project-image project-video"
              :style="mediaPreviewStyle(image)"
              autoplay
              disablepictureinpicture
              muted
              loop
              playsinline
              controlslist="nodownload nofullscreen noremoteplayback"
              preload="auto"
            />
            <img
              v-else
              :id="imageAnchor(project.id, imageIndex)"
              :src="image.src"
              :height="image.height"
              :width="image.width"
              :alt="`${project.title}, изображение ${imageIndex + 1}`"
              class="project-image"
              :style="mediaPreviewStyle(image)"
              loading="lazy"
              @click="openPreview(lightboxImageId(project.id, imageIndex))"
              @pointerdown="onPreviewPointerDown"
              @pointerup="onPreviewPointerUp($event, lightboxImageId(project.id, imageIndex))"
              @pointercancel="onPreviewPointerCancel"
            />
          </template>
        </div>
      </section>
    </div>

    <div v-else class="empty">
      <span class="material-symbols-outlined empty-icon">folder_off</span>
      <p>Нет проектов</p>
    </div>
  </article>

  <div v-else class="empty projects-page">
    <span class="material-symbols-outlined empty-icon">folder_off</span>
    <p>Категория не найдена</p>
  </div>

  <ImageLightbox ref="imageLightbox" :items="lightboxItems" />
</template>

<style scoped>
.category-page {
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 2.5rem clamp(1.5rem, 6vw, 7rem) 8rem;
}

.projects-page {
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 2.5rem clamp(1.5rem, 6vw, 7rem) 8rem;
}

.projects-grid {
  column-count: 4;
  column-gap: 1.15rem;
}

.all-projects-card {
  break-inside: avoid;
  margin-bottom: 1.15rem;
}

.category-header {
  max-width: 760px;
  margin-bottom: 6rem;
  padding-top: 1.75rem;
}

.category-header .header-summary,
.description {
  color: var(--text-secondary);
}

.header-summary {
  font-size: clamp(1.1rem, 1.3vw, 1.3rem);
  line-height: 1.7;
}

.summary {
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  line-height: 1.75;
}

.project-list {
  display: grid;
  gap: 6.5rem;
}

.project-list--images-only {
  gap: 2rem;
}

.project-section {
  scroll-margin-top: 2rem;
}

.project-heading {
  max-width: 780px;
  margin-bottom: 1.75rem;
}

.project-heading h2 {
  margin-bottom: 0.85rem;
  text-align: left;
}

.description {
  line-height: 1.75;
}

.description .desc-link {
  color: var(--accent);
  text-underline-offset: 0.2em;
  overflow-wrap: anywhere;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.9rem;
}

.project-image {
  flex: 0 0 auto;
  width: auto;
  height: auto;
  scroll-margin-top: 2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--bg-card);
  cursor: pointer;
  touch-action: manipulation;
  transition:
    border-color 0.2s,
    filter 0.2s,
    transform 0.2s;
}

.project-image:hover {
  border-color: var(--border-hover);
  filter: brightness(0.94);
  transform: translateY(-1px);
}

.project-video,
.project-video:hover {
  cursor: default;
  border-color: var(--border);
  filter: none;
  pointer-events: none;
  transform: none;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
  color: var(--text-tertiary);
}

.empty-icon {
  margin-bottom: 1rem;
  font-size: 3rem;
}

@media (min-width: 769px) and (max-height: 760px) {
  .category-page,
  .projects-page {
    padding-top: 2rem;
    padding-bottom: 5rem;
  }

  .category-header {
    margin-bottom: 3rem;
    padding-top: 0.5rem;
  }

  .project-list {
    gap: 3.5rem;
  }

  .project-heading {
    margin-bottom: 1rem;
  }

  .project-heading h2 {
    margin-bottom: 0.55rem;
    font-size: 1.45rem;
  }

  .description {
    line-height: 1.5;
  }

  .project-image {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .projects-page,
  .category-page {
    padding: 4.75rem 1rem 4rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .all-projects-card {
    margin-bottom: 0;
  }

  .category-header {
    margin-bottom: 4.25rem;
    padding-top: 0.5rem;
  }

  .project-list {
    gap: 4rem;
  }
}

@media (min-width: 721px) {
  .projects-page {
    padding: clamp(4rem, 7vw, 7rem) clamp(5rem, 12vw, 13rem) 9rem;
  }
}

@media (max-width: 1100px) and (min-width: 721px) {
  .projects-grid {
    column-count: 3;
  }
}

@media (max-width: 900px) and (min-width: 721px) {
  .projects-grid {
    column-count: 2;
  }
}

@media (min-width: 769px) and (max-height: 760px) {
  .projects-page {
    padding-top: 2rem;
    padding-bottom: 5rem;
  }
}
</style>
