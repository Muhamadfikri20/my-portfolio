<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Download, Mail, Github, Linkedin, Menu,
  LogIn, LogOut, User, Edit3, BookOpen,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useTranslations } from '@/composables/useTranslations'
import LanguageSwitcher from '@/components/widgets/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/widgets/ThemeSwitcher.vue'
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
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-16 border-b theme-border theme-bg px-4 lg:px-8 flex items-center justify-between z-30 backdrop-blur-sm"
  >
    <div class="flex items-center gap-4">
      <button
        type="button"
        :aria-label="t('common.openMenu')"
        class="lg:hidden p-2 theme-text-secondary hover:theme-text rounded-md transition-colors"
        @click="emit('menuClick')"
      >
        <Menu class="w-5 h-5" />
      </button>

      <div class="flex items-center gap-3">
        <BookOpen class="w-8 h-8 theme-primary" />
        <div>
          <h1 class="text-lg lg:text-xl font-bold theme-text">
            {{ sectionInfo.title }}
          </h1>
          <p class="text-xs lg:text-sm theme-text-secondary hidden sm:block">
            {{ sectionInfo.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 lg:gap-4">
      <LanguageSwitcher />
      <ThemeSwitcher />
      <ThemeToggle />

      <!-- Social links (desktop only) -->
      <div class="hidden md:flex items-center gap-1">
        <a
          href="mailto:rheyno.apria@example.com"
          :title="t('common.email')"
          class="p-2 theme-text-secondary hover:theme-primary rounded-md transition-colors"
        >
          <Mail class="w-5 h-5" />
        </a>
        <a
          href="https://github.com/rheynoapria"
          target="_blank"
          rel="noopener noreferrer"
          :title="t('common.github')"
          class="p-2 theme-text-secondary hover:theme-primary rounded-md transition-colors"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/rheynoapria"
          target="_blank"
          rel="noopener noreferrer"
          :title="t('common.linkedin')"
          class="p-2 theme-text-secondary hover:theme-primary rounded-md transition-colors"
        >
          <Linkedin class="w-5 h-5" />
        </a>
      </div>

      <!-- Auth section -->
      <template v-if="auth.isAuthenticated">
        <button
          v-if="auth.isAdmin"
          type="button"
          :title="auth.isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors',
            auth.isEditMode
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'theme-surface theme-text hover:opacity-80',
          ]"
          @click="auth.toggleEditMode()"
        >
          <Edit3 class="w-4 h-4" />
          <span class="hidden sm:inline">{{ auth.isEditMode ? 'Exit Edit' : 'Edit Mode' }}</span>
        </button>

        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 px-3 py-2 theme-text-secondary hover:theme-text rounded-md transition-colors"
            @click="showUserMenu = !showUserMenu"
          >
            <User class="w-4 h-4" />
            <span class="hidden sm:inline text-sm">{{ auth.user?.name }}</span>
          </button>

          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 theme-surface rounded-md shadow-lg border theme-border z-50"
          >
            <div class="py-1">
              <div class="px-4 py-2 text-sm theme-text border-b theme-border">
                <div class="font-medium">
                  {{ auth.user?.name }}
                </div>
                <div class="text-xs theme-text-secondary">
                  {{ auth.user?.email }}
                </div>
              </div>
              <button
                type="button"
                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                @click="handleLogout"
              >
                <LogOut class="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-2 theme-text-secondary hover:theme-text rounded-md transition-colors"
          @click="openAuth('login')"
        >
          <LogIn class="w-4 h-4" />
          <span class="hidden sm:inline text-sm">Sign In</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-2 theme-primary-bg text-white text-xs lg:text-sm font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
          @click="openAuth('signup')"
        >
          <User class="w-4 h-4" />
          <span class="hidden sm:inline">Sign Up</span>
        </button>
      </template>

      <!-- Download Resume Button -->
      <button
        type="button"
        class="flex items-center gap-2 px-3 lg:px-4 py-2 theme-surface theme-text text-xs lg:text-sm font-medium rounded-md hover:opacity-80 transition-colors"
      >
        <Download class="w-4 h-4" />
        <span class="hidden sm:inline">{{ t('common.downloadResume') }}</span>
        <span class="sm:hidden">{{ t('common.cv') }}</span>
      </button>
    </div>

    <AuthModal
      :is-open="showAuthModal"
      :initial-mode="authMode"
      @close="showAuthModal = false"
    />
  </header>
</template>
