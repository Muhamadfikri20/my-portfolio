<script setup>
import { ref } from 'vue'
import {
  Calendar, MapPin, Award, Code, Server, Database, Cloud,
  Users, Briefcase, GraduationCap,
} from 'lucide-vue-next'
import { useTranslations } from '@/composables/useTranslations'
import { skills } from '@/data/skills'
import AnimatedGreeting from '@/components/widgets/AnimatedGreeting.vue'
import EditableText from '@/components/widgets/EditableText.vue'
import Card from '@/components/ui/Card.vue'

const { t } = useTranslations()

// Editable content (admin in-memory only, hydrated from i18n)
const introduction = ref(t('resume.introduction'))
const description = ref(t('resume.description'))
const location = ref(t('resume.location'))
const experience = ref(t('resume.experience'))
const expertise = ref(t('resume.expertise'))

const experiences = ref(t('resume.experiences', { returnObjects: true }) || [])
const education = ref(t('resume.education', { returnObjects: true }) || [])
const certifications = ref(t('resume.certifications', { returnObjects: true }) || [])
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
        <!-- Profile photo (mobile only) -->
        <div class="flex-shrink-0 mx-auto lg:hidden">
          <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-lg">
            <img
              src="/assets/icons/general/profile.png"
              alt="Rheyno Apria Pratama"
              class="w-full h-full object-cover"
            >
          </div>
        </div>

        <div class="flex-1 text-center lg:text-left">
          <div class="mb-4">
            <h1 class="text-3xl lg:text-4xl font-bold theme-text mb-1">
              <AnimatedGreeting /> 👋
            </h1>
            <h2 class="text-3xl lg:text-3xl font-semibold theme-text">
              <EditableText v-model="introduction">
                {{ introduction }}
              </EditableText>
            </h2>
          </div>
          <p class="text-sm lg:text-xl theme-text-secondary mb-6 leading-relaxed">
            <EditableText
              v-model="description"
              multiline
            >
              {{ description }}
            </EditableText>
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6 text-sm theme-text-secondary">
            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4" />
              <EditableText v-model="location">
                {{ location }}
              </EditableText>
            </div>
            <div class="flex items-center gap-2">
              <Briefcase class="w-4 h-4" />
              <EditableText v-model="experience">
                {{ experience }}
              </EditableText>
            </div>
            <div class="flex items-center gap-2">
              <Code class="w-4 h-4" />
              <EditableText v-model="expertise">
                {{ expertise }}
              </EditableText>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Main column -->
      <div class="xl:col-span-2 space-y-8">
        <!-- Experience -->
        <section>
          <h2 class="text-2xl font-bold theme-text mb-6 flex items-center gap-3">
            <Briefcase class="w-6 h-6 theme-primary" />
            {{ t('resume.sections.experience') }}
          </h2>
          <div class="space-y-6">
            <Card
              v-for="(exp, i) in experiences"
              :key="i"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div class="mb-2 lg:mb-0">
                  <h3 class="text-lg font-semibold theme-text">
                    {{ exp.title }}
                  </h3>
                  <p class="theme-primary font-medium">
                    {{ exp.company }}
                  </p>
                </div>
                <div class="text-left lg:text-right text-sm theme-text-secondary">
                  <div class="flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    {{ exp.period }}
                  </div>
                  <div class="flex items-center gap-1 mt-1">
                    <MapPin class="w-4 h-4" />
                    {{ exp.location }}
                  </div>
                </div>
              </div>
              <p class="theme-text-secondary mb-4">
                {{ exp.description }}
              </p>
              <div class="space-y-2">
                <h4 class="font-medium theme-text">
                  {{ t('resume.achievements') }}
                </h4>
                <ul class="list-disc list-inside space-y-1 text-sm theme-text-secondary">
                  <li
                    v-for="(a, ai) in exp.achievements"
                    :key="ai"
                  >
                    {{ a }}
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-2xl font-bold theme-text mb-6 flex items-center gap-3">
            <GraduationCap class="w-6 h-6 theme-primary" />
            {{ t('resume.sections.education') }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="(edu, i) in education"
              :key="i"
              class="relative"
            >
              <div
                v-if="i !== education.length - 1"
                class="absolute left-6 top-12 w-0.5 h-16 bg-neutral-200 dark:bg-neutral-700"
              />
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 theme-surface rounded-full flex items-center justify-center">
                  <GraduationCap class="w-6 h-6 theme-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <Card
                    :padded="false"
                    class="p-4 shadow-sm"
                  >
                    <h3 class="text-lg font-semibold theme-text mb-1">
                      {{ edu.degree }}
                    </h3>
                    <p class="theme-primary font-medium mb-3">
                      {{ edu.institution }}
                    </p>
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm theme-text-secondary">
                      <div class="flex items-center gap-2">
                        <Calendar class="w-4 h-4" />
                        <span>{{ edu.period }}</span>
                      </div>
                      <div
                        v-if="edu.gpa !== '-'"
                        class="flex items-center gap-2"
                      >
                        <Award class="w-4 h-4" />
                        <span>GPA: {{ edu.gpa }}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <!-- Skills -->
        <section>
          <h2 class="text-xl font-bold theme-text mb-6 flex items-center gap-2">
            <Code class="w-5 h-5 theme-primary" />
            {{ t('resume.sections.skills') }}
          </h2>
          <div class="space-y-6">
            <Card>
              <h3 class="font-semibold theme-text mb-4 flex items-center gap-2">
                <Server class="w-4 h-4" />
                {{ t('resume.skills.backend') }}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="skill in skills.backend"
                  :key="skill.name"
                  class="flex items-center gap-3 p-3 theme-bg rounded-lg hover:opacity-80 transition-opacity"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6 flex-shrink-0"
                  >
                  <span class="text-sm font-medium theme-text-secondary">{{ skill.name }}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 class="font-semibold theme-text mb-4 flex items-center gap-2">
                <Cloud class="w-4 h-4" />
                {{ t('resume.skills.infrastructure') }}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="skill in skills.infrastructure"
                  :key="skill.name"
                  class="flex items-center gap-3 p-3 theme-bg rounded-lg hover:opacity-80 transition-opacity"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6 flex-shrink-0"
                  >
                  <span class="text-sm font-medium theme-text-secondary">{{ skill.name }}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 class="font-semibold theme-text mb-4 flex items-center gap-2">
                <Database class="w-4 h-4" />
                {{ t('resume.skills.databases') }}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="skill in skills.databases"
                  :key="skill.name"
                  class="flex items-center gap-3 p-3 theme-bg rounded-lg hover:opacity-80 transition-opacity"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6 flex-shrink-0"
                  >
                  <span class="text-sm font-medium theme-text-secondary">{{ skill.name }}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 class="font-semibold theme-text mb-4 flex items-center gap-2">
                <Users class="w-4 h-4" />
                {{ t('resume.skills.tools') }}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="skill in skills.tools"
                  :key="skill.name"
                  class="flex items-center gap-3 p-3 theme-bg rounded-lg hover:opacity-80 transition-opacity"
                >
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6 flex-shrink-0"
                  >
                  <span class="text-sm font-medium theme-text-secondary">{{ skill.name }}</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <!-- Certifications -->
        <section>
          <h2 class="text-xl font-bold theme-text mb-6 flex items-center gap-2">
            <Award class="w-5 h-5 theme-primary" />
            {{ t('resume.sections.certifications') }}
          </h2>
          <Card>
            <div class="space-y-3">
              <div
                v-for="(cert, i) in certifications"
                :key="i"
                class="flex items-center gap-3 p-3 theme-bg rounded-lg"
              >
                <Award class="w-4 h-4 theme-primary flex-shrink-0" />
                <span class="text-sm theme-text-secondary">{{ cert }}</span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  </div>
</template>
