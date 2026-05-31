<script setup>
// Phase 4 stub — full implementation in Phase 5
import { useThemeStore } from '@/stores/theme'
import { THEME_LABELS, VALID_THEMES } from '@/config/constants'

const theme = useThemeStore()
</script>

<template>
  <select
    :value="theme.currentTheme"
    aria-label="Theme"
    class="text-sm border theme-border rounded-md px-2 py-1 bg-transparent"
    @change="theme.setTheme($event.target.value)"
  >
    <option
      v-for="code in VALID_THEMES"
      :key="code"
      :value="code"
    >
      {{ THEME_LABELS[code] }}
    </option>
  </select>
</template>
