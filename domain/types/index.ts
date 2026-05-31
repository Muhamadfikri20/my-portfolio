// Re-export all domain models
export type { User, AuthContextType } from '../models/User'
export type {
  ThemeTemplate,
  ThemeColors,
  ThemeConfig,
  ThemeContextType,
} from '../models/Theme'
export type {
  PrayerTimes,
  PrayerDataItem,
  PrayerData,
  NextPrayer,
  PrayerNameInfo,
} from '../models/Prayer'
export { PRAYER_NAMES } from '../models/Prayer'
export type { Language, LanguageInfo } from '../constants/languages'
export {
  SUPPORTED_LANGUAGES,
  RTL_LANGUAGES,
  LANGUAGE_LIST,
  isRtlLanguage,
  getDirection,
} from '../constants/languages'

// Application-level types
export type SectionType = 'resume' | 'showcase' | 'knowledge'
