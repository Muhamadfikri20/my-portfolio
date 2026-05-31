import type { PrayerData } from '@/domain/models/Prayer'

/**
 * Fetch prayer times from the internal API proxy.
 * The proxy (/api/prayer-times) hides the RapidAPI key server-side.
 */
export async function fetchPrayerTimes(): Promise<PrayerData> {
  const response = await fetch('/api/prayer-times')

  if (!response.ok) {
    throw new Error('Failed to fetch prayer times')
  }

  return response.json()
}
