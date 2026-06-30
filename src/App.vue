<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="app-layout">
    <ThemeToggle />
    <SidebarMenu />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  --accent: #a78bfa;
  --accent-hover: #b99bff;
  --gradient: linear-gradient(135deg, #a78bfa, #60a5fa);
}

.dark {
  --bg: #0a0a0f;
  --bg-card: #12121a;
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  --text-tertiary: #71717a;
  --border: #1f1f2a;
  --border-hover: #a78bfa;
  --shadow: rgba(167, 139, 250, 0.3);
  --shadow-sm: rgba(167, 139, 250, 0.15);
  --tag-bg: rgba(167, 139, 250, 0.1);
  --tag-border: rgba(167, 139, 250, 0.2);
}

.light {
  --bg: #f5f5fa;
  --bg-card: #ffffff;
  --text-primary: #18181b;
  --text-secondary: #52525b;
  --text-tertiary: #a1a1aa;
  --border: #e4e4e9;
  --border-hover: #a78bfa;
  --shadow: rgba(167, 139, 250, 0.25);
  --shadow-sm: rgba(167, 139, 250, 0.1);
  --tag-bg: rgba(167, 139, 250, 0.08);
  --tag-border: rgba(167, 139, 250, 0.25);
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
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
}

html.theme-transition body {
  transition:
    background 0.3s,
    color 0.3s;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
