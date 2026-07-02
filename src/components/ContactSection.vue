<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-panel">
      <div class="contact-copy">
        <span class="section-kicker">Contact</span>
        <h2>Контакты</h2>
        <p class="contact-text">Открыта к новым проектам и сотрудничеству.</p>
      </div>

      <div class="contact-links" aria-label="Ссылки для связи">
        <a :href="`mailto:${portfolio.email}`" class="contact-card primary">
          <span class="material-symbols-outlined icon">mail</span>
          <span class="link-content">
            <span class="link-label">Email</span>
            <span class="link-value">{{ portfolio.email }}</span>
          </span>
          <span class="material-symbols-outlined arrow">arrow_outward</span>
        </a>
        <a :href="portfolio.github" target="_blank" rel="noopener" class="contact-card">
          <span class="material-symbols-outlined icon">code</span>
          <span class="link-content">
            <span class="link-label">GitHub</span>
            <span class="link-value">Профиль и код</span>
          </span>
          <span class="material-symbols-outlined arrow">arrow_outward</span>
        </a>
        <a :href="portfolio.linkedin" target="_blank" rel="noopener" class="contact-card">
          <span class="material-symbols-outlined icon">link</span>
          <span class="link-content">
            <span class="link-label">LinkedIn</span>
            <span class="link-value">Профессиональный профиль</span>
          </span>
          <span class="material-symbols-outlined arrow">arrow_outward</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: min(1120px, calc(100vw - 3rem));
  margin: 0 auto;
  min-height: 100vh;
  padding: clamp(5rem, 9vw, 8rem) 0;
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: center;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  box-shadow: 0 18px 48px var(--shadow-sm);
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
  margin-bottom: 1rem;
  text-align: left;
}

.contact-text {
  max-width: 360px;
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.75;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-decoration: none;
  color: var(--text-primary);
  transition:
    border-color 0.3s,
    transform 0.2s;
}

.contact-card.primary {
  border-color: var(--border-hover);
}

.contact-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.icon {
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--tag-bg);
  color: var(--text-primary);
  font-size: 1.2rem;
}

.link-content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.link-label {
  font-weight: 700;
}

.link-value {
  color: var(--text-tertiary);
  font-size: 0.86rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  color: var(--text-tertiary);
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.contact-card:hover .arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 860px) {
  .contact-section {
    width: min(100%, calc(100vw - 2rem));
    padding: 5rem 0 4rem;
  }

  .contact-panel {
    grid-template-columns: 1fr;
  }
}
</style>
