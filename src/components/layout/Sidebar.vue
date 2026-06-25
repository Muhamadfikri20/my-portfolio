<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { User, Briefcase, BookOpen, X, ChevronRight, LayoutDashboard } from 'lucide-vue-next'
import { useTranslations } from '@/composables/useTranslations'
import { useLanguageStore } from '@/stores/language'
import { useAuthStore } from '@/stores/auth'
import PrayerTimeCountdown from '@/components/widgets/PrayerTimeCountdown.vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const { t } = useTranslations()
const lang = useLanguageStore()
const auth = useAuthStore()
const route = useRoute()

const navItems = computed(() => {
  const items = [
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
  ]
  if (auth.isAdmin) {
    items.push({
      id: 'admin',
      to: '/admin',
      label: 'Admin',
      desc: 'Manage portfolio content',
      icon: LayoutDashboard,
    })
  }
  return items
})

const sidebarClass = computed(() => {
  const isRtl = lang.direction === 'rtl'
  const closedTransform = isRtl ? 'translate-x-full' : '-translate-x-full'
  const sideEdge = isRtl ? 'right-0 border-l' : 'left-0 border-r'
  return [
    'fixed top-0 h-dvh w-72 text-sidebar-foreground border-sidebar-border z-50 overflow-hidden flex flex-col',
    'bg-sidebar/80 backdrop-blur-xl supports-[backdrop-filter]:bg-sidebar/70',
    'transform transition-transform duration-300 lg:translate-x-0',
    'shadow-[8px_0_40px_-24px_rgba(0,0,0,0.25)]',
    sideEdge,
    props.isOpen ? '!translate-x-0' : closedTransform,
  ].join(' ')
})
</script>

<template>
  <aside :class="sidebarClass">
    <!-- Decorative top glow -->
    <div
      class="pointer-events-none absolute -top-20 -left-10 w-64 h-64 rounded-full blur-3xl opacity-40 dark:opacity-30"
      style="background: radial-gradient(circle, oklch(0.6 0.2 270) 0%, transparent 70%);"
    />

    <!-- Brand bar (fills top-left corner, aligns with header) -->
    <div class="relative shrink-0 flex items-center gap-2.5 h-14 px-4 border-b border-sidebar-border/50">
      <div class="relative shrink-0">
        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 blur-[5px] opacity-50" />
        <div class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-sm">
          <BookOpen class="w-5 h-5 text-white" />
        </div>
      </div>
      <span class="text-lg font-extrabold tracking-tight gradient-text">
        {{ t('sidebar.footer.portfolio') }}
      </span>
      <button
        type="button"
        :aria-label="t('common.closeMenu')"
        class="lg:hidden ml-auto h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        @click="emit('close')"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Scrollable content -->
    <div class="relative flex-1 overflow-y-auto scrollbar-thin px-4 pt-4 pb-2">
      <!-- Profile -->
      <div class="relative mb-5 rounded-2xl glass-panel p-4">
        <div class="flex items-center gap-3.5">
          <div class="relative shrink-0">
            <div class="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-400/70 to-purple-400/60 blur-[6px]" />
            <div class="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-card shadow-sm">
              <img
                src="/assets/icons/general/profile.png"
                alt="Rheyno Apria Pratama"
                class="w-full h-full object-cover"
              >
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card animate-soft-pulse" />
          </div>
          <div class="min-w-0">
            <h2 class="text-sm font-bold text-foreground truncate">
              {{ t('sidebar.profile.name') }}
            </h2>
            <p class="text-xs text-brand-600 dark:text-brand-400 font-medium truncate">
              {{ t('sidebar.profile.title') }}
            </p>
            <p class="text-[11px] text-muted-foreground mt-0.5 truncate">
              {{ t('sidebar.profile.experience') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Prayer Time -->
      <div class="mb-5">
        <PrayerTimeCountdown />
      </div>

      <!-- Navigation -->
      <p class="px-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
        {{ t('sidebar.footer.portfolio') }}
      </p>
      <nav class="space-y-1.5">
        <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.to"
          :class="['sidebar-nav-item', route.name === item.id && 'active']"
          @click="emit('close')"
        >
          <span class="nav-ico">
            <component
              :is="item.icon"
              class="w-4 h-4"
            />
          </span>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold truncate">
              {{ item.label }}
            </div>
            <div class="text-[11px] opacity-70 truncate">
              {{ item.desc }}
            </div>
          </div>
          <ChevronRight class="nav-chevron" />
        </router-link>
      </nav>
    </div>

    <!-- Footer -->
    <div class="relative shrink-0 px-4 py-3 border-t border-sidebar-border/50">
      <div class="text-[10px] text-muted-foreground text-center">
        {{ t('sidebar.footer.copyright') }}
      </div>
    </div>
  </aside>
</template>
