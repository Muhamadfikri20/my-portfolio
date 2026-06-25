<script setup>
import { ref, computed } from 'vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useLanguageStore } from '@/stores/language'

const sidebarOpen = ref(false)
const lang = useLanguageStore()

const wrapperClass = computed(() => [
  'min-h-screen bg-background font-sans transition-colors duration-300',
  lang.direction === 'rtl' ? 'flex flex-row-reverse' : 'flex',
].join(' '))

const mainClass = computed(() => [
  'flex-1 transition-all duration-300 ease-in-out min-w-0 flex flex-col h-dvh',
  lang.direction === 'rtl' ? 'lg:mr-72' : 'lg:ml-72',
].join(' '))
</script>

<template>
  <div :class="wrapperClass">
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
      @click="sidebarOpen = false"
    />

    <Sidebar
      :is-open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <main :class="mainClass">
      <Header @menu-click="sidebarOpen = true" />
      <div class="flex-1 overflow-y-auto">
        <div class="p-4 lg:p-6 max-w-7xl mx-auto w-full">
          <router-view v-slot="{ Component, route }">
            <transition
              enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.16,0.84,0.44,1)]"
              enter-from-class="opacity-0 translate-y-3 blur-[2px] scale-[0.99]"
              enter-to-class="opacity-100 translate-y-0 blur-0 scale-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0 blur-[2px]"
              mode="out-in"
            >
              <component
                :is="Component"
                :key="route.path"
              />
            </transition>
          </router-view>
        </div>

        <footer class="border-t border-border/50 bg-card/50 backdrop-blur-sm">
          <div class="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
              <p>© 2026 Rheyno Apria Pratama. All rights reserved.</p>
              <p>
                Built with
                <span class="text-red-500">♥</span>
                using Vue 3 + Bun + Vite
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>
