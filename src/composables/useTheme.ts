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

  function toggle(event?: MouseEvent) {
    const updateTheme = () => {
      isDark.value = !isDark.value
    }
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const transitionRoot = document.querySelector<HTMLElement>(
      isMobile ? '.sidebar-theme-surface' : '.app-layout',
    )
    const viewTransition = (
      transitionRoot as (HTMLElement & {
        startViewTransition?: (update: () => void) => unknown
      }) | null
    )?.startViewTransition

    if (transitionRoot && viewTransition) {
      const target = event?.currentTarget
      const element = target instanceof HTMLElement ? target : null
      const buttonRect = element?.getBoundingClientRect()
      const surfaceRect = transitionRoot.getBoundingClientRect()
      const clientX =
        event?.clientX ||
        (buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2)
      const clientY =
        event?.clientY ||
        (buttonRect ? buttonRect.top + buttonRect.height / 2 : window.innerHeight / 2)

      document.documentElement.style.setProperty(
        '--theme-transition-x',
        `${clientX - surfaceRect.left}px`,
      )
      document.documentElement.style.setProperty(
        '--theme-transition-y',
        `${clientY - surfaceRect.top}px`,
      )
      viewTransition.call(transitionRoot, updateTheme)
      return
    }

    document.documentElement.classList.add('theme-transition')
    updateTheme()

    clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, TRANSITION_DURATION)
  }

  return { isDark, toggle }
}
