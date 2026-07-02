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
        <span class="section-kicker">Capabilities</span>
        <h2>Навыки</h2>
      </div>
      <p>
        Инструменты и практики, которые помогают доводить визуальные идеи до аккуратного
        пользовательского результата.
      </p>
    </div>

    <div class="skills-grid">
      <div v-for="group in groupedSkills" :key="group.category" class="skill-group">
        <div class="group-heading">
          <span class="material-symbols-outlined group-icon">category</span>
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
  width: min(1120px, calc(100vw - 3rem));
  margin: 0 auto;
  min-height: 100vh;
  padding: clamp(5rem, 9vw, 8rem) 0;
}

.section-header {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: end;
  margin-bottom: 2rem;
}

.section-kicker {
  display: block;
  margin-bottom: 0.75rem;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  margin-bottom: 0;
  text-align: left;
}

.section-header p {
  color: var(--text-secondary);
  font-size: 1.02rem;
  line-height: 1.75;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.skill-group {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  transition:
    background 0.2s,
    border-color 0.3s,
    transform 0.2s;
}

.skill-group:hover {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.group-heading {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.group-icon {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 1.1rem;
}

h3 {
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-pill {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--tag-border);
  border-radius: 999px;
  background: var(--tag-bg);
  color: var(--text-secondary);
  font-size: 0.82rem;
  font-weight: 500;
}

@media (max-width: 860px) {
  .skills-section {
    width: min(100%, calc(100vw - 2rem));
    padding: 5rem 0 4rem;
  }

  .section-header,
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
