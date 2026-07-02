<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="skills">
    <h2>Навыки</h2>
    <div class="skills-grid">
      <div v-for="skill in portfolio.skills" :key="skill.name" class="skill-card">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-category">{{ skill.category }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.skill-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  transition:
    border-color 0.3s,
    transform 0.2s;
}

.skill-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}

.skill-name {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.skill-category {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}
</style>
