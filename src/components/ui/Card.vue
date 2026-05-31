<script setup>
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps({
  hoverable: { type: Boolean, default: false },
  padded: { type: Boolean, default: true },
})

const className = computed(() =>
  cn([
    'rounded-lg border theme-border theme-surface',
    props.padded && 'p-6',
    props.hoverable && 'hover:shadow-md transition-shadow duration-200',
  ]),
)
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>
