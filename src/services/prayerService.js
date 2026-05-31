import { RAPIDAPI } from '@/config/api.endpoints'
import { STORAGE_KEYS } from '@/config/constants'

/**
 * Fetch prayer times for Jakarta from MuslimSalat / RapidAPI.
 * Uses localStorage cache with 10-min TTL.
 */
export async function fetchPrayerTimes({ force = false } = {}) {
  // Cache hit
  if (!force) {
    try {
      const cachedRaw = localStorage.getItem(STORAGE_KEYS.PRAYER_CACHE)
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw)
        if (Date.now() - cached.fetchedAt < RAPIDAPI.CACHE_TTL_MS) {
          return cached.data
        }
      }
    } catch {
      // Ignore corrupt cache
    }
  }

  if (!RAPIDAPI.KEY) {
    throw new Error(
      'VITE_RAPIDAPI_KEY not set — set it in .env.local to enable prayer widget',
    )
  }

  const res = await fetch(RAPIDAPI.PRAYER_ENDPOINT, {
    headers: {
      'x-rapidapi-key': RAPIDAPI.KEY,
      'x-rapidapi-host': RAPIDAPI.HOST,
    },
  })

  if (!res.ok) {
    throw new Error(`Prayer API HTTP ${res.status}`)
  }

  const raw = await res.json()
  const data = {
    items: raw.items,
    state: raw.state,
    country: raw.country,
    status: raw.status_valid,
  }

  try {
    localStorage.setItem(
      STORAGE_KEYS.PRAYER_CACHE,
      JSON.stringify({ data, fetchedAt: Date.now() }),
    )
  } catch {
    // Ignore quota errors
  }

  return data
}

/**
 * Parse a time string like "5:30 am" → minutes since midnight.
 * Returns null if unparseable.
 */
export function parseTimeStr(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null
  const m = timeStr.toLowerCase().match(/(\d{1,2}):(\d{2})\s*(am|pm)?/)
  if (!m) return null
  let hours = parseInt(m[1], 10)
  const mins = parseInt(m[2], 10)
  const meridiem = m[3]
  if (meridiem === 'pm' && hours < 12) hours += 12
  if (meridiem === 'am' && hours === 12) hours = 0
  return hours * 60 + mins
}
