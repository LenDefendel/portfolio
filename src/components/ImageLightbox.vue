<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
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

const zoomScale = ref(1)
const isZoomed = computed(() => zoomScale.value > 1.01)
const isDragging = ref(false)
const panX = ref(0)
const panY = ref(0)

let pointerStartX = 0
let pointerStartY = 0
let panStartX = 0
let panStartY = 0
let didDrag = false
let activeTouchIdentifier: number | null = null
let ignoreClickUntil = 0
let isPinching = false
let pinchStartDistance = 0
let pinchStartScale = 1

const imageTransform = computed(() =>
  isZoomed.value
    ? `translate3d(${panX.value}px, ${panY.value}px, 0) scale(${zoomScale.value})`
    : undefined,
)

function resetView(): void {
  zoomScale.value = 1
  isDragging.value = false
  panX.value = 0
  panY.value = 0
  didDrag = false
  isPinching = false
}

watch(image, resetView)

function open(imageId: string, suppressInitialClick = false): void {
  const item = props.items.find((candidate) => candidate.id === imageId)
  if (!item || !isImage(item.media)) return

  resetView()
  ignoreClickUntil = suppressInitialClick ? Date.now() + 700 : 0

  router.push({
    query: {
      ...route.query,
      image: imageId,
    },
  })
}

function close(): void {
  if (!image.value) return

  resetView()

  const query = { ...route.query }
  delete query.image
  router.replace({ query })
}

function toggleZoom(): void {
  zoomScale.value = isZoomed.value ? 1 : 2
  if (zoomScale.value === 1) {
    panX.value = 0
    panY.value = 0
  }
}

function onImageClick(event: MouseEvent): void {
  event.stopPropagation()

  if (Date.now() < ignoreClickUntil) return

  if (didDrag) {
    didDrag = false
    return
  }

  toggleZoom()
}

function onOverlayClick(): void {
  if (Date.now() < ignoreClickUntil) return
  close()
}

function onPointerDown(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') return
  if (!isZoomed.value || event.button !== 0) return

  event.preventDefault()
  isDragging.value = true
  didDrag = false
  pointerStartX = event.clientX
  pointerStartY = event.clientY
  panStartX = panX.value
  panStartY = panY.value
  const target = event.currentTarget as HTMLImageElement
  target.setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') return
  if (!isDragging.value) return

  const deltaX = event.clientX - pointerStartX
  const deltaY = event.clientY - pointerStartY

  if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
    didDrag = true
  }

  panX.value = panStartX + deltaX
  panY.value = panStartY + deltaY
}

function onPointerUp(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') return
  if (!isDragging.value) return

  isDragging.value = false
  const target = event.currentTarget as HTMLImageElement
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId)
  }
}

function onPointerCancel(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') return

  isDragging.value = false
  didDrag = false
}

function findTouch(touches: TouchList, identifier: number): Touch | null {
  for (let index = 0; index < touches.length; index += 1) {
    const touch = touches.item(index)
    if (touch?.identifier === identifier) return touch
  }

  return null
}

function touchDistance(first: Touch, second: Touch): number {
  return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY)
}

function setZoomScale(scale: number): void {
  zoomScale.value = Math.min(4, Math.max(1, scale))

  if (zoomScale.value === 1) {
    panX.value = 0
    panY.value = 0
  }
}

function onTouchStart(event: TouchEvent): void {
  if (event.touches.length >= 2) {
    const first = event.touches.item(0)
    const second = event.touches.item(1)
    if (!first || !second) return

    event.preventDefault()
    activeTouchIdentifier = null
    didDrag = true
    isPinching = true
    isDragging.value = true
    pinchStartDistance = touchDistance(first, second)
    pinchStartScale = zoomScale.value
    return
  }

  if (event.touches.length !== 1) return

  const touch = event.touches.item(0)
  if (!touch) return

  activeTouchIdentifier = touch.identifier
  pointerStartX = touch.clientX
  pointerStartY = touch.clientY
  panStartX = panX.value
  panStartY = panY.value
  didDrag = false
  isDragging.value = isZoomed.value
}

function onTouchMove(event: TouchEvent): void {
  if (isPinching && event.touches.length >= 2) {
    const first = event.touches.item(0)
    const second = event.touches.item(1)
    if (!first || !second || pinchStartDistance === 0) return

    event.preventDefault()
    setZoomScale(pinchStartScale * (touchDistance(first, second) / pinchStartDistance))
    return
  }

  if (activeTouchIdentifier === null) return

  const touch = findTouch(event.touches, activeTouchIdentifier)
  if (!touch) return

  event.preventDefault()

  const deltaX = touch.clientX - pointerStartX
  const deltaY = touch.clientY - pointerStartY

  if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
    didDrag = true
  }

  if (isZoomed.value) {
    panX.value = panStartX + deltaX
    panY.value = panStartY + deltaY
  }
}

function onTouchEnd(event: TouchEvent): void {
  if (isPinching) {
    event.preventDefault()
    event.stopPropagation()
    activeTouchIdentifier = null
    isPinching = false
    isDragging.value = false
    ignoreClickUntil = Date.now() + 700
    return
  }

  if (activeTouchIdentifier === null) return

  const touch = findTouch(event.changedTouches, activeTouchIdentifier)
  if (!touch) return

  event.preventDefault()
  event.stopPropagation()
  activeTouchIdentifier = null
  isDragging.value = false
  ignoreClickUntil = Date.now() + 700
  didDrag = false
}

function onTouchCancel(): void {
  activeTouchIdentifier = null
  isPinching = false
  isDragging.value = false
  didDrag = false
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
    <div v-if="image" class="lightbox-overlay" @click.self="onOverlayClick">
      <button
        class="lightbox-close"
        type="button"
        aria-label="Закрыть изображение"
        @click.stop="close"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
      <img
        :src="image.fullSrc ?? image.src"
        :width="image.fullWidth ?? image.width"
        :height="image.fullHeight ?? image.height"
        class="lightbox-image"
        :class="{
          'lightbox-image--zoomed': isZoomed,
          'lightbox-image--dragging': isDragging,
        }"
        :style="{ transform: imageTransform }"
        alt="Полноразмерное изображение"
        draggable="false"
        @click="onImageClick"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchCancel"
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
  z-index: 2;
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
  touch-action: none;
  user-select: none;
  transition: transform 0.25s ease;
}

.lightbox-image--zoomed {
  cursor: grab;
}

.lightbox-image--dragging {
  cursor: grabbing;
  transition: none;
}

@media (max-width: 768px) {
  .lightbox-overlay {
    padding: 1rem;
  }

  .lightbox-close {
    width: 3rem;
    height: 3rem;
  }
}
</style>
