<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'theme-surface theme-text-secondary',
        primary: 'theme-primary-bg text-white',
        success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        outline: 'border theme-border theme-text-secondary',
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
