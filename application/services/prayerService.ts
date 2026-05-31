import type { PrayerData, NextPrayer, PrayerTimes } from '@/domain/models/Prayer'
import { PRAYER_NAMES } from '@/domain/models/Prayer'
import { fetchPrayerTimes } from '@/infrastructure/api/prayerTimesApi'

/**
 * Prayer service — handles prayer time data fetching and countdown calculation.
 * Does not depend on React.
 */
export const prayerService = {
  async getPrayerTimes(): Promise<PrayerData> {
    return fetchPrayerTimes()
  },

  /**
   * Calculate the next upcoming prayer and countdown string.
   */
  calculateNextPrayer(prayerData: PrayerData): NextPrayer | null {
    if (!prayerData.items || prayerData.items.length === 0) return null

    const today = prayerData.items[0]
    const now = new Date()

    // Get current time in Jakarta timezone (UTC+7)
    const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))

    const prayerTimes = PRAYER_NAMES.map((prayer) => {
      const timeStr = today[prayer.key as keyof PrayerTimes]
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
        date: prayerDate,
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
        ...PRAYER_NAMES[0],
        time: today.fajr,
        date: fajrTomorrow,
      }
    }

    if (nextPrayerInfo) {
      const timeDiff = nextPrayerInfo.date.getTime() - jakartaTime.getTime()
      const hrs = Math.floor(timeDiff / (1000 * 60 * 60))
      const mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const secs = Math.floor((timeDiff % (1000 * 60)) / 1000)

      let countdown = ''
      if (hrs > 0) {
        countdown = `${hrs}h ${mins}m ${secs}s`
      } else if (mins > 0) {
        countdown = `${mins}m ${secs}s`
      } else {
        countdown = `${secs}s`
      }

      return {
        name: nextPrayerInfo.display,
        time: nextPrayerInfo.time,
        countdown,
      }
    }

    return null
  },
}
