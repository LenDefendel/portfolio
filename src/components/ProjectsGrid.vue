<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio, type Project, type ProjectMedia } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

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
const subcategoryId = computed(() => route.params.subcategoryId as string | undefined)
const category = computed(() => portfolio.categories.find((item) => item.id === categoryId.value))
const selectedSubcategory = computed(() =>
  category.value?.subcategories?.find((item) => item.id === subcategoryId.value),
)
const categoryProjects = computed(() =>
  portfolio.projects.filter((project) => {
    if (project.categoryId !== categoryId.value) return false
    if (subcategoryId.value) return project.subcategoryId === subcategoryId.value
    if (category.value?.subcategories?.length) return !project.subcategoryId
    return true
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
      if (project.subcategoryId) return []

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

const lightboxImage = ref<ProjectMedia | null>(null)

function openLightbox(image: ProjectMedia): void {
  if (isVideo(image)) return
  lightboxImage.value = image
}

function closeLightbox(): void {
  lightboxImage.value = null
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    closeLightbox()
  }
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <div v-if="categoryId === 'all'" class="projects-page">
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
    <header class="category-header">
      <div>
        <h1>{{ selectedSubcategory?.name ?? category.name }}</h1>
        <p>{{ selectedSubcategory?.summary ?? category.summary }}</p>
      </div>
    </header>

    <div v-if="categoryProjects.length" class="project-list">
      <section
        v-for="project in categoryProjects"
        :id="project.id"
        :key="project.id"
        class="project-section"
      >
        <div class="project-heading">
          <h2>{{ project.title }}</h2>
          <p class="description">
            <template
              v-for="(part, partIndex) in descriptionParts(project.description)"
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
              @click="openLightbox(image)"
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

  <Teleport to="body">
    <div
      v-if="lightboxImage"
      class="lightbox-overlay"
      @click.self="closeLightbox"
      @keydown.escape="closeLightbox"
    >
      <button class="lightbox-close" @click="closeLightbox">
        <span class="material-symbols-outlined">close</span>
      </button>
      <img :src="lightboxImage.src" class="lightbox-image" alt="Полноразмерное изображение" />
    </div>
  </Teleport>
</template>

<style scoped>
.category-page {
  padding: 2.5rem clamp(1.5rem, 6vw, 7rem) 8rem;
}

.projects-page {
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

.category-page {
  max-width: 1360px;
}

.category-header {
  max-width: 760px;
  margin-bottom: 6rem;
  padding-top: 1.75rem;
}

.category-header h1 {
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(1.65rem, 3.4vw, 3rem);
  font-weight: 760;
  line-height: 1.06;
  margin-bottom: 1rem;
}

.category-header p,
.description {
  color: var(--text-secondary);
}

.project-list {
  display: grid;
  gap: 6.5rem;
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

.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  cursor: zoom-out;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.14);
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius-sm);
  cursor: default;
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
</style>
