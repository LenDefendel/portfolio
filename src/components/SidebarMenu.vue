<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { portfolio } from '@/data/portfolio'


const route = useRoute()

const isOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
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

const isWorkplaceActive = (id: string) => route.path === `/workplace/${id}`
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

  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
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
          to="/workplace/all"
          class="nav-item"
          :class="{ active: isActive('/workplace/all') }"
          @click="close"
        >
          <span class="material-symbols-outlined">grid_view</span>
          <span>Все проекты</span>
        </router-link>

        <div class="nav-divider" />

        <router-link
          v-for="w in portfolio.workplaces"
          :key="w.id"
          :to="`/workplace/${w.id}`"
          class="nav-item"
          :class="{ active: isWorkplaceActive(w.id) }"
          @click="close"
        >
          <span class="nav-icon">{{ w.icon }}</span>
          <div class="nav-text">
            <span class="nav-name">{{ w.name }}</span>
            <span class="nav-role">{{ w.role }}</span>
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

  </aside>
</template>

<style scoped>
.hamburger {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 200;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  cursor: pointer;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: border-color 0.2s;
}

.hamburger:hover {
  border-color: var(--accent);
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: var(--bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0;
  overflow-y: auto;
  z-index: 100;
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.profile {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem 1rem;
  cursor: pointer;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 0 30px var(--shadow);
  margin-bottom: 0.75rem;
}

.name {
  font-size: 1.2rem;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.title {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  text-align: center;
  margin-top: 0.15rem;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background 0.2s,
    color 0.2s;
}

.nav-item:hover {
  background: var(--tag-bg);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--tag-bg);
  color: var(--accent);
}

.nav-item .material-symbols-outlined {
  font-size: 1.25rem;
  width: 1.5rem;
  text-align: center;
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 8px;
  background: var(--gradient);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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

.nav-role {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-divider {
  height: 1px;
  background: var(--border);
  margin: 0.35rem 0.75rem;
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
    width: 80px;
    height: 80px;
    font-size: 2.2rem;
  }

  .name {
    font-size: 1.5rem;
  }

  .title {
    font-size: 1.05rem;
  }

  .nav-item {
    padding: 1rem 1.25rem;
    font-size: 1.2rem;
    gap: 1rem;
  }

  .nav-item .material-symbols-outlined {
    font-size: 1.6rem;
    width: 2rem;
  }

  .nav-icon {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    border-radius: 10px;
  }

  .nav-name {
    font-size: 1.2rem;
  }

  .nav-role {
    font-size: 1rem;
  }
}
</style>
