/**
 * v-reveal — animate an element into view on scroll.
 *
 * Usage:
 *   v-reveal                → fade-up, no delay
 *   v-reveal="120"          → fade-up, 120ms stagger delay
 *   v-reveal:zoom="i * 70"  → zoom-in variant with staggered delay
 *
 * Variants (directive arg): zoom | left | right
 * Honors prefers-reduced-motion (shows content instantly).
 */
const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const reveal = {
  mounted(el, binding) {
    if (PREFERS_REDUCED || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    el.classList.add('reveal')
    if (binding.arg) el.classList.add(`reveal-${binding.arg}`)

    const delay = Number(binding.value) || 0
    if (delay) el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.unobserve(el)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    el._revealIO = io
  },
  unmounted(el) {
    el._revealIO?.disconnect?.()
    el._revealIO = null
  },
}

export default reveal
