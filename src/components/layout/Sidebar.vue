<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { User, Briefcase, BookOpen, X } from 'lucide-vue-next'
import { useTranslations } from '@/composables/useTranslations'
import { useLanguageStore } from '@/stores/language'
import PrayerTimeCountdown from '@/components/widgets/PrayerTimeCountdown.vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const { t } = useTranslations()
const lang = useLanguageStore()
const route = useRoute()

const navItems = computed(() => [
  {
    id: 'resume',
    to: '/resume',
    label: t('sidebar.navigation.resume.label'),
    desc: t('sidebar.navigation.resume.description'),
    icon: User,
  },
  {
    id: 'showcase',
    to: '/showcase',
    label: t('sidebar.navigation.showcase.label'),
    desc: t('sidebar.navigation.showcase.description'),
    icon: Briefcase,
  },
  {
    id: 'knowledge',
    to: '/knowledge',
    label: t('sidebar.navigation.knowledge.label'),
    desc: t('sidebar.navigation.knowledge.description'),
    icon: BookOpen,
  },
])

const sidebarClass = computed(() => {
  const isRtl = lang.direction === 'rtl'
  const closedTransform = isRtl ? 'translate-x-full' : '-translate-x-full'
  const sideEdge = isRtl ? 'right-0 border-l' : 'left-0 border-r'
  return [
    'fixed top-14 h-[calc(100vh-3.5rem)] w-72 bg-sidebar text-sidebar-foreground border-sidebar-border p-4 z-20',
    'transform transition-transform duration-300 lg:translate-x-0',
    'shadow-[0_0_15px_rgba(0,0,0,0.02)]',
    sideEdge,
    props.isOpen ? '!translate-x-0' : closedTransform,
  ].join(' ')
})
</script>

<template>
  <aside :class="sidebarClass">
    <!-- Mobile close -->
    <div class="lg:hidden flex justify-end mb-4">
      <button
        type="button"
        :aria-label="t('common.closeMenu')"
        class="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        @click="emit('close')"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Profile -->
    <div class="mb-6 lg:mb-8">
      <div class="w-16 h-16 rounded-2xl overflow-hidden mb-4 border-2 border-sidebar-border shadow-sm">
        <img
          src="/assets/icons/general/profile.png"
          alt="Rheyno Apria Pratama"
          class="w-full h-full object-cover"
        >
      </div>
      <h2 class="text-base font-semibold text-foreground">
        {{ t('sidebar.profile.name') }}
      </h2>
      <p class="text-sm text-muted-foreground">
        {{ t('sidebar.profile.title') }}
      </p>
      <p class="text-xs text-muted-foreground mt-0.5">
        {{ t('sidebar.profile.experience') }}
      </p>
    </div>

    <!-- Prayer Time -->
    <div class="mb-6">
      <PrayerTimeCountdown />
    </div>

    <!-- Navigation -->
    <nav class="space-y-1">
      <router-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.to"
        :class="['sidebar-nav-item', route.name === item.id && 'active']"
        @click="emit('close')"
      >
        <component
          :is="item.icon"
          class="w-4 h-4 shrink-0"
        />
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium truncate">
            {{ item.label }}
          </div>
          <div class="text-[11px] opacity-70 truncate">
            {{ item.desc }}
          </div>
        </div>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-4 left-4 right-4">
      <div class="flex items-center justify-center gap-2 mb-1.5">
        <BookOpen class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
        <span class="text-[11px] font-medium text-muted-foreground">
          {{ t('sidebar.footer.portfolio') }}
        </span>
      </div>
      <div class="text-[10px] text-muted-foreground text-center">
        {{ t('sidebar.footer.copyright') }}
      </div>
    </div>
  </aside>
</template>
