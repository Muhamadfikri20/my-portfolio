<script setup>
import { ref, computed } from 'vue'
import {
  ExternalLink, Github, Star, Calendar, Tag, Eye,
} from 'lucide-vue-next'
import { projects, projectCategories, projectStats } from '@/data/projects'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

const activeCategory = ref('All')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects
  return projects.filter((p) => p.category === activeCategory.value)
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
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-foreground mb-3 tracking-tight">
        Project Showcase
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
          'px-3 py-1.5 text-xs font-medium rounded-md border transition-colors',
          activeCategory === cat
            ? 'bg-primary text-primary-foreground border-transparent shadow-sm'
            : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent',
        ]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <Card
        v-for="stat in projectStats"
        :key="stat.label"
        class="text-center"
      >
        <div class="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
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
        v-for="project in filteredProjects"
        :key="project.id"
        hoverable
        class="group flex flex-col"
      >
        <!-- Preview placeholder -->
        <div class="w-full h-40 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/40 dark:to-brand-800/20 rounded-lg mb-4 flex items-center justify-center">
          <div class="text-brand-400 dark:text-brand-500 text-center">
            <Eye class="w-6 h-6 mx-auto mb-1.5" />
            <span class="text-xs font-medium">Preview</span>
          </div>
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
