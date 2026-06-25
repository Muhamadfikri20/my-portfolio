<script setup>
import { ref, computed } from 'vue'
import {
  ExternalLink, Github, Star, Calendar, Tag, Eye,
} from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { projectStats } from '@/data/projects'
import { useContentStore } from '@/stores/content'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

const content = useContentStore()
const { projects, projectCategories } = storeToRefs(content)

const activeCategory = ref('All')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects.value
  return projects.value.filter((p) => p.category === activeCategory.value)
})

function statusVariant(status) {
  if (status === 'Production') return 'success'
  if (status === 'Open Source') return 'primary'
  return 'warning'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      v-reveal
      class="text-center mb-8"
    >
      <h1 class="text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
        <span class="gradient-text">Project Showcase</span>
      </h1>
      <p class="text-base text-muted-foreground max-w-2xl mx-auto">
        A collection of backend systems, infrastructure projects, and technical solutions I've built
      </p>
    </div>

    <!-- Filter tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="cat in projectCategories"
        :key="cat"
        type="button"
        :class="[
          'px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all',
          activeCategory === cat
            ? 'text-white bg-gradient-to-br from-brand-500 to-brand-700 border-transparent shadow-[0_8px_20px_-10px_var(--ring)]'
            : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent hover:border-brand-300 dark:hover:border-brand-700',
        ]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <Card
        v-for="(stat, i) in projectStats"
        :key="stat.label"
        v-reveal:zoom="i * 70"
        class="text-center"
      >
        <div class="text-3xl font-extrabold gradient-text mb-1">
          {{ stat.value }}
        </div>
        <div class="text-xs text-muted-foreground">
          {{ stat.label }}
        </div>
      </Card>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <Card
        v-for="(project, i) in filteredProjects"
        :key="project.id"
        v-reveal="i * 70"
        hoverable
        class="group flex flex-col ring-gradient"
      >
        <!-- Preview -->
        <div class="relative w-full h-40 rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-brand-500/90 via-brand-600/80 to-purple-600/70 flex items-center justify-center">
          <div class="absolute inset-0 opacity-30 mix-blend-overlay" style="background-image: radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 35%);" />
          <span class="relative text-5xl font-black text-white/90 drop-shadow-sm select-none">
            {{ project.title.charAt(0) }}
          </span>
          <span class="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[10px] font-medium text-white/80 bg-black/20 rounded-full px-2 py-0.5 backdrop-blur-sm">
            <Eye class="w-3 h-3" /> {{ project.year }}
          </span>
        </div>

        <!-- Header -->
        <div class="mb-3">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
            <h3 class="text-base font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {{ project.title }}
            </h3>
            <Badge
              :variant="statusVariant(project.status)"
              class="self-start shrink-0"
            >
              {{ project.status }}
            </Badge>
          </div>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <div class="inline-flex items-center gap-1">
              <Tag class="w-3 h-3" />
              {{ project.category }}
            </div>
            <div class="inline-flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              {{ project.year }}
            </div>
          </div>
        </div>

        <p class="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
          {{ project.description }}
        </p>

        <!-- Highlights -->
        <div class="mb-3">
          <h4 class="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-1.5">
            Highlights
          </h4>
          <ul class="space-y-0.5">
            <li
              v-for="(h, i) in project.highlights"
              :key="i"
              class="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Star class="w-3 h-3 text-brand-500 dark:text-brand-400 flex-shrink-0" />
              {{ h }}
            </li>
          </ul>
        </div>

        <!-- Technologies -->
        <div class="mb-3 flex flex-wrap gap-1">
          <Badge
            v-for="tech in project.technologies"
            :key="tech"
            variant="outline"
          >
            {{ tech }}
          </Badge>
        </div>

        <!-- Action links -->
        <div class="flex items-center gap-2 pt-3 border-t border-border">
          <Button
            v-if="project.links.github"
            :as="'a'"
            variant="ghost"
            size="sm"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github class="w-3.5 h-3.5" />
            Code
          </Button>
          <Button
            v-if="project.links.live"
            :as="'a'"
            variant="primary"
            size="sm"
            :href="project.links.live"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink class="w-3.5 h-3.5" />
            Live Demo
          </Button>
        </div>
      </Card>
    </div>

    <div class="text-center mt-8">
      <Button variant="secondary">
        Load More Projects
      </Button>
    </div>
  </div>
</template>
