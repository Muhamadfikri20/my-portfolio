<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Download, Mail, Github, Linkedin, Menu,
  LogIn, LogOut, User, Edit3, BookOpen, ChevronDown,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useTranslations } from '@/composables/useTranslations'
import Button from '@/components/ui/Button.vue'
import LanguageSwitcher from '@/components/widgets/LanguageSwitcher.vue'
import ThemeToggle from '@/components/widgets/ThemeToggle.vue'
import AuthModal from '@/components/widgets/AuthModal.vue'

const emit = defineEmits(['menuClick'])

const route = useRoute()
const auth = useAuthStore()
const { t } = useTranslations()

const showAuthModal = ref(false)
const authMode = ref('login')
const showUserMenu = ref(false)

const sectionInfo = computed(() => ({
  title: t(route.meta.titleKey || 'header.default.title'),
  subtitle: t(route.meta.subtitleKey || 'header.default.subtitle'),
}))

function openAuth(mode) {
  authMode.value = mode
  showAuthModal.value = true
}

function handleLogout() {
  auth.logout()
  showUserMenu.value = false
}

function getInitials(name) {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}
</script>

<template>
  <header
    class="shrink-0 z-30 bg-topbar/95 backdrop-blur-md h-14 border-b border-border/50 transition-colors duration-300"
  >
    <div class="flex items-center justify-between px-4 lg:px-6 h-full">
      <!-- Left: menu toggle + section title -->
      <div class="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          class="lg:hidden -ml-2"
          :aria-label="t('common.openMenu')"
          @click="emit('menuClick')"
        >
          <Menu class="h-5 w-5" />
        </Button>

        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
            <BookOpen class="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div class="min-w-0">
            <h1 class="text-sm font-semibold text-foreground leading-tight truncate">
              {{ sectionInfo.title }}
            </h1>
            <p class="text-xs text-muted-foreground hidden sm:block truncate">
              {{ sectionInfo.subtitle }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right: utilities + auth -->
      <div class="flex items-center gap-2 lg:gap-3">
        <LanguageSwitcher />
        <ThemeToggle />

        <!-- Social links -->
        <div class="hidden md:flex items-center gap-0.5">
          <a
            href="mailto:rheyno.apria@example.com"
            :title="t('common.email')"
            class="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Mail class="w-4 h-4" />
          </a>
          <a
            href="https://github.com/rheynoapria"
            target="_blank"
            rel="noopener noreferrer"
            :title="t('common.github')"
            class="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Github class="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/rheynoapria"
            target="_blank"
            rel="noopener noreferrer"
            :title="t('common.linkedin')"
            class="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Linkedin class="w-4 h-4" />
          </a>
        </div>

        <!-- Auth section -->
        <template v-if="auth.isAuthenticated">
          <button
            v-if="auth.isAdmin"
            type="button"
            :title="auth.isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'"
            :class="[
              'inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-xs font-medium transition-colors',
              auth.isEditMode
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ]"
            @click="auth.toggleEditMode()"
          >
            <Edit3 class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">{{ auth.isEditMode ? 'Exit Edit' : 'Edit Mode' }}</span>
          </button>

          <div class="relative">
            <button
              type="button"
              class="h-9 inline-flex items-center gap-2 pl-1 pr-2 rounded-full hover:bg-accent transition-colors"
              @click="showUserMenu = !showUserMenu"
            >
              <div class="h-7 w-7 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-800">
                {{ getInitials(auth.user?.name) }}
              </div>
              <span class="hidden sm:inline text-xs font-medium text-foreground">
                {{ auth.user?.name }}
              </span>
              <ChevronDown class="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
            </button>

            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-56 bg-popover text-popover-foreground rounded-xl border border-border shadow-soft-md z-50 overflow-hidden"
            >
              <div class="px-3 py-2.5 border-b border-border/60">
                <p class="text-sm font-medium text-foreground truncate">
                  {{ auth.user?.name }}
                </p>
                <p class="text-xs text-muted-foreground truncate">
                  {{ auth.user?.email }}
                </p>
              </div>
              <button
                type="button"
                class="w-full inline-flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                @click="handleLogout"
              >
                <LogOut class="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <Button
            variant="ghost"
            size="sm"
            @click="openAuth('login')"
          >
            <LogIn class="w-4 h-4" />
            <span class="hidden sm:inline">Sign In</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            @click="openAuth('signup')"
          >
            <User class="w-4 h-4" />
            <span class="hidden sm:inline">Sign Up</span>
          </Button>
        </template>

        <Button
          variant="secondary"
          size="sm"
        >
          <Download class="w-4 h-4" />
          <span class="hidden sm:inline">{{ t('common.downloadResume') }}</span>
          <span class="sm:hidden">{{ t('common.cv') }}</span>
        </Button>
      </div>
    </div>

    <AuthModal
      :is-open="showAuthModal"
      :initial-mode="authMode"
      @close="showAuthModal = false"
    />
  </header>
</template>
