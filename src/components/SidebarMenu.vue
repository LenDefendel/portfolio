<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio } from '@/data/portfolio'
import ThemeToggle from '@/components/ThemeToggle.vue'

const route = useRoute()

const avatarSrc = new URL('/src/assets/photo/0061 копия 2-preview.webp', import.meta.url).href

const SIDEBAR_STORAGE_KEY = 'portfolio-sidebar-width'
const DEFAULT_SIDEBAR_WIDTH = 260
const MIN_SIDEBAR_WIDTH = 220
const MAX_SIDEBAR_WIDTH = 420
const MOBILE_MEDIA_QUERY = '(max-width: 768px)'

const isOpen = ref(false)
const isMobile = ref(window.matchMedia(MOBILE_MEDIA_QUERY).matches)
const sidebarWidth = ref(DEFAULT_SIDEBAR_WIDTH)
const isResizing = ref(false)
const openDropdownIds = ref<string[]>([])

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
  isMobile.value = window.matchMedia(MOBILE_MEDIA_QUERY).matches
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

function isDropdownOpen(id: string): boolean {
  return openDropdownIds.value.includes(id)
}

function openDropdown(id: string): void {
  if (isDropdownOpen(id)) return
  openDropdownIds.value = [...openDropdownIds.value, id]
}

function toggleDropdown(id: string): void {
  openDropdownIds.value = isDropdownOpen(id)
    ? openDropdownIds.value.filter((item) => item !== id)
    : [...openDropdownIds.value, id]
}

function openActiveDropdown(): void {
  const activeCategory = portfolio.categories.find(
    (category) => category.subcategories?.length && isCategoryActive(category.id),
  )

  if (activeCategory) {
    openDropdown(activeCategory.id)
  }
}

const isActive = (path: string) => route.path === path

const isCategoryActive = (id: string) =>
  route.path === `/category/${id}` || route.path.startsWith(`/category/${id}/`)

const isSubcategoryActive = (categoryId: string, subcategoryId: string) =>
  route.path === `/category/${categoryId}/${subcategoryId}`

watch(
  route,
  () => {
    openActiveDropdown()
    if (isMobile.value) isOpen.value = false
  },
  { immediate: true },
)
</script>

<template>
  <button v-if="isMobile && !isOpen" class="hamburger" @click="toggle" aria-label="Открыть меню">
    <span class="hamburger-line" />
    <span class="hamburger-line" />
    <span class="hamburger-line" />
  </button>

  <Teleport to="body">
    <div v-if="isMobile && isOpen" class="overlay" @click="close" />
  </Teleport>

  <aside class="sidebar" :class="{ 'sidebar--open': isOpen, 'sidebar--resizing': isResizing }">
    <ThemeToggle :teleport-disabled="isMobile" />
    <div class="sidebar-theme-surface">
      <button
        v-if="isMobile"
        class="hamburger hamburger--open sidebar-close"
        type="button"
        aria-label="Закрыть меню"
        @click="close"
      >
        <span class="hamburger-line" />
        <span class="hamburger-line" />
        <span class="hamburger-line" />
      </button>

      <div class="sidebar-top">
        <div class="profile">
          <div class="avatar">
            <img class="avatar-img" :src="avatarSrc" alt="Avatar" />
          </div>
          <h1 class="name">{{ portfolio.name }}</h1>
          <p class="title">{{ portfolio.title }}</p>
        </div>

        <nav class="nav">
          <router-link to="/" class="nav-item" :class="{ active: isActive('/') }" @click="close">
            <span class="material-symbols-outlined">grid_view</span>
            <span>Главная</span>
          </router-link>

          <div class="nav-divider" />

          <template v-for="category in portfolio.categories" :key="category.id">
            <router-link
              v-if="!category.subcategories?.length"
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

            <button
              v-else
              class="nav-item nav-dropdown-toggle"
              :class="{ active: isCategoryActive(category.id), open: isDropdownOpen(category.id) }"
              type="button"
              :aria-expanded="isDropdownOpen(category.id)"
              @click="toggleDropdown(category.id)"
            >
              <span class="material-symbols-outlined nav-icon">{{ category.icon }}</span>
              <div class="nav-text">
                <span class="nav-name">{{ category.name }}</span>
                <span class="nav-summary">{{ category.summary }}</span>
              </div>
              <span class="material-symbols-outlined nav-chevron">expand_more</span>
            </button>

            <div
              v-if="category.subcategories?.length && isDropdownOpen(category.id)"
              class="nav-subitems"
            >
              <router-link
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                :to="`/category/${category.id}/${subcategory.id}`"
                class="nav-subitem"
                :class="{ active: isSubcategoryActive(category.id, subcategory.id) }"
                @click="close"
              >
                {{ subcategory.name }}
              </router-link>
            </div>
          </template>

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
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 0;
  overflow-y: auto;
  z-index: 100;
}

@media (min-width: 769px) {
  .sidebar {
    position: sticky;
    top: 0;
    left: auto;
    bottom: auto;
    flex: 0 0 var(--sidebar-width);
    height: 100vh;
    transform: none;
    visibility: visible;
    pointer-events: auto;
    transition: none;
  }
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

.sidebar-theme-surface {
  position: relative;
  min-width: 0;
}

.profile {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.25rem 1rem;
  cursor: default;
}

.avatar {
  width: 100px;
  height: 100px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px var(--shadow-sm);
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  border-radius: 50%;
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
  font-family: inherit;
  text-align: left;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

button.nav-item {
  width: 100%;
  background: transparent;
  cursor: pointer;
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
  flex: 1;
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

.nav-chevron {
  flex-shrink: 0;
  color: var(--text-tertiary);
  transition:
    color 0.2s,
    transform 0.2s;
}

.nav-dropdown-toggle.open .nav-chevron {
  transform: rotate(180deg);
}

.nav-dropdown-toggle.active .nav-chevron {
  color: var(--accent);
}

.nav-subitems {
  display: grid;
  gap: 0.1rem;
  margin: -0.05rem 0 0.25rem 2.55rem;
}

.nav-subitem {
  padding: 0.42rem 0.55rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--text-tertiary);
  font-size: 0.78rem;
  line-height: 1.25;
  text-decoration: none;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.nav-subitem:hover,
.nav-subitem.active {
  background: var(--bg-elevated);
  border-color: var(--border);
  color: var(--text-primary);
}

.nav-subitem.active {
  border-color: var(--border-hover);
  color: var(--accent);
}

.nav-divider {
  height: 1px;
  background: var(--border);
  margin: 0.45rem 0.75rem;
}

@media (min-width: 769px) and (max-height: 760px) {
  .sidebar {
    padding: 0.5rem 0;
  }

  .profile {
    padding-bottom: 0.35rem;
  }

  .avatar {
    width: 44px;
    height: 44px;
    margin-bottom: 0.3rem;
    font-size: 1.4rem;
  }

  .name {
    font-size: 0.95rem;
  }

  .title {
    font-size: 0.68rem;
  }

  .nav {
    gap: 0.1rem;
  }

  .nav-item {
    gap: 0.55rem;
    padding: 0.38rem 0.55rem;
    font-size: 0.78rem;
  }

  .nav-item .material-symbols-outlined {
    width: 1.25rem;
    font-size: 1.1rem;
  }

  .nav-name {
    font-size: 0.78rem;
  }

  .nav-summary {
    font-size: 0.62rem;
  }

  .nav-divider {
    margin: 0.3rem 0.65rem;
  }

  .nav-subitems {
    gap: 0.05rem;
    margin-bottom: 0.15rem;
  }

  .nav-subitem {
    padding-top: 0.22rem;
    padding-bottom: 0.22rem;
    font-size: 0.68rem;
  }
}

@media (max-width: 768px) {
  .overlay {
    background: transparent;
    backdrop-filter: none;
  }

  .hamburger {
    display: flex;
  }

  .sidebar-close {
    position: absolute;
  }

  .sidebar {
    width: 100vw;
    background: var(--bg);
    padding: 0;
    overflow: hidden;
    transform: translateX(-100%);
    visibility: hidden;
    pointer-events: none;
    transition: none;
    z-index: 175;
  }

  .sidebar.sidebar--open {
    transform: translateX(0);
    visibility: visible;
    pointer-events: auto;
    transition: transform 0.3s ease;
  }

  .sidebar-theme-surface {
    width: 100%;
    height: 100%;
    padding: 1.25rem 0;
    overflow-y: auto;
    background: var(--bg);
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

  .nav-subitems {
    margin-left: 3rem;
  }

  .nav-subitem {
    padding: 0.58rem 0.7rem;
    font-size: 0.95rem;
  }
}
</style>
