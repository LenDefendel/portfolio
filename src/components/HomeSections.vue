<script setup lang="ts">
import { portfolio } from '@/data/portfolio'

interface HomeSection {
  categoryId: string
  image: string
}

const sections: HomeSection[] = [
  {
    categoryId: 'wallpaper',
    image: new URL('../assets/pre/wall 1-preview.webp', import.meta.url).href,
  },
  {
    categoryId: 'signs',
    image: new URL('../assets/pre/metka-preview.webp', import.meta.url).href,
  },
  {
    categoryId: 'marketplace-cards',
    image: new URL('../assets/pre/card-preview.webp', import.meta.url).href,
  },
  {
    categoryId: 'freelance3d',
    image: new URL('../assets/pre/3d-preview.webp', import.meta.url).href,
  },
]

const homeSections = sections.flatMap((section) => {
  const category = portfolio.categories.find((item) => item.id === section.categoryId)

  return category ? [{ ...section, category }] : []
})
</script>

<template>
  <div class="home-sections">
    <router-link
      v-for="section in homeSections"
      :key="section.category.id"
      :to="`/category/${section.category.id}`"
      class="home-section"
    >
      <img
        :src="section.image"
        :alt="section.category.name"
        class="home-section-image"
        loading="lazy"
      />
      <span class="home-section-overlay" />
      <span class="home-section-content">
        <span class="home-section-title">{{ section.category.name }}</span>
        <span class="home-section-arrow" aria-hidden="true">
          <span class="material-symbols-outlined">arrow_forward</span>
        </span>
      </span>
    </router-link>
  </div>
</template>

<style scoped>
.home-sections {
  width: 100%;
}

.home-section {
  position: relative;
  display: block;
  height: 400px;
  overflow: hidden;
  color: #fff;
  isolation: isolate;
  text-decoration: none;
  background: #1a1a1a;
}

.home-section-image,
.home-section-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.home-section-image {
  object-fit: cover;
  transition: transform 0.5s ease;
}

.home-section-overlay {
  z-index: 1;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.08) 72%);
  transition: background 0.3s ease;
}

.home-section-content {
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.5rem, 4vw, 3.5rem);
}

.home-section-title {
  max-width: 70%;
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(1.6rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 0.98;
}

.home-section-arrow {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 50%;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.home-section-arrow .material-symbols-outlined {
  font-size: 1.75rem;
}

.home-section:hover .home-section-image,
.home-section:focus-visible .home-section-image {
  transform: scale(1.035);
}

.home-section:hover .home-section-overlay,
.home-section:focus-visible .home-section-overlay {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.18) 72%);
}

.home-section:hover .home-section-arrow,
.home-section:focus-visible .home-section-arrow {
  color: #101014;
  background: #fff;
  transform: translateX(0.25rem);
}

@media (max-width: 768px) {
  .home-section {
    height: 400px;
  }

  .home-section-content {
    padding: 1.25rem;
  }

  .home-section-title {
    max-width: 76%;
  }
}
</style>
