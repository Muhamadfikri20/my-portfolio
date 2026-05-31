<script setup>
import { ref, computed } from 'vue'
import {
  BookOpen, Clock, User, TrendingUp, Search, Filter, ArrowRight,
} from 'lucide-vue-next'
import {
  articles, articleCategories, tutorials, knowledgeStats, popularTags,
} from '@/data/articles'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

const activeCategory = ref('All')
const searchQuery = ref('')

const filteredArticles = computed(() => {
  let list = articles
  if (activeCategory.value !== 'All') {
    list = list.filter((a) => a.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }
  return list
})

const featuredArticles = computed(() => articles.filter((a) => a.featured))

function levelClass(level) {
  if (level === 'Beginner') return 'text-green-600'
  if (level === 'Intermediate') return 'text-yellow-600'
  return 'text-red-600'
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold theme-text mb-4">
        Knowledge Base
      </h1>
      <p class="text-lg theme-text-secondary mb-6">
        Technical articles, tutorials, and insights from my experience in backend development and infrastructure
      </p>
    </div>

    <!-- Search + filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary w-5 h-5" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles, tutorials, and topics..."
          class="w-full pl-10 pr-4 py-3 border theme-border rounded-lg focus:outline-none focus:theme-primary theme-bg theme-text"
        >
      </div>
      <Button
        variant="outline"
        size="lg"
      >
        <Filter class="w-5 h-5" />
        Filter
      </Button>
    </div>

    <!-- Category tabs -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="cat in articleCategories"
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
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <Card
        v-for="s in knowledgeStats"
        :key="s.label"
        class="text-center"
      >
        <div class="text-2xl font-bold theme-primary mb-2">
          {{ s.value }}
        </div>
        <div class="text-sm theme-text-secondary">
          {{ s.label }}
        </div>
      </Card>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <!-- Main column -->
      <div class="xl:col-span-3">
        <!-- Featured -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold theme-text mb-6 flex items-center gap-3">
            <TrendingUp class="w-6 h-6 theme-primary" />
            Featured Articles
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card
              v-for="article in featuredArticles"
              :key="article.id"
              hoverable
              class="group"
            >
              <div class="flex items-start justify-between mb-3">
                <Badge variant="primary">
                  {{ article.category }}
                </Badge>
                <span class="text-xs theme-text-secondary">{{ article.publishDate }}</span>
              </div>
              <h3 class="text-lg font-semibold theme-text group-hover:theme-primary transition-colors mb-3">
                {{ article.title }}
              </h3>
              <p class="theme-text text-sm mb-4 line-clamp-3">
                {{ article.excerpt }}
              </p>
              <div class="flex flex-wrap gap-1 mb-4">
                <Badge
                  v-for="tag in article.tags.slice(0, 3)"
                  :key="tag"
                >
                  {{ tag }}
                </Badge>
              </div>
              <div class="flex items-center justify-between text-sm theme-text-secondary">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ article.readTime }}
                  </div>
                  <div class="flex items-center gap-1">
                    <User class="w-4 h-4" />
                    {{ article.views }} views
                  </div>
                </div>
                <button
                  type="button"
                  class="flex items-center gap-1 theme-primary hover:opacity-80 font-medium"
                >
                  Read More
                  <ArrowRight class="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>
        </section>

        <!-- All articles -->
        <section>
          <h2 class="text-2xl font-bold theme-text mb-6 flex items-center gap-3">
            <BookOpen class="w-6 h-6 theme-primary" />
            All Articles
          </h2>
          <div class="space-y-4">
            <Card
              v-for="article in filteredArticles"
              :key="article.id"
              hoverable
              class="group"
            >
              <div class="flex items-center gap-4 mb-2">
                <Badge>{{ article.category }}</Badge>
                <Badge :variant="article.status === 'Published' ? 'success' : 'warning'">
                  {{ article.status }}
                </Badge>
                <span class="text-xs theme-text-secondary">{{ article.publishDate }}</span>
              </div>
              <h3 class="text-lg font-semibold theme-text group-hover:theme-primary transition-colors mb-2">
                {{ article.title }}
              </h3>
              <p class="theme-text text-sm mb-3">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="tag in article.tags.slice(0, 4)"
                    :key="tag"
                  >
                    {{ tag }}
                  </Badge>
                </div>
                <div class="flex items-center gap-4 text-sm theme-text-secondary">
                  <div class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ article.readTime }}
                  </div>
                  <div class="flex items-center gap-1">
                    <User class="w-4 h-4" />
                    {{ article.views }}
                  </div>
                </div>
              </div>
            </Card>
            <div
              v-if="!filteredArticles.length"
              class="text-center py-12 theme-text-secondary"
            >
              No articles match current filter.
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <!-- Quick Tutorials -->
        <section>
          <h3 class="text-xl font-bold theme-text mb-6">
            Quick Tutorials
          </h3>
          <div class="space-y-4">
            <Card
              v-for="(t, i) in tutorials"
              :key="i"
            >
              <h4 class="font-semibold theme-text mb-2">
                {{ t.title }}
              </h4>
              <div class="space-y-2 text-sm theme-text-secondary">
                <div class="flex justify-between">
                  <span>Duration:</span>
                  <span>{{ t.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Level:</span>
                  <span :class="['font-medium', levelClass(t.level)]">{{ t.level }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Category:</span>
                  <span>{{ t.category }}</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                class="w-full mt-4"
              >
                Start Tutorial
              </Button>
            </Card>
          </div>
        </section>

        <!-- Popular Tags -->
        <section>
          <h3 class="text-xl font-bold theme-text mb-6">
            Popular Tags
          </h3>
          <Card>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="tag in popularTags"
                :key="tag"
                variant="outline"
                class="cursor-pointer hover:theme-primary-bg hover:text-white transition-colors"
              >
                {{ tag }}
              </Badge>
            </div>
          </Card>
        </section>

        <!-- Newsletter -->
        <section>
          <h3 class="text-xl font-bold theme-text mb-6">
            Stay Updated
          </h3>
          <Card>
            <p class="text-sm theme-text-secondary mb-4">
              Get notified when I publish new articles and tutorials about backend development and infrastructure.
            </p>
            <div class="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full px-3 py-2 border theme-border rounded-md text-sm focus:outline-none theme-bg theme-text"
              >
              <Button
                variant="primary"
                class="w-full"
              >
                Subscribe
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>

    <!-- Load more -->
    <div class="text-center mt-12">
      <Button variant="secondary">
        Load More Articles
      </Button>
    </div>
  </div>
</template>
