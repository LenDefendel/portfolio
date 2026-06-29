import { ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio-theme'
const TRANSITION_DURATION = 300

const isDark = ref(document.documentElement.classList.contains('dark'))
let transitionTimer: ReturnType<typeof setTimeout> | undefined

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}

export function useTheme() {
  watch(isDark, (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, val ? 'dark' : 'light')
    } catch (_error) {
      // Theme switching still works when storage is unavailable.
    }

    document.documentElement.classList.add('theme-transition')
    applyTheme(val)

    clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, TRANSITION_DURATION)
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
