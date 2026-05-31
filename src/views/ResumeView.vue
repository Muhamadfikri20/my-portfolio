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
    <div class="mb-8">
      <div class="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
        <div class="flex-shrink-0 mx-auto lg:hidden">
          <div class="w-32 h-32 rounded-2xl overflow-hidden border-4 border-card shadow-soft">
            <img
              src="/assets/icons/general/profile.png"
              alt="Rheyno Apria Pratama"
              class="w-full h-full object-cover"
            >
          </div>
        </div>

        <div class="flex-1 text-center lg:text-left">
          <div class="mb-4">
            <h1 class="text-3xl lg:text-4xl font-bold text-foreground mb-1 tracking-tight">
              <AnimatedGreeting /> 👋
            </h1>
            <h2 class="text-2xl lg:text-3xl font-semibold text-foreground/90 tracking-tight">
              <EditableText v-model="introduction">
                {{ introduction }}
              </EditableText>
            </h2>
          </div>
          <p class="text-sm lg:text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl">
            <EditableText
              v-model="description"
              multiline
            >
              {{ description }}
            </EditableText>
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-5 text-sm text-muted-foreground">
            <div class="inline-flex items-center gap-1.5">
              <MapPin class="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <EditableText v-model="location">
                {{ location }}
              </EditableText>
            </div>
            <div class="inline-flex items-center gap-1.5">
              <Briefcase class="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <EditableText v-model="experience">
                {{ experience }}
              </EditableText>
            </div>
            <div class="inline-flex items-center gap-1.5">
              <Code class="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <EditableText v-model="expertise">
                {{ expertise }}
              </EditableText>
            </div>
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
        <section>
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
        <section>
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
