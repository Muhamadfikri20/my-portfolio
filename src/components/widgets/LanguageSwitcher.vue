<script setup>
// Phase 4 stub — full implementation in Phase 5
import { useLanguageStore } from '@/stores/language'
import { LANGUAGE_LABELS, VALID_LANGUAGES } from '@/config/constants'

const lang = useLanguageStore()
</script>

<template>
  <select
    :value="lang.language"
    aria-label="Language"
    class="text-sm border theme-border rounded-md px-2 py-1 bg-transparent"
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
