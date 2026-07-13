<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label: string
  value: string
  href: string
  icon: 'email' | 'telegram'
  external?: boolean
}

const props = defineProps<Props>()
const copied = ref(false)

const copyValue = async () => {
  await navigator.clipboard.writeText(props.value)
  copied.value = true

  window.setTimeout(() => {
    copied.value = false
  }, 1800)
}
</script>

<template>
  <div
    class="contact-card"
    role="button"
    tabindex="0"
    :aria-label="copied ? 'Скопировано' : `Скопировать ${label}`"
    :title="copied ? 'Скопировано' : `Скопировать ${label}`"
    @click="copyValue"
    @keydown.enter="copyValue"
    @keydown.space.prevent="copyValue"
  >
    <span v-if="icon === 'email'" class="material-symbols-outlined icon">mail</span>
    <svg v-else class="icon icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.91 3.79 20.3 20.83c-.27 1.2-.98 1.5-1.98.94l-5.45-4.02-2.63 2.53c-.29.29-.53.53-1.08.53l.39-5.56 10.12-9.14c.44-.39-.1-.61-.68-.22L6.47 13.92l-5.4-1.69c-1.17-.36-1.19-1.17.24-1.73L22.4 2.4c.98-.36 1.84.22 1.51 1.39Z"
      />
    </svg>

    <span class="link-content">
      <span class="link-label">{{ copied ? 'Скопировано' : label }}</span>
      <span class="link-value">{{ value }}</span>
    </span>

    <span class="contact-actions">
      <a
        :href="href"
        :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener' : undefined"
        class="contact-action"
        :aria-label="icon === 'email' ? 'Написать на email' : 'Перейти в Telegram'"
        :title="icon === 'email' ? 'Написать на email' : 'Перейти в Telegram'"
        @click.stop
      >
        <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
      </a>
      <button
        type="button"
        class="contact-action"
        :aria-label="copied ? 'Скопировано' : `Скопировать ${label}`"
        :title="copied ? 'Скопировано' : `Скопировать ${label}`"
        @click.stop="copyValue"
      >
        <span class="material-symbols-outlined" aria-hidden="true">
          {{ copied ? 'check' : 'content_copy' }}
        </span>
      </button>
    </span>
  </div>
</template>

<style scoped>
.contact-card {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.3s,
    transform 0.2s;
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
  transition: color 0.2s;
}

.contact-action .material-symbols-outlined {
  font-size: 1.1rem;
}

.contact-action:hover,
.contact-action:focus-visible {
  color: var(--text-primary);
}

@media (max-width: 560px) {
  .contact-action {
    flex: 0 0 1.75rem;
  }
}
</style>
