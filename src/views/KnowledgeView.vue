<script setup>
import { ref, computed } from 'vue'
import {
  BookOpen, Clock, User, TrendingUp, Search, Filter, ArrowRight,
} from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import {
  tutorials, knowledgeStats, popularTags,
} from '@/data/articles'
import { useContentStore } from '@/stores/content'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

const content = useContentStore()
const { articles, articleCategories, featuredArticles } = storeToRefs(content)

const activeCategory = ref('All')
const searchQuery = ref('')

const filteredArticles = computed(() => {
  let list = articles.value
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

function levelColor(level) {
  if (level === 'Beginner') return 'success'
  if (level === 'Intermediate') return 'warning'
  return 'error'
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
        <span class="gradient-text">Knowledge Base</span>
      </h1>
      <p class="text-base text-muted-foreground max-w-2xl mx-auto">
        Technical articles, tutorials, and insights from my experience in backend development and infrastructure
      </p>
    </div>

    <!-- Search + filter -->
    <div class="flex flex-col md:flex-row gap-3 mb-6">
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles, tutorials, and topics..."
          class="input-base pl-10"
        >
      </div>
      <Button
        variant="outline"
        size="md"
      >
        <Filter class="w-4 h-4" />
        Filter
      </Button>
    </div>

    <!-- Category tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="cat in articleCategories"
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
        v-for="(s, i) in knowledgeStats"
        :key="s.label"
        v-reveal:zoom="i * 70"
        class="text-center"
      >
        <div class="text-3xl font-extrabold gradient-text mb-1">
          {{ s.value }}
        </div>
        <div class="text-xs text-muted-foreground">
          {{ s.label }}
        </div>
      </Card>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <!-- Main column -->
      <div class="xl:col-span-3">
        <!-- Featured -->
        <section class="mb-8">
          <h2 class="text-xl font-bold text-foreground mb-4 inline-flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 inline-flex items-center justify-center">
              <TrendingUp class="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </span>
            Featured Articles
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card
              v-for="(article, fi) in featuredArticles"
              :key="article.id"
              v-reveal="fi * 90"
              hoverable
              class="group"
            >
              <div class="flex items-start justify-between mb-2">
                <Badge variant="primary">
                  {{ article.category }}
                </Badge>
                <span class="text-xs text-muted-foreground">{{ article.publishDate }}</span>
              </div>
              <h3 class="text-base font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                {{ article.title }}
              </h3>
              <p class="text-sm text-muted-foreground line-clamp-3 mb-3">
                {{ article.excerpt }}
              </p>
              <div class="flex flex-wrap gap-1 mb-3">
                <Badge
                  v-for="tag in article.tags.slice(0, 3)"
                  :key="tag"
                  variant="outline"
                >
                  {{ tag }}
                </Badge>
              </div>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <div class="flex items-center gap-3">
                  <span class="inline-flex items-center gap-1">
                    <Clock class="w-3.5 h-3.5" />
                    {{ article.readTime }}
                  </span>
                  <span class="inline-flex items-center gap-1">
                    <User class="w-3.5 h-3.5" />
                    {{ article.views }}
                  </span>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:opacity-80 font-medium"
                >
                  Read
                  <ArrowRight class="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          </div>
        </section>

        <!-- All articles -->
        <section>
          <h2 class="text-xl font-bold text-foreground mb-4 inline-flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 inline-flex items-center justify-center">
              <BookOpen class="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </span>
            All Articles
          </h2>
          <div class="space-y-3">
            <Card
              v-for="(article, ai) in filteredArticles"
              :key="article.id"
              v-reveal="ai * 60"
              hoverable
              class="group"
            >
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <Badge>{{ article.category }}</Badge>
                <Badge :variant="article.status === 'Published' ? 'success' : 'warning'">
                  {{ article.status }}
                </Badge>
                <span class="text-xs text-muted-foreground">{{ article.publishDate }}</span>
              </div>
              <h3 class="text-base font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                {{ article.title }}
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center justify-between flex-wrap gap-2">
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="tag in article.tags.slice(0, 4)"
                    :key="tag"
                    variant="outline"
                  >
                    {{ tag }}
                  </Badge>
                </div>
                <div class="flex items-center gap-3 text-xs text-muted-foreground">
                  <span class="inline-flex items-center gap-1">
                    <Clock class="w-3.5 h-3.5" />
                    {{ article.readTime }}
                  </span>
                  <span class="inline-flex items-center gap-1">
                    <User class="w-3.5 h-3.5" />
                    {{ article.views }}
                  </span>
                </div>
              </div>
            </Card>
            <div
              v-if="!filteredArticles.length"
              class="text-center py-8 text-muted-foreground text-sm"
            >
              No articles match current filter.
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <section>
          <h3 class="text-base font-bold text-foreground mb-3">
            Quick Tutorials
          </h3>
          <div class="space-y-3">
            <Card
              v-for="(t, i) in tutorials"
              :key="i"
            >
              <h4 class="text-sm font-semibold text-foreground mb-2">
                {{ t.title }}
              </h4>
              <div class="space-y-1.5 text-xs text-muted-foreground mb-3">
                <div class="flex justify-between">
                  <span>Duration</span>
                  <span class="font-medium">{{ t.duration }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Level</span>
                  <Badge :variant="levelColor(t.level)">
                    {{ t.level }}
                  </Badge>
                </div>
                <div class="flex justify-between">
                  <span>Category</span>
                  <span class="font-medium">{{ t.category }}</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                class="w-full"
              >
                Start Tutorial
              </Button>
            </Card>
          </div>
        </section>

        <section>
          <h3 class="text-base font-bold text-foreground mb-3">
            Popular Tags
          </h3>
          <Card>
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="tag in popularTags"
                :key="tag"
                variant="outline"
                class="cursor-pointer hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 dark:hover:bg-brand-900/30 dark:hover:text-brand-300 dark:hover:border-brand-800 transition-colors"
              >
                {{ tag }}
              </Badge>
            </div>
          </Card>
        </section>

        <section>
          <h3 class="text-base font-bold text-foreground mb-3">
            Stay Updated
          </h3>
          <Card>
            <p class="text-xs text-muted-foreground mb-3">
              Get notified when I publish new articles and tutorials.
            </p>
            <div class="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                class="input-base"
              >
              <Button
                variant="primary"
                size="sm"
                class="w-full"
              >
                Subscribe
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>

    <div class="text-center mt-8">
      <Button variant="secondary">
        Load More Articles
      </Button>
    </div>
  </div>
</template>
