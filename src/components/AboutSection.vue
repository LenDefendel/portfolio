<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="about">
    <h2>Обо мне</h2>
    <div class="about-content">
      <p>{{ portfolio.about }}</p>
      <div class="stats">
        <div v-for="stat in portfolio.stats" :key="stat.label" class="stat">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-content {
  max-width: 650px;
  margin: 0 auto;
}

p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  color: var(--text-primary);
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 800;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
  display: block;
}
</style>
