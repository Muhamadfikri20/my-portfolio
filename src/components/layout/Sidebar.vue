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
  const open = '!translate-x-0'
  const closedTransform = isRtl ? 'translate-x-full' : '-translate-x-full'
  const sideEdge = isRtl ? 'right-0 border-l' : 'left-0 border-r'
  return [
    'fixed top-16 h-[calc(100vh-4rem)] w-72 theme-surface theme-border p-4 z-20',
    'transform transition-transform duration-300 lg:translate-x-0',
    sideEdge,
    props.isOpen ? open : closedTransform,
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
        class="p-2 theme-text-secondary hover:theme-text rounded-md transition-colors"
        @click="emit('close')"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Profile -->
    <div class="mb-6 lg:mb-8">
      <div class="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 theme-border">
        <img
          src="/assets/icons/general/profile.png"
          alt="Rheyno Apria Pratama"
          class="w-full h-full object-cover"
        >
      </div>
      <h2 class="text-lg font-semibold theme-text">
        {{ t('sidebar.profile.name') }}
      </h2>
      <p class="text-sm theme-text-secondary">
        {{ t('sidebar.profile.title') }}
      </p>
      <p class="text-xs theme-text-secondary mt-1">
        {{ t('sidebar.profile.experience') }}
      </p>
    </div>

    <!-- Prayer Time -->
    <div class="mb-6">
      <PrayerTimeCountdown />
    </div>

    <!-- Navigation -->
    <nav class="space-y-2">
      <router-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.to"
        :class="['sidebar-nav-item w-full text-left', route.name === item.id && 'active']"
        @click="emit('close')"
      >
        <component
          :is="item.icon"
          class="w-5 h-5"
        />
        <div class="flex-1">
          <div class="font-medium">
            {{ item.label }}
          </div>
          <div class="text-xs theme-text-secondary">
            {{ item.desc }}
          </div>
        </div>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-4 left-4 right-4">
      <div class="flex items-center justify-center gap-2 mb-2">
        <BookOpen class="w-4 h-4 theme-primary" />
        <span class="text-xs font-medium theme-text-secondary">
          {{ t('sidebar.footer.portfolio') }}
        </span>
      </div>
      <div class="text-xs theme-text-secondary text-center">
        {{ t('sidebar.footer.copyright') }}
      </div>
    </div>
  </aside>
</template>
