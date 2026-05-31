/**
 * Generic localStorage adapter.
 * Centralizes all localStorage access for easier testing and replacement.
 */
export const localStorageAdapter = {
  get<T = string>(key: string): T | null {
    if (typeof window === 'undefined') return null

    try {
      const value = localStorage.getItem(key)
      if (value === null) return null

      // Try to parse JSON, fall back to raw string
      try {
        return JSON.parse(value) as T
      } catch {
        return value as unknown as T
      }
    } catch {
      return null
    }
  },

  set<T = string>(key: string, value: T): void {
    if (typeof window === 'undefined') return

    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch {
      console.error(`Failed to save to localStorage: ${key}`)
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(key)
    } catch {
      console.error(`Failed to remove from localStorage: ${key}`)
    }
  },
}
