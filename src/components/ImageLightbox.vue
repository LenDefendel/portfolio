<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ProjectImage, ProjectMedia } from '@/data/portfolio'

interface LightboxItem {
  id: string
  media: ProjectMedia
}

const props = defineProps<{
  items: LightboxItem[]
}>()

const route = useRoute()
const router = useRouter()

function isImage(media: ProjectMedia): media is ProjectImage {
  return media.type !== 'video'
}

const image = computed<ProjectImage | null>(() => {
  const imageId = route.query.image
  if (typeof imageId !== 'string') return null

  const item = props.items.find((candidate) => candidate.id === imageId)
  return item && isImage(item.media) ? item.media : null
})

const isZoomed = ref(false)
const imageElement = ref<HTMLImageElement | null>(null)
const imageBounds = ref<DOMRect | null>(null)

function updateImageBounds(): void {
  if (imageElement.value && !isZoomed.value) {
    imageBounds.value = imageElement.value.getBoundingClientRect()
  }
}

watch(image, async () => {
  isZoomed.value = false
  await nextTick()
  updateImageBounds()
})

function open(imageId: string): void {
  const item = props.items.find((candidate) => candidate.id === imageId)
  if (!item || !isImage(item.media)) return

  isZoomed.value = false

  router.push({
    query: {
      ...route.query,
      image: imageId,
    },
  })
}

function close(): void {
  if (!image.value) return

  isZoomed.value = false

  const query = { ...route.query }
  delete query.image
  router.replace({ query })
}

function toggleZoom(): void {
  updateImageBounds()
  isZoomed.value = !isZoomed.value
}

function isImageClick(event: MouseEvent): boolean {
  if (!isZoomed.value) updateImageBounds()

  const bounds = imageBounds.value
  if (!bounds) return false

  return (
    event.clientX >= bounds.left &&
    event.clientX <= bounds.right &&
    event.clientY >= bounds.top &&
    event.clientY <= bounds.bottom
  )
}

function onOverlayClick(event: MouseEvent): void {
  if (isImageClick(event)) {
    toggleZoom()
    return
  }

  close()
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && image.value) close()
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <div v-if="image" class="lightbox-overlay" @click="onOverlayClick">
      <button
        class="lightbox-close"
        type="button"
        aria-label="Закрыть изображение"
        @click.stop="close"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
      <img
        ref="imageElement"
        :src="image.fullSrc ?? image.src"
        :width="image.fullWidth ?? image.width"
        :height="image.fullHeight ?? image.height"
        class="lightbox-image"
        :class="{ 'lightbox-image--zoomed': isZoomed }"
        alt="Полноразмерное изображение"
        @load="updateImageBounds"
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
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: var(--radius-sm);
  cursor: zoom-in;
  transition: transform 0.25s ease;
}

.lightbox-image--zoomed {
  cursor: zoom-out;
  transform: scale(2);
}
</style>
