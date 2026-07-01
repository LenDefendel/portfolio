<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { portfolio } from '@/data/portfolio'

const route = useRoute()
const router = useRouter()

const project = computed(() =>
  portfolio.projects.find((p) => p.id === route.params.id),
)

const workplaceName = computed(() => {
  if (!project.value) return ''
  const w = portfolio.workplaces.find((wp) => wp.id === project.value!.workplaceId)
  return w?.name ?? ''
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="project" class="detail">
    <button class="back-btn" @click="goBack">
      <span class="material-symbols-outlined">arrow_back</span>
      Назад
    </button>

    <div class="detail-content">
      <div class="detail-image">
        <img
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="detail-img"
        />
        <div v-else class="placeholder-img">
          <span class="placeholder-text">{{ project.title.charAt(0) }}</span>
        </div>
        <div v-if="project.images && project.images.length > 1" class="image-gallery">
          <img
            v-for="(img, idx) in project.images"
            :key="idx"
            :src="img"
            :alt="`${project.title} ${idx + 1}`"
            class="gallery-thumb"
            :class="{ active: idx === 0 }"
          />
        </div>
      </div>

      <div class="detail-info">
        <h1>{{ project.title }}</h1>
        <p class="workplace">{{ workplaceName }}</p>
        <p class="description">{{ project.description }}</p>

        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener"
          class="btn"
        >
          <span class="material-symbols-outlined">open_in_new</span>
          Открыть проект
        </a>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Проект не найден</h2>
    <router-link to="/" class="back-link">Вернуться к проектам</router-link>
  </div>
</template>

<style scoped>
.detail {
  padding: 2rem;
  max-width: 1000px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  margin-bottom: 2rem;
}

.back-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.back-btn .material-symbols-outlined {
  font-size: 1.2rem;
}

.detail-content {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.detail-image {
  flex: 1;
}

.detail-img {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--border);
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--border);
  aspect-ratio: 4 / 3;
}

.placeholder-text {
  font-size: 4rem;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.4;
}

.image-gallery {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.gallery-thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid var(--border);
  cursor: pointer;
  transition: border-color 0.2s;
}

.gallery-thumb:hover {
  border-color: var(--accent);
}

.detail-info {
  flex: 1;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.workplace {
  font-size: 0.9rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.description {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tag {
  background: var(--tag-bg);
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  border: 1px solid var(--tag-border);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gradient);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--shadow);
}

.not-found {
  padding: 4rem 2rem;
  text-align: center;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--accent);
  text-decoration: none;
}

@media (max-width: 768px) {
  .detail-content {
    flex-direction: column;
  }
}
</style>
