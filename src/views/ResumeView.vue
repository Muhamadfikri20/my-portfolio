<script setup>
// Phase 4 stub — full content in Phase 6
import { useTranslations } from '@/composables/useTranslations'

const { t } = useTranslations()
</script>

<template>
  <section class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold theme-text mb-2">
      {{ t('header.resume.title') }}
    </h1>
    <p class="theme-text-secondary mb-6">
      {{ t('header.resume.subtitle') }}
    </p>
    <div class="p-6 rounded-lg theme-surface border theme-border">
      <p class="theme-text-secondary text-sm">
        Phase 4 layout scaffold — full resume content (experience, skills, education)
        akan diisi di Phase 6.
      </p>
    </div>
  </section>
</template>
