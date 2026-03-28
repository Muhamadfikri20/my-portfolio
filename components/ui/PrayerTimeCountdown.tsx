'use client'

import { useState, useEffect } from 'react'
import { Clock, MapPin } from 'lucide-react'

interface PrayerTimes {
  fajr: string
  shurooq: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

interface PrayerData {
  items: Array<{
    date_for: string
    fajr: string
    shurooq: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }>
  state: string
  country: string
}

interface NextPrayer {
  name: string
  time: string
  countdown: string
}

export default function PrayerTimeCountdown() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null)
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const prayerNames = [
    { key: 'fajr', name: 'Fajr', display: 'Fajr' },
    { key: 'shurooq', name: 'Sunrise', display: 'Shurooq' },
    { key: 'dhuhr', name: 'Dhuhr', display: 'Dhuhur' },
    { key: 'asr', name: 'Asr', display: 'Ashar' },
    { key: 'maghrib', name: 'Maghrib', display: 'Maghrib' },
    { key: 'isha', name: 'Isha', display: 'Isha' }
  ]

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch('/api/prayer-times')
      if (!response.ok) {
        throw new Error('Failed to fetch prayer times')
      }
      const data = await response.json()
      setPrayerData(data)
      setError(null)
    } catch (err) {
      setError('Failed to load prayer times')
      console.error('Prayer times fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateNextPrayer = () => {
    if (!prayerData || !prayerData.items || prayerData.items.length === 0) return

    const today = prayerData.items[0]
    const now = new Date()
    
    // Get current time in Jakarta timezone (UTC+7)
    const jakartaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}))
    
    const prayerTimes = prayerNames.map(prayer => {
      const timeStr = today[prayer.key as keyof typeof today]
      const [time, period] = timeStr.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      
      let hour24 = hours
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hour24 += 12
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hour24 = 0
      }
      
      const prayerDate = new Date(jakartaTime)
      prayerDate.setHours(hour24, minutes, 0, 0)
      
      return {
        ...prayer,
        time: timeStr,
        date: prayerDate
      }
    })

    // Find next prayer
    let nextPrayerInfo = null
    for (const prayer of prayerTimes) {
      if (prayer.date > jakartaTime) {
        nextPrayerInfo = prayer
        break
      }
    }

    // If no prayer found for today, use Fajr of next day
    if (!nextPrayerInfo) {
      const fajrTomorrow = new Date(jakartaTime)
      fajrTomorrow.setDate(fajrTomorrow.getDate() + 1)
      const [time, period] = today.fajr.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      let hour24 = hours
      if (period.toLowerCase() === 'am' && hours === 12) {
        hour24 = 0
      }
      fajrTomorrow.setHours(hour24, minutes, 0, 0)
      
      nextPrayerInfo = {
        ...prayerNames[0],
        time: today.fajr,
        date: fajrTomorrow
      }
    }

    if (nextPrayerInfo) {
      const timeDiff = nextPrayerInfo.date.getTime() - jakartaTime.getTime()
      const hours = Math.floor(timeDiff / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      let countdown = ''
      if (hours > 0) {
        countdown = `${hours}h ${minutes}m ${seconds}s`
      } else if (minutes > 0) {
        countdown = `${minutes}m ${seconds}s`
      } else {
        countdown = `${seconds}s`
      }

      setNextPrayer({
        name: nextPrayerInfo.display,
        time: nextPrayerInfo.time,
        countdown
      })
    }
  }

  useEffect(() => {
    fetchPrayerTimes()
  }, [])

  useEffect(() => {
    if (prayerData) {
      calculateNextPrayer()
      const interval = setInterval(calculateNextPrayer, 1000)
      return () => clearInterval(interval)
    }
  }, [prayerData])

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Prayer Times</span>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400">Prayer Times</span>
        </div>
        <div className="text-xs text-red-500 dark:text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3">
      {nextPrayer ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5" />
              <span className="text-base font-semibold text-primary-600 dark:text-primary-400">
                {nextPrayer.name}
              </span>
            </div>
            {prayerData && (
              <div className="flex items-center gap-1 text-right">
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
                  {prayerData.state},<br/>{prayerData.country}
                </span>
              </div>
            )}
          </div>
          <div className="text-center pt-1">
            <div className="text-2xl font-mono font-bold text-neutral-900 dark:text-neutral-100 tracking-wider">
              {nextPrayer.countdown}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              until next prayer
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Loading...</span>
        </div>
      )}
    </div>
  )
} 