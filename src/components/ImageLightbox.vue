<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { ProjectImage, ProjectMedia } from '@/data/portfolio'

const image = ref<ProjectImage | null>(null)

function open(media: ProjectMedia): void {
  if (media.type === 'video') return
  image.value = media
}

function close(): void {
  image.value = null
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <div v-if="image" class="lightbox-overlay" @click="close">
      <button class="lightbox-close" type="button" aria-label="Закрыть изображение" @click="close">
        <span class="material-symbols-outlined">close</span>
      </button>
      <img
        :src="image.fullSrc ?? image.src"
        :width="image.fullWidth ?? image.width"
        :height="image.fullHeight ?? image.height"
        class="lightbox-image"
        alt="Полноразмерное изображение"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.9);
  cursor: zoom-out;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.14);
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius-sm);
  cursor: zoom-out;
}
</style>
