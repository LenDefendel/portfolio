import { ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio-theme'

const isDark = ref(document.documentElement.classList.contains('dark'))

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}

export function useTheme() {
  watch(
    isDark,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, val ? 'dark' : 'light')
      } catch (_error) {
        // Theme switching still works when storage is unavailable.
      }

      applyTheme(val)
    },
    { flush: 'sync' },
  )

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
