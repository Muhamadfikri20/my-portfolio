<script setup>
import { usePrayerTimes } from '@/composables/usePrayerTimes'

const { nextPrayer, countdown, loading, error } = usePrayerTimes()
</script>

<template>
  <div class="p-3 rounded-xl bg-brand-50/50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/40">
    <div
      v-if="loading"
      class="text-xs text-muted-foreground"
    >
      Loading prayer times…
    </div>
    <div
      v-else-if="error"
      class="text-xs text-muted-foreground"
    >
      Prayer widget disabled
    </div>
    <div v-else-if="nextPrayer">
      <div class="text-[10px] text-brand-600 dark:text-brand-400 uppercase tracking-wider font-semibold">
        Next prayer
      </div>
      <div class="text-base font-semibold text-foreground mt-0.5 capitalize">
        {{ nextPrayer.name }}
      </div>
      <div class="text-xs text-muted-foreground">
        {{ nextPrayer.time }} · in {{ countdown }}
      </div>
    </div>
  </div>
</template>
