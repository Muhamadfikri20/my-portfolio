'use client'

import { useState, useEffect } from 'react'
import type { PrayerData, NextPrayer } from '@/domain/models/Prayer'
import { prayerService } from '@/application/services/prayerService'

/**
 * Prayer times hook — manages prayer data fetching and countdown updates.
 * Consumes prayerService (application layer).
 */
export function usePrayerTimes() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null)
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch prayer times on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await prayerService.getPrayerTimes()
        setPrayerData(data)
        setError(null)
      } catch (err) {
        setError('Failed to load prayer times')
        console.error('Prayer times fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update countdown every second
  useEffect(() => {
    if (prayerData) {
      const updateCountdown = () => {
        const next = prayerService.calculateNextPrayer(prayerData)
        setNextPrayer(next)
      }

      updateCountdown()
      const interval = setInterval(updateCountdown, 1000)
      return () => clearInterval(interval)
    }
  }, [prayerData])

  return {
    prayerData,
    nextPrayer,
    loading,
    error,
  }
}
