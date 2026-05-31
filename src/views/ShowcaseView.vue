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
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold theme-text mb-4">
        Project Showcase
      </h1>
      <p class="text-lg theme-text-secondary mb-6">
        A collection of backend systems, infrastructure projects, and technical solutions I've built
      </p>
    </div>

    <!-- Filter tabs -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="cat in projectCategories"
        :key="cat"
        type="button"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200',
          activeCategory === cat
            ? 'theme-primary-bg text-white border-transparent'
            : 'theme-border theme-text-secondary hover:theme-primary',
        ]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
      <Card
        v-for="stat in projectStats"
        :key="stat.label"
        class="text-center"
      >
        <div class="text-2xl font-bold theme-primary mb-2">
          {{ stat.value }}
        </div>
        <div class="text-sm theme-text-secondary">
          {{ stat.label }}
        </div>
      </Card>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card
        v-for="project in filteredProjects"
        :key="project.id"
        hoverable
        class="group"
      >
        <!-- Preview placeholder -->
        <div class="w-full h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 rounded-lg mb-4 flex items-center justify-center">
          <div class="theme-text-secondary text-center">
            <Eye class="w-8 h-8 mx-auto mb-2" />
            <span class="text-sm">Project Preview</span>
          </div>
        </div>

        <!-- Header -->
        <div class="mb-4">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
            <h3 class="text-lg font-semibold theme-text group-hover:theme-primary transition-colors mb-2 sm:mb-0">
              {{ project.title }}
            </h3>
            <Badge
              :variant="statusVariant(project.status)"
              class="self-start"
            >
              {{ project.status }}
            </Badge>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm theme-text-secondary mb-3">
            <div class="flex items-center gap-1">
              <Tag class="w-4 h-4" />
              {{ project.category }}
            </div>
            <div class="flex items-center gap-1">
              <Calendar class="w-4 h-4" />
              {{ project.year }}
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="theme-text text-sm mb-4 line-clamp-3">
          {{ project.description }}
        </p>

        <!-- Highlights -->
        <div class="mb-4">
          <h4 class="text-sm font-medium theme-text mb-2">
            Key Highlights:
          </h4>
          <ul class="space-y-1">
            <li
              v-for="(h, i) in project.highlights"
              :key="i"
              class="flex items-center gap-2 text-xs theme-text-secondary"
            >
              <Star class="w-3 h-3 theme-primary flex-shrink-0" />
              {{ h }}
            </li>
          </ul>
        </div>

        <!-- Technologies -->
        <div class="mb-4 flex flex-wrap gap-1">
          <Badge
            v-for="tech in project.technologies"
            :key="tech"
            variant="default"
          >
            {{ tech }}
          </Badge>
        </div>

        <!-- Action links -->
        <div class="flex items-center gap-3 pt-4 border-t theme-border">
          <Button
            v-if="project.links.github"
            :as="'a'"
            variant="ghost"
            size="sm"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github class="w-4 h-4" />
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
            <ExternalLink class="w-4 h-4" />
            Live Demo
          </Button>
        </div>
      </Card>
    </div>

    <!-- Load more (placeholder — no pagination logic) -->
    <div class="text-center mt-12">
      <Button variant="secondary">
        Load More Projects
      </Button>
    </div>
  </div>
</template>
