<script setup lang="ts">
const aboutText =
  "I'm a full-stack developer with experience building modern web applications. I enjoy turning complex problems into simple, beautiful solutions. Passionate about clean code, performance, and user experience."
</script>

<template>
  <section id="about">
    <h2>About Me</h2>
    <div class="about-content">
      <p>{{ aboutText }}</p>
      <div class="stats">
        <div class="stat">
          <span class="stat-value">3+</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat">
          <span class="stat-value">20+</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat">
          <span class="stat-value">10+</span>
          <span class="stat-label">Technologies</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-content {
  max-width: 650px;
  margin: 0 auto;
}

p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
  display: block;
}
</style>
