<script setup lang="ts">
import { computed } from 'vue'
import { portfolio } from '@/data/portfolio'

const groupedSkills = computed(() => {
  const groups = new Map<string, string[]>()

  for (const skill of portfolio.skills) {
    const group = groups.get(skill.category) ?? []
    group.push(skill.name)
    groups.set(skill.category, group)
  }

  return Array.from(groups, ([category, skills]) => ({ category, skills }))
})
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="section-header">
      <div>
        <h2>Навыки</h2>
        <p>Инструменты, которые помогают мне доводить визуальные идеи до результата.</p>
      </div>
    </div>

    <div class="skills-grid">
      <div
        v-for="group in groupedSkills"
        :key="group.category"
        class="skill-group"
        :class="{ 'skill-group--design': group.category === 'Design' }"
      >
        <div class="group-heading">
          <h3>{{ group.category }}</h3>
        </div>
        <div class="skill-list">
          <span v-for="skill in group.skills" :key="skill" class="skill-pill">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;
  min-height: 100vh;
  padding: clamp(5rem, 9vw, 8rem) 0;
  box-sizing: border-box;
}

.section-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.25rem;
  margin-bottom: 3rem;
}

h2 {
  margin-bottom: 0;
  text-align: left;
}

.section-header p {
  max-width: 720px;
  margin: 1.2rem 0 0;
  color: var(--text-secondary);
  font-size: 1.02rem;
  line-height: 1.75;
}

.skills-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: min(100%, 800px);
  gap: 1.5rem;
}

.skill-group {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.group-heading {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

h3 {
  min-width: 0;
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-pill {
  max-width: 100%;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--tag-border);
  border-radius: 999px;
  background: var(--tag-bg);
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  overflow-wrap: anywhere;
  cursor: default;
  pointer-events: none;
}

@media (max-width: 860px) {
  .skills-section {
    width: min(100%, calc(100% - 2rem));
    padding: 5rem 0 4rem;
  }

  .section-header {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 560px) {
  .skills-section {
    padding-top: 4rem;
  }

  .skill-group {
    padding: 1.25rem;
  }

  .group-heading {
    gap: 0.55rem;
    margin-bottom: 0.85rem;
  }

  .skill-list {
    gap: 0.4rem;
  }

  .skill-pill {
    padding: 0.45rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
