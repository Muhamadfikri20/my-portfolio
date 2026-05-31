<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    aria-label="Toggle dark mode"
    class="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
    @click="theme.toggleDarkMode()"
  >
    <Sun
      v-if="theme.isDark"
      class="w-4 h-4"
    />
    <Moon
      v-else
      class="w-4 h-4"
    />
  </button>
</template>
