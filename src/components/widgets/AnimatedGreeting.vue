<script setup>
// Phase 4 stub — full implementation in Phase 5
import { computed } from 'vue'

const greetings = ['Hello', 'Halo', 'مرحبا', 'こんにちは', '안녕하세요', 'Bonjour']
const current = computed(() => greetings[Math.floor(Date.now() / 3000) % greetings.length])
</script>

<template>
  <span class="font-medium">{{ current }}</span>
</template>
