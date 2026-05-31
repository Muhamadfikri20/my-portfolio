export interface PrayerTimes {
  fajr: string
  shurooq: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export interface PrayerDataItem extends PrayerTimes {
  date_for: string
}

export interface PrayerData {
  items: PrayerDataItem[]
  state: string
  country: string
}

export interface NextPrayer {
  name: string
  time: string
  countdown: string
}

export interface PrayerNameInfo {
  key: keyof PrayerTimes
  name: string
  display: string
}

export const PRAYER_NAMES: PrayerNameInfo[] = [
  { key: 'fajr', name: 'Fajr', display: 'Fajr' },
  { key: 'shurooq', name: 'Sunrise', display: 'Shurooq' },
  { key: 'dhuhr', name: 'Dhuhr', display: 'Dhuhur' },
  { key: 'asr', name: 'Asr', display: 'Ashar' },
  { key: 'maghrib', name: 'Maghrib', display: 'Maghrib' },
  { key: 'isha', name: 'Isha', display: 'Isha' },
]
