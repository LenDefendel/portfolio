<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio, type Project } from '@/data/portfolio'
import ProjectCard from '@/components/ProjectCard.vue'

interface GalleryItem {
  project: Project
  image: string
  imageIndex: number
}

const route = useRoute()

const workplaceId = computed(() => route.params.id as string)
const workplace = computed(() =>
  portfolio.workplaces.find((item) => item.id === workplaceId.value),
)
const workplaceProjects = computed(() =>
  portfolio.projects.filter((project) => project.workplaceId === workplaceId.value),
)

function projectImages(project: Project): string[] {
  const images = project.images?.length ? project.images : project.image ? [project.image] : []

  return images.filter((image) => !image.startsWith('/placeholder-'))
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

function linkify(text: string): string {
  return text.replace(
    /https?:\/\/[^\s,)]+/g,
    (url) => `<a href="${url}" target="_blank" rel="noopener" class="desc-link">${url}</a>`,
  )
}
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
          <p class="description" v-html="linkify(project.description)" />
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="image-gallery">
          <img
            v-for="(image, imageIndex) in projectImages(project)"
            :id="imageAnchor(project.id, imageIndex)"
            :key="imageIndex"
            :src="image"
            :alt="`${project.title}, изображение ${imageIndex + 1}`"
            class="project-image"
            loading="lazy"
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

.description :deep(.desc-link) {
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
