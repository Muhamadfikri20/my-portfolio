<script setup>
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps({
  hoverable: { type: Boolean, default: false },
  padded: { type: Boolean, default: true },
  flat: { type: Boolean, default: false },
})

const className = computed(() =>
  cn([
    'bg-card text-card-foreground rounded-xl border border-border',
    props.flat ? '' : 'shadow-sm',
    props.padded && 'p-6',
    props.hoverable && 'card-hover',
  ]),
)
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>
