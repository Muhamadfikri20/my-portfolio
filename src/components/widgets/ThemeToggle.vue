<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    aria-label="Toggle dark mode"
    class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    @click="theme.toggleDarkMode()"
  >
    <Sun
      v-if="theme.isDark"
      class="w-5 h-5"
    />
    <Moon
      v-else
      class="w-5 h-5"
    />
  </button>
</template>
