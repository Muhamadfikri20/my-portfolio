<script setup>
import { usePrayerTimes } from '@/composables/usePrayerTimes'

const { nextPrayer, countdown, loading, error } = usePrayerTimes()
</script>

<template>
  <div class="p-3 rounded-lg theme-surface border theme-border">
    <div
      v-if="loading"
      class="text-xs theme-text-secondary"
    >
      Loading prayer times…
    </div>
    <div
      v-else-if="error"
      class="text-xs theme-text-secondary"
    >
      Prayer widget disabled
    </div>
    <div v-else-if="nextPrayer">
      <div class="text-xs theme-text-secondary uppercase tracking-wide">
        Next prayer
      </div>
      <div class="text-base font-semibold theme-text mt-1 capitalize">
        {{ nextPrayer.name }}
      </div>
      <div class="text-xs theme-text-secondary">
        {{ nextPrayer.time }} · in {{ countdown }}
      </div>
    </div>
  </div>
</template>
