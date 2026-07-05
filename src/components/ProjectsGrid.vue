<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio, type Project } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

interface GalleryItem {
  project: Project
  image: {
    src: string
    width: number
    height: number
  }
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

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [result[randomIndex]!, result[index]!]
  }

  return result
}

function subcategoryTarget(id: string) {
  return {
    name: 'category',
    params: {
      id: categoryId.value,
      subcategoryId: id,
    },
  }
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

const lightboxImage = ref<string | null>(null)

function openLightbox(image: string): void {
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
      <span class="material-symbols-outlined category-icon">{{ category.icon }}</span>
      <div>
        <h1>{{ selectedSubcategory?.name ?? category.name }}</h1>
        <p>{{ selectedSubcategory?.summary ?? category.summary }}</p>
      </div>
    </header>

    <nav v-if="category.subcategories?.length" class="subcategory-nav" aria-label="Подразделы">
      <router-link
        v-for="subcategory in category.subcategories"
        :key="subcategory.id"
        :to="subcategoryTarget(subcategory.id)"
        class="subcategory-link"
        :class="{ active: subcategory.id === subcategoryId }"
      >
        <span>{{ subcategory.name }}</span>
        <small>{{ subcategory.summary }}</small>
      </router-link>
    </nav>

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
          <img
            v-for="(image, imageIndex) in projectImages(project)"
            :id="imageAnchor(project.id, imageIndex)"
            :key="imageIndex"
            :src="image.src"
            :height="image.height"
            :width="image.width"
            :alt="`${project.title}, изображение ${imageIndex + 1}`"
            class="project-image"
            loading="lazy"
            @click="openLightbox(image.src)"
          />
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
      <img :src="lightboxImage" class="lightbox-image" alt="Полноразмерное изображение" />
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
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4.5rem;
}

.category-icon {
  display: grid;
  width: 3.5rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  color: var(--text-primary);
  font-size: 1.55rem;
  font-weight: 700;
}

.category-header h1 {
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(2rem, 5vw, 4.25rem);
  font-weight: 800;
  line-height: 0.98;
}

.category-header p,
.description {
  color: var(--text-secondary);
}

.subcategory-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin: -2.25rem 0 4.5rem;
}

.subcategory-link {
  display: flex;
  min-height: 6.25rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.85rem;
  padding: 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  color: var(--text-secondary);
  text-decoration: none;
  transition:
    border-color 0.2s,
    background 0.2s,
    color 0.2s,
    transform 0.2s;
}

.subcategory-link:hover,
.subcategory-link.active {
  border-color: var(--border-hover);
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.subcategory-link:hover {
  transform: translateY(-1px);
}

.subcategory-link span {
  color: var(--text-primary);
  font-weight: 700;
  line-height: 1.2;
}

.subcategory-link small {
  color: var(--text-tertiary);
  font-size: 0.78rem;
  line-height: 1.35;
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.project-image {
  width: 100%;
  height: auto;
  min-height: 240px;
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
    margin-bottom: 3rem;
  }

  .subcategory-nav {
    grid-template-columns: 1fr;
    margin: -1.5rem 0 3rem;
  }

  .project-list {
    gap: 4rem;
  }

  .image-gallery {
    grid-template-columns: 1fr;
  }

  .project-image {
    min-height: 0;
  }
}

@media (min-width: 721px) {
  .projects-page {
    padding: clamp(4rem, 7vw, 7rem) clamp(3rem, 8vw, 9rem) 9rem;
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
