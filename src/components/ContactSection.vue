<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="contact">
    <h2>Контакты</h2>
    <p class="contact-text">Открыта к новым проектам и сотрудничеству.</p>
    <div class="contact-links">
      <a :href="`mailto:${portfolio.email}`" class="contact-card">
        <span class="material-symbols-outlined icon">mail</span>
        <span>{{ portfolio.email }}</span>
      </a>
      <a :href="portfolio.github" target="_blank" rel="noopener" class="contact-card">
        <span class="material-symbols-outlined icon">code</span>
        <span>GitHub</span>
      </a>
      <a :href="portfolio.linkedin" target="_blank" rel="noopener" class="contact-card">
        <span class="material-symbols-outlined icon">link</span>
        <span>LinkedIn</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-text {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--text-primary);
  transition:
    border-color 0.3s,
    transform 0.2s;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.icon {
  font-size: 1.2rem;
  width: 1.5rem;
  text-align: center;
  color: var(--accent);
}
</style>
