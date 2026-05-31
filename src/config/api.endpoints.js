/**
 * External API endpoints + config.
 */

export const RAPIDAPI = {
  KEY: import.meta.env.VITE_RAPIDAPI_KEY || '',
  HOST: 'muslimsalat.p.rapidapi.com',
  PRAYER_ENDPOINT: 'https://muslimsalat.p.rapidapi.com/Jakarta.json',
  CACHE_TTL_MS: 10 * 60 * 1000, // 10 minutes
}
