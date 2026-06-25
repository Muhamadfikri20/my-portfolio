<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import {
  Calendar, MapPin, Award, Code, Server, Database, Cloud,
  Users, Briefcase, GraduationCap,
} from 'lucide-vue-next'
import { useTranslations } from '@/composables/useTranslations'
import { useContentStore } from '@/stores/content'
import AnimatedGreeting from '@/components/widgets/AnimatedGreeting.vue'
import Card from '@/components/ui/Card.vue'

const { t } = useTranslations()
const content = useContentStore()
const { profile, skillsByCategory: skills } = storeToRefs(content)

// Prefer admin-edited Supabase profile; fall back to i18n when none exists
// (keeps multilingual defaults working before the CMS is populated).
const introduction = computed(() => profile.value?.introduction || t('resume.introduction'))
const description = computed(() => profile.value?.description || t('resume.description'))
const location = computed(() => profile.value?.location || t('resume.location'))
const experience = computed(() => profile.value?.experience || t('resume.experience'))
const expertise = computed(() => profile.value?.expertise || t('resume.expertise'))

const experiences = computed(() =>
  profile.value?.experiences?.length ? profile.value.experiences : (t('resume.experiences', { returnObjects: true }) || []))
const education = computed(() =>
  profile.value?.education?.length ? profile.value.education : (t('resume.education', { returnObjects: true }) || []))
const certifications = computed(() =>
  profile.value?.certifications?.length ? profile.value.certifications : (t('resume.certifications', { returnObjects: true }) || []))
</script>

<template>
  <div class="space-y-8">
    <!-- Hero header -->
    <div
      v-reveal:zoom
      class="hero-aurora rounded-3xl border border-border/60 shadow-glow p-6 sm:p-8 lg:p-10 mb-8"
    >
      <div class="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
        <div class="flex-shrink-0 mx-auto lg:mx-0">
          <div class="relative">
            <div class="absolute -inset-1.5 rounded-[1.75rem] bg-gradient-to-br from-brand-400/50 to-purple-400/40 blur-md" />
            <div class="relative w-28 h-28 lg:w-36 lg:h-36 rounded-3xl overflow-hidden border-4 border-card shadow-soft-md">
              <img
                src="/assets/icons/general/profile.png"
                alt="Rheyno Apria Pratama"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>

        <div class="flex-1 text-center lg:text-left">
          <div class="mb-4">
            <h1 class="text-3xl lg:text-5xl font-extrabold mb-2 tracking-tight">
              <span class="gradient-text"><AnimatedGreeting /></span> 👋
            </h1>
            <h2 class="text-2xl lg:text-3xl font-semibold text-foreground/90 tracking-tight">
              {{ introduction }}
            </h2>
          </div>
          <p class="text-sm lg:text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 lg:gap-3 text-sm">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-muted-foreground">
              <MapPin class="w-4 h-4 text-brand-600 dark:text-brand-400" />
              {{ location }}
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-muted-foreground">
              <Briefcase class="w-4 h-4 text-brand-600 dark:text-brand-400" />
              {{ experience }}
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-muted-foreground">
              <Code class="w-4 h-4 text-brand-600 dark:text-brand-400" />
              {{ expertise }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Main column -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Experience -->
        <section>
          <h2 class="text-xl font-bold text-foreground mb-4 inline-flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 inline-flex items-center justify-center">
              <Briefcase class="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </span>
            {{ t('resume.sections.experience') }}
          </h2>
          <div class="space-y-4">
            <Card
              v-for="(exp, i) in experiences"
              :key="i"
              v-reveal="i * 90"
              hoverable
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                <div class="mb-2 lg:mb-0">
                  <h3 class="text-base font-semibold text-foreground">
                    {{ exp.title }}
                  </h3>
                  <p class="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {{ exp.company }}
                  </p>
                </div>
                <div class="text-left lg:text-right text-xs text-muted-foreground space-y-0.5">
                  <div class="inline-flex items-center gap-1.5">
                    <Calendar class="w-3.5 h-3.5" />
                    {{ exp.period }}
                  </div>
                  <div class="lg:block inline-flex items-center gap-1.5 ml-3 lg:ml-0">
                    <MapPin class="w-3.5 h-3.5" />
                    {{ exp.location }}
                  </div>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3 leading-relaxed">
                {{ exp.description }}
              </p>
              <div class="space-y-1.5">
                <h4 class="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {{ t('resume.achievements') }}
                </h4>
                <ul class="space-y-1 text-sm text-muted-foreground">
                  <li
                    v-for="(a, ai) in exp.achievements"
                    :key="ai"
                    class="flex gap-2"
                  >
                    <span class="text-brand-600 dark:text-brand-400 shrink-0">•</span>
                    <span>{{ a }}</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-xl font-bold text-foreground mb-4 inline-flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 inline-flex items-center justify-center">
              <GraduationCap class="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </span>
            {{ t('resume.sections.education') }}
          </h2>
          <div class="space-y-4">
            <Card
              v-for="(edu, i) in education"
              :key="i"
              v-reveal="i * 90"
              hoverable
            >
              <h3 class="text-base font-semibold text-foreground mb-1">
                {{ edu.degree }}
              </h3>
              <p class="text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">
                {{ edu.institution }}
              </p>
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-muted-foreground">
                <div class="inline-flex items-center gap-1.5">
                  <Calendar class="w-3.5 h-3.5" />
                  <span>{{ edu.period }}</span>
                </div>
                <div
                  v-if="edu.gpa !== '-'"
                  class="inline-flex items-center gap-1.5"
                >
                  <Award class="w-3.5 h-3.5" />
                  <span>GPA: {{ edu.gpa }}</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Skills -->
        <section v-reveal:right="60">
          <h2 class="text-lg font-bold text-foreground mb-3 inline-flex items-center gap-2">
            <Code class="w-4 h-4 text-brand-600 dark:text-brand-400" />
            {{ t('resume.sections.skills') }}
          </h2>
          <div class="space-y-3">
            <Card>
              <h3 class="text-sm font-semibold text-foreground mb-3 inline-flex items-center gap-1.5">
                <Server class="w-3.5 h-3.5" />
                {{ t('resume.skills.backend') }}
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="skill in skills.backend"
                  :key="skill.name"
                  class="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-5 h-5 flex-shrink-0"
                  >
                  <span class="text-xs font-medium text-muted-foreground">{{ skill.name }}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 class="text-sm font-semibold text-foreground mb-3 inline-flex items-center gap-1.5">
                <Cloud class="w-3.5 h-3.5" />
                {{ t('resume.skills.infrastructure') }}
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="skill in skills.infrastructure"
                  :key="skill.name"
                  class="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-5 h-5 flex-shrink-0"
                  >
                  <span class="text-xs font-medium text-muted-foreground">{{ skill.name }}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 class="text-sm font-semibold text-foreground mb-3 inline-flex items-center gap-1.5">
                <Database class="w-3.5 h-3.5" />
                {{ t('resume.skills.databases') }}
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="skill in skills.databases"
                  :key="skill.name"
                  class="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-5 h-5 flex-shrink-0"
                  >
                  <span class="text-xs font-medium text-muted-foreground">{{ skill.name }}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 class="text-sm font-semibold text-foreground mb-3 inline-flex items-center gap-1.5">
                <Users class="w-3.5 h-3.5" />
                {{ t('resume.skills.tools') }}
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="skill in skills.tools"
                  :key="skill.name"
                  class="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-5 h-5 flex-shrink-0"
                  >
                  <span class="text-xs font-medium text-muted-foreground">{{ skill.name }}</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <!-- Certifications -->
        <section v-reveal:right="140">
          <h2 class="text-lg font-bold text-foreground mb-3 inline-flex items-center gap-2">
            <Award class="w-4 h-4 text-brand-600 dark:text-brand-400" />
            {{ t('resume.sections.certifications') }}
          </h2>
          <Card>
            <div class="space-y-2">
              <div
                v-for="(cert, i) in certifications"
                :key="i"
                class="flex items-center gap-2 p-2 rounded-md bg-muted/50"
              >
                <Award class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span class="text-xs text-muted-foreground">{{ cert }}</span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  </div>
</template>
