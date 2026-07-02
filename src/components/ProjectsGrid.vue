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

const workplaceId = computed(() => route.params.id as string)
const workplace = computed(() => portfolio.workplaces.find((item) => item.id === workplaceId.value))
const workplaceProjects = computed(() =>
  portfolio.projects.filter((project) => project.workplaceId === workplaceId.value),
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

const allImages = computed<GalleryItem[]>(() =>
  shuffle(
    portfolio.projects.flatMap((project) => {
      const workplaceExists = portfolio.workplaces.some(
        (workplaceItem) => workplaceItem.id === project.workplaceId,
      )

      return workplaceExists
        ? projectImages(project).map((image, imageIndex) => ({ project, image, imageIndex }))
        : []
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
  <div v-if="workplaceId === 'all'" class="projects-page">
    <div v-if="allImages.length" class="projects-grid">
      <ProjectCard
        v-for="item in allImages"
        :key="`${item.project.id}-${item.imageIndex}`"
        :project="item.project"
        :image="item.image"
        :image-index="item.imageIndex"
      />
    </div>
    <div v-else class="empty">
      <span class="material-symbols-outlined empty-icon">folder_off</span>
      <p>Нет проектов</p>
    </div>
  </div>

  <article v-else-if="workplace" class="workplace-page">
    <header class="workplace-header">
      <span class="workplace-icon">{{ workplace.icon }}</span>
      <div>
        <h1>{{ workplace.name }}</h1>
        <p>{{ workplace.role }} · {{ workplace.period }}</p>
      </div>
    </header>

    <div v-if="workplaceProjects.length" class="project-list">
      <section
        v-for="project in workplaceProjects"
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
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
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
    <p>Место работы не найдено</p>
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
.projects-page,
.workplace-page {
  padding: 2rem 8rem 8rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.workplace-page {
  max-width: 1280px;
}

.workplace-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
}

.workplace-icon {
  display: grid;
  width: 3.5rem;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 12px;
  background: var(--gradient);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
}

.workplace-header h1 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.15;
}

.workplace-header p,
.description {
  color: var(--text-secondary);
}

.project-list {
  display: grid;
  gap: 7rem;
}

.project-section {
  scroll-margin-top: 2rem;
}

.project-heading {
  max-width: 760px;
  margin-bottom: 2rem;
}

.project-heading h2 {
  margin-bottom: 1rem;
  text-align: left;
}

.description {
  line-height: 1.8;
}

.description .desc-link {
  color: var(--accent);
  overflow-wrap: anywhere;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.tag {
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--tag-border);
  border-radius: 20px;
  background: var(--tag-bg);
  color: var(--accent);
  font-size: 0.85rem;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.project-image {
  width: 100%;
  height: auto;
  min-height: 240px;
  scroll-margin-top: 2rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  object-fit: cover;
  background: var(--bg-card);
  cursor: pointer;
  transition: opacity 0.3s;
}

.project-image:hover {
  opacity: 0.85;
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
  background: rgba(0, 0, 0, 0.85);
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
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.8);
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
}

@media (max-width: 768px) {
  .projects-page,
  .workplace-page {
    padding: 4.5rem 1rem 4rem;
  }

  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .workplace-header {
    margin-bottom: 3rem;
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
</style>
