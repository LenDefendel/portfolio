<script setup lang="ts">
import { ref } from 'vue'
import { portfolio } from '@/data/portfolio'

const emailCopied = ref(false)
const telegramCopied = ref(false)

const copyEmail = async () => {
  await navigator.clipboard.writeText(portfolio.email)
  emailCopied.value = true

  window.setTimeout(() => {
    emailCopied.value = false
  }, 1800)
}

const copyTelegram = async () => {
  await navigator.clipboard.writeText(portfolio.telegram)
  telegramCopied.value = true

  window.setTimeout(() => {
    telegramCopied.value = false
  }, 1800)
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-panel">
      <div class="contact-copy">
        <h2>Контакты</h2>
        <p class="contact-text">Открыта к новым проектам и сотрудничеству.</p>
      </div>

      <div class="contact-links" aria-label="Ссылки для связи">
        <button
          type="button"
          class="contact-card"
          :aria-label="emailCopied ? 'Email скопирован' : 'Скопировать email'"
          :title="emailCopied ? 'Скопировано' : 'Скопировать email'"
          @click="copyEmail"
        >
          <span class="material-symbols-outlined icon">mail</span>
          <span class="link-content">
            <span class="link-label">{{ emailCopied ? 'Скопировано' : 'Email' }}</span>
            <span class="link-value">{{ portfolio.email }}</span>
          </span>
          <span class="material-symbols-outlined arrow">content_copy</span>
        </button>
        <div class="contact-card telegram-card">
          <svg class="icon icon-svg" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M23.91 3.79 20.3 20.83c-.27 1.2-.98 1.5-1.98.94l-5.45-4.02-2.63 2.53c-.29.29-.53.53-1.08.53l.39-5.56 10.12-9.14c.44-.39-.1-.61-.68-.22L6.47 13.92l-5.4-1.69c-1.17-.36-1.19-1.17.24-1.73L22.4 2.4c.98-.36 1.84.22 1.51 1.39Z"
            />
          </svg>
          <span class="link-content">
            <span class="link-label">Telegram</span>
            <span class="link-value">{{ portfolio.telegram }}</span>
          </span>
          <span class="contact-actions">
            <a
              :href="portfolio.telegram"
              target="_blank"
              rel="noopener"
              class="contact-action"
              aria-label="Перейти в Telegram"
              title="Перейти в Telegram"
            >
              <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
            </a>
            <button
              type="button"
              class="contact-action"
              :aria-label="telegramCopied ? 'Ссылка скопирована' : 'Скопировать ссылку Telegram'"
              :title="telegramCopied ? 'Скопировано' : 'Скопировать ссылку'"
              @click="copyTelegram"
            >
              <span class="material-symbols-outlined" aria-hidden="true">
                {{ telegramCopied ? 'check' : 'content_copy' }}
              </span>
            </button>
          </span>
        </div>
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

.contact-card {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-decoration: none;
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.3s,
    transform 0.2s;
}

.contact-card:first-child .icon {
  font-size: 1.35rem;
}

.contact-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.contact-card:hover .arrow,
.contact-card:focus-visible .arrow {
  color: var(--text-primary);
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
  color: var(--text-secondary);
  font-size: 1.2rem;
}

.icon-svg {
  box-sizing: border-box;
  padding: 0.5rem;
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
  display: grid;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.telegram-card {
  flex-wrap: nowrap;
}

.contact-actions {
  display: flex;
  flex: 0 0 auto;
  gap: 0.5rem;
  margin-left: auto;
}

.contact-action {
  display: grid;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: 0.82rem;
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}

.contact-action .material-symbols-outlined {
  font-size: 1.1rem;
}

.contact-action:hover,
.contact-action:focus-visible {
  color: var(--text-primary);
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

  .contact-action {
    flex: 0 0 1.75rem;
  }
}
</style>
