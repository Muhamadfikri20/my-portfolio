<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'theme-primary-bg text-white hover:opacity-90',
        secondary:
          'theme-surface theme-text hover:opacity-80',
        ghost:
          'theme-text-secondary hover:theme-text hover:bg-neutral-100 dark:hover:bg-neutral-800',
        outline:
          'border theme-border theme-text hover:theme-surface',
        destructive:
          'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2',
        lg: 'px-4 py-2.5 text-base',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  as: { type: String, default: 'button' },
})

const className = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size })),
)
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
    :class="className"
  >
    <slot />
  </component>
</template>
