<script setup lang="ts">
const name = 'Your Name'
const title = 'Full-Stack Developer'
const tagline = 'Building clean, scalable web applications'
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <div class="avatar">
        <span>{{ name.charAt(0) }}</span>
      </div>
      <h1>{{ name }}</h1>
      <p class="title">{{ title }}</p>
      <p class="tagline">{{ tagline }}</p>
      <div class="hero-links">
        <a href="#about" class="btn primary">About Me</a>
        <a href="#contact" class="btn secondary">Contact</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 0 40px var(--shadow);
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.tagline {
  color: var(--text-tertiary);
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.hero-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.primary {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 4px 15px var(--shadow);
}

.secondary {
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.secondary:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 15px var(--shadow-sm);
}
</style>
