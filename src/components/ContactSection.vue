<script setup lang="ts">
import ContactCard from '@/components/ContactCard.vue'
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-panel">
      <div class="contact-copy">
        <h2>Контакты</h2>
        <p class="contact-text">Открыта к новым проектам и сотрудничеству.</p>
      </div>

      <div class="contact-links" aria-label="Ссылки для связи">
        <ContactCard label="Email" :value="portfolio.email" :href="`mailto:${portfolio.email}`" icon="email" />
        <ContactCard
          label="Telegram"
          :value="portfolio.telegram"
          :href="portfolio.telegram"
          icon="telegram"
          external
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;
  min-height: 100vh;
  padding: clamp(5rem, 9vw, 8rem) 0;
  box-sizing: border-box;
}

.contact-panel {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 3.5rem);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  box-shadow: 0 18px 48px var(--shadow-sm);
}

h2 {
  margin-bottom: 1rem;
  text-align: left;
}

.contact-text {
  max-width: 360px;
  color: var(--text-primary);
  font-size: 1.05rem;
  line-height: 1.75;
}

.contact-links {
  display: flex;
  width: min(100%, 640px);
  flex-direction: column;
  gap: 0.75rem;
}

@media (max-width: 860px) {
  .contact-section {
    width: min(100%, calc(100% - 2rem));
    padding: 5rem 0 4rem;
  }

  .contact-panel {
    gap: 2rem;
    padding: 1.5rem;
  }

}

@media (max-width: 560px) {
  .contact-section {
    padding-top: 4rem;
  }

  .contact-panel {
    gap: 1.5rem;
    padding: 1.25rem;
  }

}
</style>
