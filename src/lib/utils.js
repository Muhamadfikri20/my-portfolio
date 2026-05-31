import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind class merger — combine clsx conditional logic with
 * tailwind-merge for conflict resolution.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
