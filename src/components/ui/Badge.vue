<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-muted text-muted-foreground border-transparent',
        primary:
          'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800',
        secondary:
          'bg-secondary text-secondary-foreground border-transparent',
        success:
          'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
        warning:
          'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
        error:
          'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
        outline:
          'border-border text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const props = defineProps({
  variant: { type: String, default: 'default' },
})

const className = computed(() => cn(badgeVariants({ variant: props.variant })))
</script>

<template>
  <span :class="className">
    <slot />
  </span>
</template>
