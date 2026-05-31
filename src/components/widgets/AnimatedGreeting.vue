<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const greetings = [
  { text: 'Hi', lang: 'English' },
  { text: 'Hello', lang: 'English' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' },
]

const currentIndex = ref(0)
const isVisible = ref(true)

let intervalTimer = null
let fadeTimer = null

onMounted(() => {
  intervalTimer = setInterval(() => {
    isVisible.value = false
    fadeTimer = setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % greetings.length
      isVisible.value = true
    }, 300)
  }, 2500)
})

onUnmounted(() => {
  if (intervalTimer) clearInterval(intervalTimer)
  if (fadeTimer) clearTimeout(fadeTimer)
})
</script>

<template>
  <span
    :class="[
      'inline-block transition-all duration-500 ease-in-out transform',
      isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 -translate-y-2 scale-95',
    ]"
  >
    {{ greetings[currentIndex].text }}
  </span>
</template>
