<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
</script>

<template>
  <div class="app-layout">
    <div class="app-shell">
      <SidebarMenu />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-soft: rgba(37, 99, 235, 0.1);
  --sidebar-width: 264px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.22);
}

.dark {
  --bg: #0b0b0d;
  --bg-elevated: #111113;
  --bg-card: #151518;
  --text-primary: #f4f4f5;
  --text-secondary: #b9bbc3;
  --text-tertiary: #7b7f8a;
  --border: rgba(255, 255, 255, 0.1);
  --border-hover: rgba(37, 99, 235, 0.8);
  --shadow: rgba(0, 0, 0, 0.35);
  --shadow-sm: rgba(0, 0, 0, 0.22);
  --tag-bg: rgba(255, 255, 255, 0.04);
  --tag-border: rgba(255, 255, 255, 0.12);
  --overlay: rgba(0, 0, 0, 0.74);
}

.light {
  --bg: #fafafa;
  --bg-elevated: #ffffff;
  --bg-card: #ffffff;
  --text-primary: #101014;
  --text-secondary: #52525b;
  --text-tertiary: #8a8f98;
  --border: #e4e4e7;
  --border-hover: rgba(37, 99, 235, 0.78);
  --shadow: rgba(16, 16, 20, 0.1);
  --shadow-sm: rgba(16, 16, 20, 0.06);
  --tag-bg: #f4f4f5;
  --tag-border: #e4e4e7;
  --overlay: rgba(10, 10, 12, 0.64);
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

body {
  font-family:
    'Inter',
    'Segoe UI',
    system-ui,
    -apple-system,
    sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  font-size: 16px;
  letter-spacing: 0;
}

.app-layout {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--bg);
}

.app-shell {
  display: flex;
  width: 100%;
  max-width: 1472px;
  margin: 0 auto;
  min-height: inherit;
}

.main-content {
  flex: 1;
  min-width: 0;
}

a,
button {
  -webkit-tap-highlight-color: transparent;
}

a:focus-visible,
button:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

@media (max-width: 768px) {
  .app-shell {
    width: 100%;
  }

  .main-content {
    margin-left: 0;
  }
}

h2 {
  color: var(--text-primary);
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  font-size: clamp(1.55rem, 2.4vw, 2.35rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2.25rem;
  text-align: center;
}
</style>
