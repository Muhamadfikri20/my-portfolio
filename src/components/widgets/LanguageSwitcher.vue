<script setup>
import { useLanguageStore } from '@/stores/language'
import { LANGUAGE_LABELS, VALID_LANGUAGES } from '@/config/constants'

const lang = useLanguageStore()
</script>

<template>
  <select
    :value="lang.language"
    aria-label="Language"
    class="h-9 px-2 text-xs font-medium border border-border rounded-md bg-background text-foreground hover:bg-accent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    @change="lang.setLanguage($event.target.value)"
  >
    <option
      v-for="code in VALID_LANGUAGES"
      :key="code"
      :value="code"
    >
      {{ LANGUAGE_LABELS[code] }}
    </option>
  </select>
</template>
