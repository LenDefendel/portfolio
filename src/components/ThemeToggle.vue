<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    @click="toggle"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <span class="material-symbols-outlined icon">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.3s,
    transform 0.2s;
}

.icon {
  color: var(--accent);
  font-size: 1.25rem;
}

.theme-toggle:hover {
  border-color: var(--accent);
  transform: scale(1.1);
}
</style>
