<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="about" class="about-section">
    <div class="section-kicker">Profile</div>
    <div class="about-layout">
      <div class="about-heading">
        <h2>Обо мне</h2>
        <p class="lead">{{ portfolio.title }}</p>
      </div>

      <div class="about-body">
        <p class="about-text">{{ portfolio.about }}</p>
        <div class="stats" aria-label="Ключевые показатели опыта">
          <div v-for="stat in portfolio.stats" :key="stat.label" class="stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  width: min(1120px, calc(100vw - 3rem));
  margin: 0 auto;
  min-height: 100vh;
  padding: clamp(5rem, 9vw, 8rem) 0;
}

.section-kicker {
  margin-bottom: 1rem;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-layout {
  display: grid;
  grid-template-columns: minmax(220px, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  box-shadow: 0 18px 48px var(--shadow-sm);
}

h2 {
  margin-bottom: 0.85rem;
  text-align: left;
}

.lead {
  color: var(--text-tertiary);
  font-size: 0.95rem;
  font-weight: 600;
}

.about-text {
  max-width: 720px;
  color: var(--text-secondary);
  font-size: clamp(1.05rem, 1.2vw, 1.2rem);
  line-height: 1.85;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 2.25rem;
}

.stat {
  min-height: 112px;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg);
}

.stat-value {
  display: block;
  color: var(--text-primary);
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  margin-top: 0.55rem;
  display: block;
}

@media (max-width: 860px) {
  .about-section {
    width: min(100%, calc(100vw - 2rem));
    padding: 5rem 0 4rem;
  }

  .about-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 560px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .stat {
    min-height: 0;
  }
}
</style>
