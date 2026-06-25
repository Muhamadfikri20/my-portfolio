<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Palette, Check } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { THEME_LABELS } from '@/config/constants'

const theme = useThemeStore()
const open = ref(false)
const root = ref(null)
onClickOutside(root, () => { open.value = false })

// Gradient preview per theme (matches main.css hue pairs)
const swatches = [
  { id: 'default', grad: 'linear-gradient(135deg, oklch(0.58 0.21 280), oklch(0.62 0.2 322))' },
  { id: 'ocean', grad: 'linear-gradient(135deg, oklch(0.58 0.21 236), oklch(0.66 0.16 204))' },
  { id: 'forest', grad: 'linear-gradient(135deg, oklch(0.58 0.18 159), oklch(0.66 0.15 186))' },
  { id: 'sunset', grad: 'linear-gradient(135deg, oklch(0.7 0.17 64), oklch(0.64 0.19 32))' },
]

function pick(id) {
  theme.setTheme(id)
}
</script>

<template>
  <div
    ref="root"
    class="relative"
  >
    <button
      type="button"
      aria-label="Pilih tema warna"
      class="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      @click="open = !open"
    >
      <Palette class="w-4 h-4" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-44 p-2 rounded-2xl glass-panel shadow-soft-md z-50"
      >
        <p class="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Tema Warna
        </p>
        <button
          v-for="s in swatches"
          :key="s.id"
          type="button"
          class="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-sm hover:bg-accent transition-colors"
          @click="pick(s.id)"
        >
          <span
            class="w-5 h-5 rounded-full ring-2 ring-white/60 dark:ring-white/20 shadow-sm shrink-0"
            :style="{ background: s.grad }"
          />
          <span class="flex-1 text-left text-foreground">{{ THEME_LABELS[s.id] }}</span>
          <Check
            v-if="theme.theme === s.id"
            class="w-4 h-4 text-brand-600 dark:text-brand-400"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>
