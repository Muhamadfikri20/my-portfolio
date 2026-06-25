<script setup>
import { Toaster } from 'vue-sonner'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <router-view />
  <Toaster
    :theme="isDark ? 'dark' : 'light'"
    position="bottom-right"
    rich-colors
    close-button
  />
</template>
