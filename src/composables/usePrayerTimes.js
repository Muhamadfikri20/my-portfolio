import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchPrayerTimes, parseTimeStr } from '@/services/prayerService'

const PRAYER_ORDER = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

export function usePrayerTimes() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const now = ref(new Date())

  let tickTimer = null

  async function load({ force = false } = {}) {
    loading.value = true
    error.value = null
    try {
      data.value = await fetchPrayerTimes({ force })
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const today = computed(() => data.value?.items?.[0] || null)

  const prayers = computed(() => {
    if (!today.value) return []
    return PRAYER_ORDER.map((name) => ({
      name,
      time: today.value[name],
      minutes: parseTimeStr(today.value[name]),
    }))
  })

  const nextPrayer = computed(() => {
    if (!prayers.value.length) return null
    const nowMins = now.value.getHours() * 60 + now.value.getMinutes()
    for (const p of prayers.value) {
      if (p.minutes !== null && p.minutes > nowMins) {
        return { ...p, minsRemaining: p.minutes - nowMins }
      }
    }
    // After Isha → next Fajr tomorrow
    const fajr = prayers.value[0]
    if (fajr?.minutes !== null) {
      return { ...fajr, minsRemaining: 24 * 60 - nowMins + fajr.minutes }
    }
    return null
  })

  const countdown = computed(() => {
    const r = nextPrayer.value?.minsRemaining
    if (r == null || r < 0) return null
    const h = Math.floor(r / 60)
    const m = r % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  })

  onMounted(() => {
    load()
    tickTimer = setInterval(() => {
      now.value = new Date()
    }, 30_000)
  })

  onUnmounted(() => {
    if (tickTimer) clearInterval(tickTimer)
  })

  return {
    data,
    loading,
    error,
    today,
    prayers,
    nextPrayer,
    countdown,
    reload: () => load({ force: true }),
  }
}
