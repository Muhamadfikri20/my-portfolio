<script setup>
import { ref, computed } from 'vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useLanguageStore } from '@/stores/language'

const sidebarOpen = ref(false)
const lang = useLanguageStore()

const mainContentClass = computed(() => {
  return lang.direction === 'rtl'
    ? 'flex-1 transition-all duration-300 lg:mr-72'
    : 'flex-1 transition-all duration-300 lg:ml-72'
})

const wrapperClass = computed(() => {
  return [
    'flex min-h-screen theme-bg transition-colors duration-300',
    lang.direction === 'rtl' ? 'flex-row-reverse' : '',
  ].join(' ')
})
</script>

<template>
  <div :class="wrapperClass">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 top-16 bg-black/50 z-10 lg:hidden"
      @click="sidebarOpen = false"
    />

    <Sidebar
      :is-open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <div :class="mainContentClass">
      <Header @menu-click="sidebarOpen = true" />
      <main class="px-4 py-6 lg:px-8 pt-20">
        <router-view />
      </main>
    </div>
  </div>
</template>
