<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio } from '@/data/portfolio'

const route = useRoute()

const SIDEBAR_STORAGE_KEY = 'portfolio-sidebar-width'
const DEFAULT_SIDEBAR_WIDTH = 260
const MIN_SIDEBAR_WIDTH = 220
const MAX_SIDEBAR_WIDTH = 420

const isOpen = ref(false)
const isMobile = ref(false)
const sidebarWidth = ref(DEFAULT_SIDEBAR_WIDTH)
const isResizing = ref(false)

function clampSidebarWidth(width: number): number {
  return Math.min(Math.max(width, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH)
}

function setSidebarWidth(width: number, shouldSave = true): void {
  const nextWidth = clampSidebarWidth(Math.round(width))

  sidebarWidth.value = nextWidth
  document.documentElement.style.setProperty('--sidebar-width', `${nextWidth}px`)

  if (shouldSave) {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(nextWidth))
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

function onResizeMove(e: PointerEvent): void {
  setSidebarWidth(e.clientX)
}

function stopResize(): void {
  if (!isResizing.value) return

  isResizing.value = false
  document.body.classList.remove('sidebar-resizing')
  window.removeEventListener('pointermove', onResizeMove)
  window.removeEventListener('pointerup', stopResize)
  window.removeEventListener('pointercancel', stopResize)
}

function startResize(e: PointerEvent): void {
  if (isMobile.value) return

  e.preventDefault()
  isResizing.value = true
  document.body.classList.add('sidebar-resizing')
  setSidebarWidth(e.clientX)
  window.addEventListener('pointermove', onResizeMove)
  window.addEventListener('pointerup', stopResize)
  window.addEventListener('pointercancel', stopResize)
}

function onResizeKeyDown(e: KeyboardEvent): void {
  const step = e.shiftKey ? 32 : 12

  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    setSidebarWidth(sidebarWidth.value - step)
  }

  if (e.key === 'ArrowRight') {
    e.preventDefault()
    setSidebarWidth(sidebarWidth.value + step)
  }

  if (e.key === 'Home') {
    e.preventDefault()
    setSidebarWidth(MIN_SIDEBAR_WIDTH)
  }

  if (e.key === 'End') {
    e.preventDefault()
    setSidebarWidth(MAX_SIDEBAR_WIDTH)
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    setSidebarWidth(DEFAULT_SIDEBAR_WIDTH)
  }
}

onMounted(() => {
  const savedSidebarWidth = localStorage.getItem(SIDEBAR_STORAGE_KEY)
  const savedWidth = savedSidebarWidth === null ? Number.NaN : Number(savedSidebarWidth)

  if (Number.isFinite(savedWidth)) {
    setSidebarWidth(savedWidth, false)
  } else {
    setSidebarWidth(DEFAULT_SIDEBAR_WIDTH, false)
  }

  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  stopResize()
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

watch(route, () => {
  if (isMobile.value) isOpen.value = false
})

const isActive = (path: string) => route.path === path

const isCategoryActive = (id: string) => route.path === `/category/${id}`
</script>

<template>
  <button
    v-if="isMobile"
    class="hamburger"
    :class="{ 'hamburger--open': isOpen }"
    @click="toggle"
    aria-label="Toggle menu"
  >
    <span class="hamburger-line" />
    <span class="hamburger-line" />
    <span class="hamburger-line" />
  </button>

  <Teleport to="body">
    <div v-if="isMobile && isOpen" class="overlay" @click="close" />
  </Teleport>

  <aside class="sidebar" :class="{ 'sidebar--open': isOpen, 'sidebar--resizing': isResizing }">
    <div class="sidebar-top">
      <router-link to="/" class="profile" @click="close">
        <div class="avatar">
          <span>{{ portfolio.name.charAt(0) }}</span>
        </div>
        <h1 class="name">{{ portfolio.name }}</h1>
        <p class="title">{{ portfolio.title }}</p>
      </router-link>

      <nav class="nav">
        <router-link
          to="/category/all"
          class="nav-item"
          :class="{ active: isActive('/category/all') }"
          @click="close"
        >
          <span class="material-symbols-outlined">grid_view</span>
          <span>Все работы</span>
        </router-link>

        <div class="nav-divider" />

        <router-link
          v-for="category in portfolio.categories"
          :key="category.id"
          :to="`/category/${category.id}`"
          class="nav-item"
          :class="{ active: isCategoryActive(category.id) }"
          @click="close"
        >
          <span class="material-symbols-outlined nav-icon">{{ category.icon }}</span>
          <div class="nav-text">
            <span class="nav-name">{{ category.name }}</span>
            <span class="nav-summary">{{ category.summary }}</span>
          </div>
        </router-link>

        <div class="nav-divider" />

        <router-link
          to="/about"
          class="nav-item"
          :class="{ active: isActive('/about') }"
          @click="close"
        >
          <span class="material-symbols-outlined">person</span>
          <span>Обо мне</span>
        </router-link>

        <router-link
          to="/skills"
          class="nav-item"
          :class="{ active: isActive('/skills') }"
          @click="close"
        >
          <span class="material-symbols-outlined">wand_stars</span>
          <span>Навыки</span>
        </router-link>

        <router-link
          to="/contact"
          class="nav-item"
          :class="{ active: isActive('/contact') }"
          @click="close"
        >
          <span class="material-symbols-outlined">mail</span>
          <span>Контакты</span>
        </router-link>
      </nav>
    </div>

    <button
      v-if="!isMobile"
      class="resize-handle"
      type="button"
      aria-label="Изменить ширину меню"
      role="separator"
      aria-orientation="vertical"
      :aria-valuemin="MIN_SIDEBAR_WIDTH"
      :aria-valuemax="MAX_SIDEBAR_WIDTH"
      :aria-valuenow="sidebarWidth"
      @pointerdown="startResize"
      @keydown="onResizeKeyDown"
    />
  </aside>
</template>

<style scoped>
.hamburger {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 200;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-card) 92%, transparent);
  backdrop-filter: blur(14px);
  cursor: pointer;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: border-color 0.2s;
}

.hamburger:hover {
  border-color: var(--border-hover);
}

.hamburger-line {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 2px;
  transition:
    transform 0.3s,
    opacity 0.3s;
}

.hamburger--open .hamburger-line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger--open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger--open .hamburger-line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  backdrop-filter: blur(2px);
  z-index: 150;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 0;
  overflow-y: auto;
  z-index: 100;
}

.sidebar--resizing {
  border-right-color: var(--border-hover);
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  border: 0;
  border-radius: 0;
  background: transparent;
  cursor: col-resize;
  touch-action: none;
  z-index: 2;
}

.resize-handle::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 2px;
  background: transparent;
  transition: background 0.2s;
}

.resize-handle:hover::after,
.resize-handle:focus-visible::after,
.sidebar--resizing .resize-handle::after {
  background: var(--border-hover);
}

:global(body.sidebar-resizing) {
  cursor: col-resize;
  user-select: none;
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.25rem 1rem;
  cursor: pointer;
}

.avatar {
  width: 64px;
  height: 64px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  box-shadow: 0 12px 28px var(--shadow-sm);
  margin-bottom: 0.75rem;
}

.name {
  color: var(--text-primary);
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.15;
}

.title {
  font-size: 0.78rem;
  color: var(--text-tertiary);
  text-align: center;
  margin-top: 0.15rem;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.68rem 0.75rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.nav-item:hover {
  background: var(--bg-elevated);
  border-color: var(--border);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
  color: var(--accent);
}

.nav-item .material-symbols-outlined {
  font-size: 1.25rem;
  width: 1.5rem;
  text-align: center;
}

.nav-icon {
  flex-shrink: 0;
  color: var(--text-tertiary);
  transition: color 0.2s;
}

.nav-item.active .nav-icon {
  color: var(--accent);
}

.nav-text {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-name {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-summary {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-divider {
  height: 1px;
  background: var(--border);
  margin: 0.45rem 0.75rem;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .sidebar {
    width: 100vw;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 175;
  }

  .sidebar.sidebar--open {
    transform: translateX(0);
  }

  .avatar {
    width: 68px;
    height: 68px;
    font-size: 2rem;
  }

  .name {
    font-size: 1.35rem;
  }

  .title {
    font-size: 0.95rem;
  }

  .nav-item {
    padding: 0.95rem 1.1rem;
    font-size: 1.05rem;
    gap: 1rem;
  }

  .nav-item .material-symbols-outlined {
    font-size: 1.6rem;
    width: 2rem;
  }

  .nav-name {
    font-size: 1.05rem;
  }

  .nav-summary {
    font-size: 0.9rem;
  }
}
</style>
