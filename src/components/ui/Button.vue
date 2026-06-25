<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_24px_-12px_var(--ring)] hover:shadow-[0_16px_32px_-12px_var(--ring)] hover:brightness-105',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'text-muted-foreground hover:text-foreground hover:bg-accent',
        outline:
          'border border-border bg-background/60 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-brand-300 dark:hover:border-brand-700',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link:
          'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3.5 text-xs',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
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
